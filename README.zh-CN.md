# DSH 云服务器插件集合

[English](README.md) | 简体中文

这是从仅负责 HTTPS 暴露的 `dsh-cloud-server-deploy` 仓库中分离出来的、
可复现的插件层。

本集合记录从 DSH RC.8 Web profile 中恢复出的所有非核心插件，包括已经停用的
独立 orchestrator。它明确区分上游项目、适配版本、兼容附加组件与本地恢复
代码；被列入本仓库不代表对其作者身份或所有权提出主张。

## 内容

| 插件 | 恢复时状态 | 来源与归属 |
| --- | --- | --- |
| `@linxin666/dsh-web-ui-all@0.1.12` | 运行中 | 来自 [`zhu1090093659/dsh-web-ui`](https://github.com/zhu1090093659/dsh-web-ui) 的 Apache-2.0 上游包；本仓库不复制源码 |
| `dsh-better-sidebar@0.12.1` | 运行中 | 来自 [`omdsh-dev/DSH-better-sidebar`](https://github.com/omdsh-dev/DSH-better-sidebar) 的 MIT 上游包；本仓库不复制源码 |
| `dsh-plugin-marketplace@8db98f7` | 运行中 | 来自 [`bradeGithub/DSH-Plugins-Marketplace`](https://github.com/bradeGithub/DSH-Plugins-Marketplace) 的 MIT 上游 Git 修订；本仓库不复制源码 |
| `dsh-shift-router@0.6.1` | 运行中 | 收录在本仓库中的 [`green-dalii/pi-shift-router`](https://github.com/green-dalii/pi-shift-router) DSH 适配版；保留上游署名 |
| `dsh-better-sidebar-skin-yield@0.1.1` | 运行中、旧版兼容 | 基于 Better Sidebar/皮肤集成接口的兼容附加组件；不作为独立原创项目发布 |
| `dsh-usage-stats@0.1.0` | 运行中 | 本地恢复源码，有独立仓库；README 已披露同名公开项目 |
| `dsh-agent-orchestrator@0.1.0` | 已卸载/停用 | 本地恢复源码，有独立仓库；其功能已被 Shift-Router 集成版取代 |

机器可读的详细信息位于 [`catalog.json`](catalog.json)。

## 仓库结构

```text
plugins/
  dsh-shift-router/                 # 有明确上游署名的适配版，直接收录
  dsh-better-sidebar-skin-yield/    # 集成附加组件，直接收录
  dsh-usage-stats/                  # 指向独立仓库的 Git submodule
  dsh-agent-orchestrator/           # 指向独立仓库的 Git submodule
catalog.json
install-rc8.sh
```

第三方项目通过不可变版本或 Git commit 引用，而不是再次复制。每个直接收录的
插件都有自己的许可证或来源说明。

## 复现恢复时的运行插件集

连同 submodule 克隆，并以 DSH 服务账户运行：

```bash
git clone --recurse-submodules https://github.com/qtimy/dsh-cloud-server-plugins.git
cd dsh-cloud-server-plugins
bash install-rc8.sh web
```

脚本会安装恢复时的精确版本并在本地构建 Shift-Router，不会安装已停用的
orchestrator。使用前应自行审查每个第三方项目；本集合验证的是身份与可复现性，
并不替代安全审计或信任判断。

对于更新的 DSH 或插件版本，应阅读上游发行说明并测试兼容性，而不是静默修改
这些固定版本。

## 来源政策

- 上游包保留原始名称、链接、许可证与作者归属。
- 适配代码会显著标明其上游项目并保留版权声明。
- 依赖其他项目 UI 接口的兼容附加组件留在本集合中，不另建“原创插件”仓库。
- 只有在未识别到来源项目时，恢复出的插件才建立独立仓库；缺失的历史会被
  如实披露，绝不虚构。
- 本仓库不包含凭据、提供方密钥、主机名、IP 地址、证书、session 数据、日志
  或线上 settings。

## 许可证

集合文档与安装器采用 MIT 许可证。每个插件保留自己的许可证；请查看其目录或
链接的上游仓库。
