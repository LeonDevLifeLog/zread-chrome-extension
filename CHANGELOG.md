# Changelog

本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [1.0.0] - 2026-07-22

### 新增（Added）

- 初始版本：Chrome 扩展（Manifest V3）。
- 在 GitHub 仓库页注入高亮按钮 **⚡ zread.ai**，点击后新标签页打开对应 zread.ai 页面。
- 仅将 `github.com` 替换为 `zread.ai`，完整保留路径、查询参数与哈希。
- 按钮注入在 **Watch 左侧**，并与 Watch / Fork / Star 同尺寸对齐（紫色渐变 + 呼吸光晕）。
- 适配 GitHub Turbo SPA 路由（`turbo:render` + `MutationObserver`），切换仓库自动重注与去重。
- 包含 16 / 48 / 128 像素扩展图标。
