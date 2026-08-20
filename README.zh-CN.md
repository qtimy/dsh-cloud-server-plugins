# DSH 云服务器插件集合

[English](README.md) | 简体中文

这是一个为 DSH 云服务器部署准备的固定版本插件集合。插件代码与模型路由策略
和只负责 HTTPS 暴露的核心部署仓库保持分离。

## 包含的插件

| 插件 | 类型 | 来源 |
| --- | --- | --- |
| `@linxin666/dsh-web-ui-all@0.1.12` | 上游 npm 包 | [`zhu1090093659/dsh-web-ui`](https://github.com/zhu1090093659/dsh-web-ui) |
| `dsh-better-sidebar@0.12.1` | 上游 npm 包 | [`omdsh-dev/DSH-better-sidebar`](https://github.com/omdsh-dev/DSH-better-sidebar) |
| `dsh-plugin-marketplace@8db98f7` | 上游 Git 修订 | [`bradeGithub/DSH-Plugins-Marketplace`](https://github.com/bradeGithub/DSH-Plugins-Marketplace) |
| `dsh-shift-router@0.6.1` | DSH 适配版 | 基于 [`green-dalii/pi-shift-router`](https://github.com/green-dalii/pi-shift-router) |
| `dsh-better-sidebar-skin-yield@0.1.1` | 旧版兼容附加组件 | Better Sidebar 与 dsh-web-ui 集成辅助插件 |
| `dsh-usage-stats@0.1.0` | 独立的本地 session 统计插件 | [`qtimy/dsh-usage-stats`](https://github.com/qtimy/dsh-usage-stats) |
| `dsh-agent-orchestrator@0.1.0` | 可选的独立子代理路由插件 | [`qtimy/dsh-agent-orchestrator`](https://github.com/qtimy/dsh-agent-orchestrator) |

安装器会启用前六项。`dsh-agent-orchestrator` 作为可选 submodule 收录，但默认
不安装，因为 Shift-Router 已经包含其 orchestration 功能。

## 兼容性

当前固定版本面向 DSH `0.1.0-rc.8`。修改版本前，请先测试更新的 DSH 或插件
版本。机器可读的包来源与版本位于 [`catalog.json`](catalog.json)。

## 安装

连同 submodule 克隆，并以 DSH 服务账户运行：

```bash
git clone --recurse-submodules https://github.com/qtimy/dsh-cloud-server-plugins.git
cd dsh-cloud-server-plugins
bash install-rc8.sh web
```

脚本会安装精确的上游版本、在本地构建 Shift-Router，并从当前持久化检出目录
链接本地插件。安装完成后请重启 DSH。

## 仓库结构

```text
plugins/
  dsh-shift-router/
  dsh-better-sidebar-skin-yield/
  dsh-usage-stats/                  # Git submodule
  dsh-agent-orchestrator/           # Git submodule，可选
catalog.json
install-rc8.sh
```

## 署名与许可证

上游包只作引用，不复制源码。直接收录的适配版和兼容代码保留上游链接与许可证
声明。请查看各插件目录或上游仓库了解其许可证。

集合文档与安装器采用 MIT 许可证。
