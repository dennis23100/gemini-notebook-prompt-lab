<div align="center">

# 🧰 Toolkit 60

**持續成長中的開源工具集：AI、內容創作、自動化與實用工作流程。**

[English](README.md) · [工具列表](#-目前工具) · [參與貢獻](#-參與貢獻) · [Issues](../../issues)

![Status](https://img.shields.io/badge/status-growing-2ea44f)
![Projects](https://img.shields.io/badge/projects-2-5357e8)
![License](https://img.shields.io/badge/code-MIT-blue)

</div>

## Toolkit 60 是什麼？

Toolkit 60 是我集中開發、維護實用工具的開源工具集。每一個工具都有自己的資料夾、README、文件與使用方式，但共用同一個 GitHub repository，讓使用者更容易發現其他工具，也方便長期維護與協作。

核心想法很簡單：**把有用的想法，真正做成別人可以打開、看懂、Fork、改進並直接使用的工具。**

## 🚀 目前工具

### 🧠 Gemini Notebook Prompt Lab — 可使用

為 **Gemini Notebook（原 NotebookLM）**打造的分齡、來源限定 Prompt Library 與 Workflow Builder。

- 90 組分齡 Prompt
- 30 種視覺主題
- 3 種受眾設定
- 10 種 Notebook 工作流程
- Prompt Lab、Prompt Chains、本機 Prompt Linter
- 收藏、匯入／匯出、PWA／離線支援
- 一鍵前往 `notebook.google.com`

### 🚀 [直接打開 Prompt Lab](https://dennis23100.github.io/toolkit_60/notebooklm/)

**→ [查看原始碼與完整文件](notebooklm/)**  
**→ [Gemini Notebook Prompt Lab v1.0.0 Release](../../releases/tag/notebooklm-v1.0.0)**

---

### 🎬 Video Editing Toolkit — 規劃中

未來將放入與剪片、字幕、批次處理及創作者自動化相關的開源工具。

目前規劃方向：

- 智慧靜音／空白片段處理
- 字幕與 Caption 工作流
- 批次處理
- 場景／鏡頭工具
- 短影音輔助工具
- 剪輯流程自動化

**→ [查看剪片專案](video-editing/)**

---

## 📁 Repository 架構

```text
toolkit_60/
├── README.md
├── README.zh-TW.md
├── CONTRIBUTING.md
├── MAINTAINERS.md
├── SECURITY.md
├── LICENSE
├── notebooklm/
│   ├── README.md
│   ├── README.zh-TW.md
│   └── ...
├── video-editing/
│   ├── README.md
│   ├── README.zh-TW.md
│   └── ...
└── .github/
```

每個主要工具資料夾都會有**自己的 README**。當你在 GitHub 點進該資料夾時，下方會直接顯示那個工具自己的完整介紹，包括功能、截圖、Live Demo、安裝方式、架構與貢獻方式。

## 🌱 為什麼放在同一個工具集？

這種結構可以讓不同工具共享同一個 GitHub 入口，同時又保持各自獨立：

- 一次找到多個實用工具
- Follow／Star 一個 repository 就能持續看到後續工具
- 更容易累積 Issue、PR 與開源貢獻
- 可以共用 GitHub Actions、文件與維護規範
- 長期看起來更像一套持續成長的開源作品集

如果未來某個子專案真的長出自己的使用者、maintainer 或獨立 release 節奏，再把它拆成獨立 repository 也不遲；現在先把第一批真實使用與貢獻集中起來。

## 🗺️ 目前 Roadmap

| 專案 | 狀態 | 直接使用 | 原始碼 |
|---|---|---|---|
| Gemini Notebook Prompt Lab | 🟢 Active | [打開 Prompt Lab](https://dennis23100.github.io/toolkit_60/notebooklm/) | [`notebooklm/`](notebooklm/) |
| Video Editing Toolkit | 🟡 Planned | Coming soon | [`video-editing/`](video-editing/) |
| 更多工具 | ⚪ Future | — | 後續公布 |

## 🤝 參與貢獻

真正的使用回饋、Bug、功能建議、Prompt 改進、文件修正、無障礙檢查、翻譯與 Pull Request 都很歡迎。

- **先看這裡：** [CONTRIBUTING.md](CONTRIBUTING.md)
- **目前待辦：** [Issues](../../issues)
- **適合第一次貢獻：** `good first issue`
- **需要社群協助：** `help wanted`
- **維護者：** [MAINTAINERS.md](MAINTAINERS.md)

每個子專案資料夾也會有更具體的貢獻說明。

## 🛡️ 專案健康度

- [Security Policy](SECURITY.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [授權總覽](LICENSING.md)
- [MIT 程式碼授權](LICENSE)
- [最新 Release](../../releases/latest)

## ⭐ 支持 Toolkit 60

如果其中任何一個工具對你有幫助，可以替 **Toolkit 60** 按一顆 Star，讓更多人看到整套工具。比 Star 更有價值的是：留下真實使用回饋、Issue、功能需求、PR 或實際使用案例，因為這些會直接讓專案變得更好。

---

<div align="center">

**持續做真正能用、也能被共同維護的開源工具。**

</div>
