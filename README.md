# DSH Cloud Server Plugins

Reproducible plugin layer separated from the HTTPS-only
`dsh-cloud-server-deploy` repository.

This collection records every non-core plugin found in the recovered DSH RC.8
web profile, including the retired standalone orchestrator. It distinguishes
upstream work, adaptations, compatibility add-ons, and locally recovered code;
being listed here is not a claim of authorship.

## Contents

| Plugin | Recovered state | Source and ownership |
| --- | --- | --- |
| `@linxin666/dsh-web-ui-all@0.1.12` | Active | Upstream Apache-2.0 package from [`zhu1090093659/dsh-web-ui`](https://github.com/zhu1090093659/dsh-web-ui); not copied here |
| `dsh-better-sidebar@0.12.1` | Active | Upstream MIT package from [`omdsh-dev/DSH-better-sidebar`](https://github.com/omdsh-dev/DSH-better-sidebar); not copied here |
| `dsh-plugin-marketplace@8db98f7` | Active | Upstream MIT Git revision from [`bradeGithub/DSH-Plugins-Marketplace`](https://github.com/bradeGithub/DSH-Plugins-Marketplace); not copied here |
| `dsh-shift-router@0.6.1` | Active | Vendored DSH adaptation of [`green-dalii/pi-shift-router`](https://github.com/green-dalii/pi-shift-router); attribution preserved |
| `dsh-better-sidebar-skin-yield@0.1.1` | Active, legacy | Vendored compatibility add-on based on Better Sidebar/skin integration surfaces; not presented as an independent project |
| `dsh-usage-stats@0.1.0` | Active | Recovered local source, standalone repository; same-name public projects are disclosed in its README |
| `dsh-agent-orchestrator@0.1.0` | Unmounted/retired | Recovered local source, standalone repository; superseded by Shift-Router integration |

Machine-readable details are in [`catalog.json`](catalog.json).

## Repository structure

```text
plugins/
  dsh-shift-router/                 # attributed adaptation, vendored
  dsh-better-sidebar-skin-yield/    # integration add-on, vendored
  dsh-usage-stats/                  # Git submodule to standalone repo
  dsh-agent-orchestrator/           # Git submodule to standalone repo
catalog.json
install-rc8.sh
```

Third-party projects are referenced by immutable version or Git commit instead
of being recopied. Each vendored plugin has its own license/provenance notice.

## Reproduce the recovered active set

Clone with submodules and run as the DSH service account:

```bash
git clone --recurse-submodules https://github.com/qtimy/dsh-cloud-server-plugins.git
cd dsh-cloud-server-plugins
bash install-rc8.sh web
```

The script installs exact recovered versions and builds Shift-Router locally.
It does not install the retired orchestrator. Review every third-party project
before use; this collection verifies identity and reproducibility, not trust.

For newer DSH/plugin releases, use upstream release notes and test compatibility
instead of silently changing these pins.

## Provenance policy

- Upstream packages retain their names, links, licenses, and authorship.
- Adapted code states the upstream project prominently and preserves notices.
- A compatibility add-on that depends on another project's UI contract remains
  in this collection rather than receiving an "original plugin" repository.
- Recovered plugins receive standalone repositories only when no source project
  was identified. Missing history is disclosed; it is never invented.
- No credentials, provider secrets, hostnames, IP addresses, certificates,
  session data, logs, or live settings are included.

## License

The collection documentation and installer are MIT licensed. Every plugin keeps
its own license; see its directory or linked upstream repository.
