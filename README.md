# DeepSeek Harness 宝塔面板主题

![Version](https://img.shields.io/badge/version-0.0.1-20a53a)
![License](https://img.shields.io/badge/license-MIT-blue)

`dsh-bt-panel-theme` 是一个 DeepSeek Harness Web 插件，提供宝塔风格的浅色/暗色主题，并将宝塔面板原生页面内嵌到 Harness。

## 功能

- 宝塔绿色浅色主题与宝塔暗色主题
- 首页“预览版”显示为“宝塔版”
- 左侧菜单增加“宝塔面板”入口
- API 配置验证和自动登录
- 内嵌页面状态保持
- 新窗口打开宝塔原地址并继承登录态
- 复用 Harness 当前端口，不新增监听端口

## 环境要求

- Node.js 20+
- DeepSeek Harness Web profile
- 已启用 API 的宝塔面板
- Harness 服务器 IP 已加入宝塔 API 白名单

## 安装

```bash
git clone https://github.com/<your-github-username>/deepseek-harness-bt-panel-theme.git
dsh plugin --profile web add ./deepseek-harness-bt-panel-theme
dsh web
```

安装或更新后请重启 `dsh web`，并刷新浏览器页面。

## 配置

打开以下位置：

```text
设置 → 插件 → 插件配置 → 宝塔面板
```

| 配置项 | 说明 |
| --- | --- |
| 宝塔面板地址 | 完整的 HTTP 或 HTTPS 地址 |
| API 密钥 | 宝塔面板“API接口”中生成的密钥 |
| 验证 SSL 证书 | 使用自签名证书时可关闭 |
| 请求超时 | 1000–60000 毫秒 |

保存时会验证面板地址、API 密钥和 API 白名单。已保存的 API 密钥不会回显，输入框留空会保留原密钥。

## 使用

1. 保存宝塔面板配置。
2. 点击左侧“宝塔面板”进入内嵌页面。
3. 点击会话或“新会话”返回对话页面。

切换页面不会销毁宝塔 iframe，再次进入时会保留当前页面状态。

## 注意事项

- 插件不会修改宝塔面板源码或配置。
- API 密钥只在 Harness Host 中使用，不会写入 iframe 地址。
- 内嵌代理使用 Harness 现有 WebServer，不会额外占用端口。

## 卸载

```bash
dsh plugin --profile web remove dsh-bt-panel-theme
```

## 许可证

[MIT](./LICENSE)
