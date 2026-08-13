<div align="center">

# 🧠 Gemini Notebook 提示詞工作室

**為 Gemini Notebook（原 NotebookLM）打造的本機優先、來源限定、分齡提示詞庫與工作流工具。**

[English](README.md) · [🚀 直接打開網站](https://dennis23100.github.io/toolkit_60/) · [最新版本](https://github.com/dennis23100/toolkit_60/releases/latest) · [Issues](https://github.com/dennis23100/toolkit_60/issues) · [參與貢獻](CONTRIBUTING.md)

![Prompts](https://img.shields.io/badge/prompts-90-665fe8)
![Themes](https://img.shields.io/badge/themes-30-15977f)
![Audiences](https://img.shields.io/badge/audiences-3-7a74f0)
![Workflows](https://img.shields.io/badge/workflows-10-5357e8)
![Tests](https://img.shields.io/badge/tests-automated-success)
![License](https://img.shields.io/badge/code-MIT-blue)

</div>

## 這個專案在解決什麼？

很多 Prompt repository 最後只是一長串文字清單。這個專案從一個更實際的問題開始：

> **同一份可信來源，真的應該用完全相同的方式呈現給幼兒、青年與較成熟的學習者嗎？**

Gemini Notebook 提示詞工作室把這個問題做成可重複使用的開源工作流：內容仍然以來源為依據，但可以依受眾調整語氣、資訊密度、節奏與視覺方向。

## 來自真實教學情境

這個專案受到真實教學經驗影響，其中包含一次**台下 100+ 位聽眾**的實體教學分享。這段經驗讓一件事情更明確：教學不只是「資訊正確」就夠了，如何呈現、節奏怎麼安排、受眾是否適配，同樣會影響理解。

我們會另外準備一段經過隱私檢查的教學現場短片／截圖，作為「這個問題從哪裡來」的背景；**不會把 100+ 位現場聽眾包裝成 100+ GitHub 使用者。**

更多背景請看：[專案故事](docs/PROJECT_STORY.zh-TW.md)。

## 你可以做什麼？

### 📚 提示詞庫

瀏覽 **90 組分齡提示詞**、**30 種視覺主題**、**3 種受眾設定**。可以搜尋、篩選、收藏、比較不同年齡版本、複製、分享、匯入與匯出。

### 🧪 提示詞工作室

依照下列條件快速組出新的來源限定英文 Prompt：

- Gemini Notebook 工作流／產出類型；
- 受眾；
- 聚焦主題；
- 視覺主題；
- 深度／難度；
- 角色；
- 額外限制；
- 嚴格來源限定規則。

### 🔗 流程串接 — 進階

建立可重複執行的多步驟流程，例如：

```text
萃取 → 產出 → 驗證
```

### ✅ 品質檢查 — 進階

用透明、可重現的本機規則檢查 Prompt 是否包含來源限定、防杜撰、受眾、任務、輸出格式、約束與足夠具體性。

## 使用方式其實只有 3 步

```text
1. 選一個 Prompt，或自己組一個
                 ↓
2. 複製並開啟 Gemini Notebook
                 ↓
3. 搭配你自己的可信來源資料使用
```

這個網站本身不會把你的 Prompt 傳到專案伺服器，因為專案沒有後端、登入系統、分析 SDK、資料庫或內嵌 API key。

## 為什麼分齡版本值得做？

這個專案不主張某組年齡切分是放諸四海皆準的教育學定律；目前範圍是原始教學流程的可調整預設。

真正重要的是**比較同一份來源在不同受眾下的呈現差異**：

| 同一份來源 | 幼兒 | 青年 | 壯年 |
|---|---|---|---|
| 用字 | 短、熟悉 | 有吸引力、保留適度深度 | 成熟、有內容 |
| 視覺密度 | 低 | 中 | 控制良好的資訊量 |
| 節奏 | 簡單、引導式 | 較有動能 | 結構清楚、穩定 |
| 語氣 | 溫暖、安全 | 好理解、有共感 | 穩重、可信 |

## 成果預覽

網站目前已加入輕量的**「風格預覽・示意」**，幫助使用者在看 Prompt 前先理解主題的視覺氣氛。這些示意圖**不是 Gemini Notebook 保證會生成的成果**。

下一個展示里程碑不會一口氣做 30 × 3 = 90 張，而是先做 **3 個代表性主題 × 3 種受眾 = 9 個真實生成範例**。這樣就足以把「同一份可信來源，如何依受眾改變呈現」這個核心價值說清楚，也比較容易維護。

請看：[成果展示規劃](docs/SHOWCASE.zh-TW.md) 與 [Issue #6](https://github.com/dennis23100/toolkit_60/issues/6)。

## 目前規模

- **90 組 Prompt**
- **30 種視覺主題**
- **3 種受眾設定**
- **10 種 Gemini Notebook 工作流**
- 繁體中文 + 英文介面
- 本機收藏／自訂 Prompt／Chain
- JSON 匯入／匯出
- PWA／離線支援
- 來源限定驗證
- 自動測試與 GitHub Actions
- GitHub Pages Live Demo

## 這是一個持續維護的 OSS

它不是一次性把 Prompt 丟上 GitHub 就結束。

- [最新 Release](https://github.com/dennis23100/toolkit_60/releases/latest)
- [Open Issues](https://github.com/dennis23100/toolkit_60/issues)
- [`good first issue`](https://github.com/dennis23100/toolkit_60/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
- [`help wanted`](https://github.com/dennis23100/toolkit_60/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)
- [如何參與](CONTRIBUTING.md)
- [Maintainers](MAINTAINERS.md)
- [Security Policy](SECURITY.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [授權說明](LICENSING.md)

修改 NotebookLM 程式或資料前，請先跑：

```bash
cd notebooklm
npm run check
```

## 現在最適合參與的項目

- Markdown + CSV 匯出；
- 可分享的 URL 篩選狀態；
- 鍵盤操作／Accessibility audit；
- 日文 UI / metadata 翻譯；
- 第一批 9 張真實生成成果範例。

如果是比較大的改動，請先從 Issue 開始，不要直接送一個範圍很大的 PR。

## Roadmap

現階段這個 repository **專心主打 Gemini Notebook / NotebookLM**，不再同時放未完成的剪片工具。

接下來優先順序：

1. **真實生成成果 Showcase**；
2. **最近使用／本機歷史紀錄**；
3. **簡易模式 / 進階模式**；
4. 更好的匯出與分享；
5. Accessibility；
6. 更多語言；
7. 一個**可選的 Browser Extension**，在保持低權限的前提下減少「複製 → 開啟 → 貼上」的摩擦。

未來如果真的做剪片工具，會另外開 repository，不再混在這個專案裡。

## Repository 架構

```text
.
├── README.md
├── README.zh-TW.md
├── CONTRIBUTING.md
├── MAINTAINERS.md
├── SECURITY.md
├── LICENSE
├── docs/
└── notebooklm/
    ├── index.html
    ├── assets/
    ├── data/
    ├── tests/
    ├── README.md
    ├── README.zh-TW.md
    ├── AGENTS.md
    └── ...
```

目前 Web App 實作仍放在 `notebooklm/`；根 README 則負責當整個專案首頁。

## 授權與來源

- Repository／網站程式碼：**MIT**。
- 本專案自行建立與改寫的 Prompt、metadata：請看 `notebooklm/LICENSE-DATA.md` 與 [LICENSING.md](LICENSING.md)。
- 上游靈感來源與 attribution：`notebooklm/THIRD_PARTY_NOTICES.md`。

本專案與 Google 無官方關係；Gemini Notebook、NotebookLM 等名稱只用來描述相容產品。

---

<div align="center">

### 🚀 [直接打開 Gemini Notebook 提示詞工作室](https://dennis23100.github.io/toolkit_60/)

如果這個專案對你有幫助，GitHub ⭐ 可以讓更多教育者、知識工作者與 Prompt 使用者看到它。更有價值的方式是：真的使用它、提出 Issue、改進一個 Prompt，或送一個範圍清楚的 PR。

</div>
