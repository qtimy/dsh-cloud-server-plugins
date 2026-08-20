#!/usr/bin/env bash
set -Eeuo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROFILE="${1:-web}"

command -v dsh >/dev/null
command -v npm >/dev/null

for path in \
  "${ROOT}/plugins/dsh-shift-router/package.json" \
  "${ROOT}/plugins/dsh-better-sidebar-skin-yield/package.json" \
  "${ROOT}/plugins/dsh-usage-stats/package.json"; do
  if [[ ! -f "${path}" ]]; then
    echo "ERROR: missing ${path}; clone this repository with --recurse-submodules." >&2
    exit 2
  fi
done

echo "[1/7] upstream web UI aggregate"
dsh plugin --profile "${PROFILE}" add '@linxin666/dsh-web-ui-all@0.1.12'

echo "[2/7] upstream Better Sidebar"
dsh plugin --profile "${PROFILE}" add 'dsh-better-sidebar@0.12.1'

echo "[3/7] upstream Plugin Marketplace at recovered revision"
dsh plugin --profile "${PROFILE}" add \
  'github:bradeGithub/DSH-Plugins-Marketplace#8db98f7792a2aa5cdf750f45845a0b6109780bbe'

echo "[4/7] build attributed Shift-Router adaptation"
npm --prefix "${ROOT}/plugins/dsh-shift-router" ci --ignore-scripts
npm --prefix "${ROOT}/plugins/dsh-shift-router" run build

echo "[5/7] install Shift-Router from the persistent checkout"
dsh plugin --profile "${PROFILE}" add "${ROOT}/plugins/dsh-shift-router"

echo "[6/7] install recovered usage statistics plugin"
dsh plugin --profile "${PROFILE}" add "${ROOT}/plugins/dsh-usage-stats"

echo "[7/7] install legacy skin positioning compatibility"
dsh plugin --profile "${PROFILE}" add \
  "${ROOT}/plugins/dsh-better-sidebar-skin-yield"

echo "Installed the recovered active RC.8 plugin set. Restart DSH and verify its logs."
echo "The retired dsh-agent-orchestrator submodule was intentionally not installed."
