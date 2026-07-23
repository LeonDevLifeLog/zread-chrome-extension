# 贡献指南（Contributing）

感谢你考虑为 **GitHub → zread.ai** 做出贡献！🎉

本项目是一个极简的 Chrome 扩展（Manifest V3），核心代码只有 `manifest.json` 与 `content.js`。
在提交之前，请花一分钟阅读以下约定。

## 行为准则

- 友善、尊重、就事论事。
- 不提交任何会收集用户数据或发起未声明网络请求的逻辑。

## 如何提交问题（Issue）

请使用本仓库提供的模板：

- **Bug report**：用于报告按钮不显示、位置错误、跳转异常等。
  请务必附带**具体仓库 URL**、浏览器及版本、扩展版本，以及复现步骤。
- **Feature request**：用于提出新功能或改进建议。

也可以直接提交一个普通的 Issue，但信息越完整，我们修复/讨论得越快。

## 如何提交代码（Pull Request）

1. Fork 本仓库并克隆到本地。
2. 创建特性分支：`git checkout -b feat/your-feature` 或 `fix/your-fix`。
3. 在 `chrome://extensions` 用「加载已解压的扩展程序」选择本目录进行本地验证。
4. 保持改动**小而聚焦**，一次 PR 只解决一个问题。
5. 提交信息使用中文或英文均可，但请清晰描述「做了什么 / 为什么」：

   ```
   fix: 适配新版 GitHub 页头选择器

   新版仓库页头使用 data-testid="repo-header-actions"，
   旧的 pagehead-actions 已失效，导致按钮落入浮动兜底。
   ```

6. 推送并创建 Pull Request，并在描述中关联相关 Issue（如 `Closes #12`）。

## 代码风格

- `content.js` 使用 IIFE + `'use strict'`，保持纯原生 JS（不引入构建工具/依赖）。
- 选择器需同时兼容新旧两套 GitHub 页头结构，并保留兜底逻辑。
- 样式一律使用 `!important` 覆盖 GitHub 内联/组件样式，并尽量复用其尺寸类以保持视觉一致。

## 发布

版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。维护者会在合并后打对应 tag 并更新 `CHANGELOG.md`。

---

再次感谢你的参与！🚀
