<div align="center">

# 🧠 Gemini Notebook Prompt Lab

**為 Gemini Notebook（原 NotebookLM）打造的分齡、來源限定 Prompt 工作流工具。**

[English](README.md) · [開啟 Gemini Notebook](https://notebook.google.com/) · [回到 Toolkit 60](../README.zh-TW.md)

![Prompts](https://img.shields.io/badge/prompts-90-5357e8)
![Themes](https://img.shields.io/badge/themes-30-13a37f)
![Workflows](https://img.shields.io/badge/workflows-10-7c82ff)
![Runtime](https://img.shields.io/badge/runtime_dependencies-0-success)

</div>

## 這是什麼？

Gemini Notebook Prompt Lab 是一套可在瀏覽器使用的 Prompt 工具，用來**尋找、組合、檢查與重複使用來源限定的 Gemini Notebook 工作流**。

它最早來自一個很實際的教學問題：同一份來源資料，不應該用完全相同的文字密度、視覺節奏與表達方式去教幼兒、青年與成熟學習者。這個專案把這個概念整理成可重複使用的開源 Prompt 系統。

## 🚀 快速開始

### [直接開啟 Gemini Notebook →](https://notebook.google.com/)

基本流程很簡單：

1. 在這裡挑選或組合 Prompt。
2. 一鍵複製。
3. 以新分頁開啟 Gemini Notebook。
4. 貼到對應的 Studio 或 Chat 工作流中。

> **Live Web App：** Toolkit 60 的 GitHub Pages 啟用後，這個專案會部署在 `/notebooklm/` 子路徑。

## ✨ 核心功能

### Prompt Library

瀏覽與搜尋 **90 組分齡 Prompt**，涵蓋 **30 種主題**與 **3 種受眾設定**。

### 同主題分齡比較

同一主題可以直接比較不同受眾版本：

| 對象 | 設計目標 |
|---|---|
| 幼兒／兒童 | 溫暖、清楚、有趣、情緒安全 |
| 青年 | 有設計感、吸引人、好分享、具適度深度 |
| 壯年／成熟學習者 | 穩重、清楚、易讀、有內容深度 |

### Prompt Lab

可組合以下 Gemini Notebook 工作流：

- Slide Deck
- Audio Overview
- Video Overview
- Infographic
- Quiz
- Flashcards
- Reports
- Data Tables
- Source-grounded Chat
- Mind Map 輔助工作流

### Prompt Chains

把多個 Prompt 串成可重複的流程，例如：

1. **Extract**：先從來源中萃取有依據的重點。
2. **Transform**：轉換成教學、簡報或內容成品。
3. **Verify**：再回頭核對來源，找出可能沒有依據的內容。

### 本機 Prompt Linter

Linter 不會再呼叫另一個 AI 模型，而是用透明、可重現的規則檢查：

- 是否限定以來源為依據
- 是否有防止杜撰的指示
- 是否定義清楚受眾
- 是否有明確任務
- 是否指定輸出格式
- 是否有有效限制條件
- Prompt 是否足夠具體
- 兒童情境是否有安全與適齡框架

### Privacy-first 架構

專案設計成純前端靜態工具：

- 不需要後端
- 不需要 API key
- 不需要分析追蹤
- 自訂資料預設只留在瀏覽器，除非使用者主動匯出

## 📦 預計資料夾架構

```text
notebooklm/
├── README.md
├── README.zh-TW.md
├── index.html
├── assets/
├── data/
├── docs/
├── scripts/
├── tests/
├── service-worker.js
└── manifest.webmanifest
```

完整 Web App 會全部放在這個資料夾內，讓 Toolkit 60 根目錄維持乾淨，未來剪片或其他工具也不會混在一起。

## 🧩 為什麼要做 Source Grounding？

只有視覺風格、沒有來源規則的 Prompt，很容易讓模型把「設計說明」誤當成內容主題。因此這套 Prompt 會強調：

- 選取的 Notebook Sources 才是內容主體
- 沒有來源支持的內容不要自行補造
- 設計指示只描述呈現風格，不是文章主題
- 資料不足時要說明不足，而不是猜答案

這些規則也能透過 Linter 做一致性檢查。

## 🌐 語言

第一版主要支援：

- 繁體中文（zh-TW）
- English

未來可再擴充更多語言。

## 🛠️ 下一步

高價值的後續方向包括：

- Gemini Notebook Browser Extension
- 可驗證的社群 Prompt Packs
- Prompt 版本／Diff 歷史
- Accessibility 自動檢查
- 預設關閉的可選同步
- 更多分齡與教學工作流

## 🤝 參與貢獻

可以從這些地方開始：

- 改進某一個分齡版本
- 新增三種受眾都有對應版本的視覺主題
- 改良工作流 Prompt
- 新增或改善 Linter 規則
- 改善手機版與無障礙體驗
- 增加翻譯
- 回報 Gemini Notebook UI 更新造成的相容性問題

## ⭐ 支持專案

如果這個工具對你有幫助，可以替母專案 **[Toolkit 60](../README.zh-TW.md)** 按一顆 Star。這一顆 Star 也會一起支持之後的剪片與其他開源工具。

---

<div align="center">

**Toolkit 60 的第一個正式子專案。**

</div>
