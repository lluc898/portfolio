#!/usr/bin/env bash

set -Eeuo pipefail

source_dir="${1:-dist}"
deploy_root="${2:-/home/lluc/apps/portfolio}"
expected_root="/home/lluc/apps/portfolio"

if [[ ! -d "$source_dir" || ! -f "$source_dir/index.html" ]]; then
  echo "Build directory is missing or incomplete: $source_dir" >&2
  exit 1
fi

deploy_root="$(realpath "$deploy_root")"
if [[ "$deploy_root" != "$expected_root" ]]; then
  echo "Refusing to deploy outside $expected_root" >&2
  exit 1
fi

compose_file="$deploy_root/compose.yaml"
releases_dir="$deploy_root/releases"
current_link="$deploy_root/current"
lock_file="$deploy_root/.deploy.lock"

if [[ ! -f "$compose_file" || ! -d "$releases_dir" || ! -L "$current_link" ]]; then
  echo "The production directory does not have the expected structure." >&2
  exit 1
fi

exec 9>"$lock_file"
flock -w 300 9

release_id="${GITHUB_SHA:-$(date -u +%Y%m%dT%H%M%SZ)}-${GITHUB_RUN_ATTEMPT:-1}"
if [[ ! "$release_id" =~ ^[A-Za-z0-9._-]+$ ]]; then
  echo "Invalid release identifier: $release_id" >&2
  exit 1
fi

release_dir="$releases_dir/$release_id"
if [[ -e "$release_dir" ]]; then
  echo "Release already exists: $release_dir" >&2
  exit 1
fi

staging_dir="$(mktemp -d "$releases_dir/.staging.XXXXXX")"
next_link="$deploy_root/.current.next.$$"
previous_target="$(readlink "$current_link")"
switched=false

cleanup() {
  if [[ -n "${staging_dir:-}" && -d "$staging_dir" ]]; then
    rm -rf -- "$staging_dir"
  fi
  if [[ -L "$next_link" ]]; then
    rm -- "$next_link"
  fi
}
trap cleanup EXIT

activate_release() {
  local target="$1"
  ln -s "$target" "$next_link"
  mv -Tf "$next_link" "$current_link"
  docker compose --project-directory "$deploy_root" -f "$compose_file" up -d --force-recreate --no-deps portfolio
}

wait_until_healthy() {
  local status
  for _ in $(seq 1 24); do
    status="$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' llucbosch-portfolio 2>/dev/null || true)"
    if [[ "$status" == "healthy" ]]; then
      return 0
    fi
    if [[ "$status" == "unhealthy" || "$status" == "exited" || "$status" == "dead" ]]; then
      return 1
    fi
    sleep 5
  done
  return 1
}

cp -a "$source_dir"/. "$staging_dir"/
mv "$staging_dir" "$release_dir"
staging_dir=""

if activate_release "releases/$release_id"; then
  switched=true
fi

if [[ "$switched" != true ]] || ! wait_until_healthy; then
  echo "Deployment failed; restoring $previous_target" >&2
  activate_release "$previous_target" || true
  wait_until_healthy || true
  exit 1
fi

echo "Deployment completed: $release_id"
