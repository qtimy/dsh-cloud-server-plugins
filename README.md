# DSH Cloud Server Plugins

English | [简体中文](README.zh-CN.md)

A version-pinned plugin collection for the DSH cloud deployment. It keeps plugin
code and model-routing policy separate from the HTTPS-only core deployment.

## Included plugins

| Plugin | Type | Source |
| --- | --- | --- |
| `@linxin666/dsh-web-ui-all@0.1.12` | Upstream npm package | [`zhu1090093659/dsh-web-ui`](https://github.com/zhu1090093659/dsh-web-ui) |
| `dsh-better-sidebar@0.12.1` | Upstream npm package | [`omdsh-dev/DSH-better-sidebar`](https://github.com/omdsh-dev/DSH-better-sidebar) |
| `dsh-plugin-marketplace@8db98f7` | Upstream Git revision | [`bradeGithub/DSH-Plugins-Marketplace`](https://github.com/bradeGithub/DSH-Plugins-Marketplace) |
| `dsh-shift-router@0.6.1` | DSH adaptation | Based on [`green-dalii/pi-shift-router`](https://github.com/green-dalii/pi-shift-router) |
| `dsh-better-sidebar-skin-yield@0.1.1` | Legacy compatibility add-on | Better Sidebar and dsh-web-ui integration helper |
| `dsh-usage-stats@0.1.0` | Standalone local-session statistics plugin | [`qtimy/dsh-usage-stats`](https://github.com/qtimy/dsh-usage-stats) |
| `dsh-agent-orchestrator@0.1.0` | Optional standalone subagent router | [`qtimy/dsh-agent-orchestrator`](https://github.com/qtimy/dsh-agent-orchestrator) |

The installer enables the first six entries. `dsh-agent-orchestrator` is included
as an optional submodule but is not installed because Shift-Router already
provides its orchestration features.

## Compatibility

The pinned set is intended for DSH `0.1.0-rc.8`. Test newer DSH or plugin releases
before changing the pins. Machine-readable package sources and versions are in
[`catalog.json`](catalog.json).

## Install

Clone with submodules and run as the DSH service account:

```bash
git clone --recurse-submodules https://github.com/qtimy/dsh-cloud-server-plugins.git
cd dsh-cloud-server-plugins
bash install-rc8.sh web
```

The script installs exact upstream versions, builds Shift-Router locally, and
links the local plugins from this persistent checkout. Restart DSH after the
installer completes.

## Repository structure

```text
plugins/
  dsh-shift-router/
  dsh-better-sidebar-skin-yield/
  dsh-usage-stats/                  # Git submodule
  dsh-agent-orchestrator/           # Git submodule, optional
catalog.json
install-rc8.sh
```

## Attribution and licenses

Upstream packages are referenced rather than copied. Vendored adaptations and
compatibility code retain their upstream links and license notices. See each
plugin directory or upstream repository for its license.

The collection documentation and installer are MIT licensed.
