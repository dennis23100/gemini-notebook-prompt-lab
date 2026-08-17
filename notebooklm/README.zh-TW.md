<div align="center">

# Gemini Notebook Prompt Lab

**一套為 Gemini Notebook（原 NotebookLM）設計的「分齡 × 來源限定 × 可組合」開源 Prompt Library 與工作流工具。**

[English](README.md) · [🚀 打開 Prompt Lab](https://dennis23100.github.io/gemini-notebook-prompt-lab/) · [返回專案首頁](../README.zh-TW.md) · [參與貢獻](CONTRIBUTING.md)

## 🚀 [打開 Prompt Lab](https://dennis23100.github.io/gemini-notebook-prompt-lab/)

**先打開我們自己的 Prompt Lab。準備把 Prompt 交給 Gemini Notebook 時，再按網站裡醒目的 📓 Gemini Notebook 按鈕；它會用新分頁開啟，不會蓋掉目前頁面。**

![Prompts](https://img.shields.io/badge/prompts-132-5357e8)
![Themes](https://img.shields.io/badge/themes-44-13a37f)
![Workflows](https://img.shields.io/badge/workflows-10-7c82ff)
![Dependencies](https://img.shields.io/badge/runtime_dependencies-0-success)
![License](https://img.shields.io/badge/code-MIT-blue)
![Prompt Data](https://img.shields.io/badge/prompt_data-CC_BY_4.0-orange)

</div>

> **名稱更新：** Google 已於 2026 年 7 月把 NotebookLM 正式更名為 **Gemini Notebook**。本專案使用現在的產品名稱與 `notebook.google.com`，同時保留 NotebookLM 關鍵字，方便既有使用者搜尋與理解。

## 這個專案不是單純「放很多 Prompt」

很多 Prompt repository 最後只會變成一大篇 Markdown。這個專案的目標是把 Prompt 做成一個真的可以使用、Fork、修改、驗證與共同維護的小產品：

- **132 組分齡簡報 Prompt**：44 個視覺主題 × 3 種受眾。
- **14 種全新原創特色主題**：涵蓋夢幻動畫、迷你冒險、天空探索、舞台表演、文化幾何與更生動的成人編輯設計。
- **同主題跨年齡比較**：直接比較幼兒、青年、壯年版如何調整語氣、密度與視覺節奏。
- **Prompt Lab**：支援 Slide Deck、Audio Overview、Video Overview、Infographic、Quiz、Flashcards、Report、Data Table、來源問答與 Mind Map 輔助工作流。
- **Prompt Chain Builder**：把「萃取 → 產出 → 驗證」做成可重複流程。
- **本機 Prompt Linter**：透明檢查來源限定、防杜撰、受眾、任務、輸出格式與約束條件。
- **收藏、自訂、匯入、匯出**：全部存在瀏覽器本機。
- **一鍵「複製並開啟 Gemini Notebook」**：以新分頁開啟 `https://notebook.google.com/`，不會覆蓋目前頁面。
- **PWA / 離線支援**：不需要帳號、後端、API key、分析追蹤或 runtime dependency。
- **可維護 Prompt Packs**：132 筆 Prompt 拆成 8 個可獨立 review 的資料包，讓 GitHub diff、PR 與社群貢獻更清楚。

## 專案起源

最初的需求來自**佛堂／社群教學的分齡簡報**：同一份來源內容，給 15 歲以下、16–34 歲與較成熟的學習者時，不應該使用完全相同的字量、情緒節奏與視覺語言。

因此這套工具不是把宗教內容硬塞給所有人，而是把「**同一份可信來源，依不同受眾重新設計呈現方式**」這個方法抽象化，讓教育者、講師、社群教學者、研究者與知識工作者都可以 Fork 使用。

## 快速開始

```bash
git clone https://github.com/dennis23100/gemini-notebook-prompt-lab.git
cd gemini-notebook-prompt-lab/notebooklm
npm run dev
```

瀏覽器開啟：

```text
http://localhost:4173
```

本專案**沒有 npm 套件相依**。`npm run dev` 只是使用專案內建的 Node 靜態伺服器。

也可以直接：

```bash
python -m http.server 4173
```

## 部署到 GitHub Pages

本 repository 的根目錄放置 `.github/workflows/pages.yml`，負責驗證此 App 並部署 GitHub Pages：

1. 把 repo push 到 GitHub。
2. 進入 **Settings → Pages**。
3. **Source** 選 **GitHub Actions**。
4. Push 到 `main`，或手動執行 Pages workflow。
5. 網站會出現在 `https://<username>.github.io/<repo>/`。

所有檔案都使用相對路徑，因此可以直接放在 GitHub Pages 的專案子路徑。

## 主要功能

### 1. 分齡 Prompt Library

每一個主題都有三種版本：

| 受眾 | 原始預設 | 設計重點 |
|---|---|---|
| 幼兒 | 15 歲以下 | 溫暖、活潑、清楚、情緒安全 |
| 青年 | 16–34 歲 | 有風格、好理解、可分享、保留適度深度 |
| 壯年 | 35 歲以上 | 可讀性高、內容有份量，依主題選擇沉靜或生動節奏 |

年齡範圍沿用原始教學資料，網站不把它當作普遍教育學定律；如果你 Fork 專案，可以直接改成自己的受眾定義。

### 2. Prompt Lab

使用者可以選：工作流／產出類型、受眾、聚焦主題、簡報視覺主題、深度／難度、角色、額外限制與是否啟用嚴格來源限定。完成後可以直接複製、開啟 Gemini Notebook、加入 Chain 或丟到結構檢查。

### 3. Prompt Chain

Chain 是一組可編輯、可排序的 Prompt。預設範例：萃取來源中的核心概念 → 轉換成教學產出 → 驗證前一步是否加入來源沒有支持的內容。Chain 會儲存在 `localStorage`，不會上傳到任何伺服器。

### 4. Prompt 結構檢查

結構完整度不是「AI 幫 AI 打分」，更不是成品品質保證；它只是完全透明的 deterministic rules：來源限定、防杜撰、受眾、任務、輸出格式、約束、具體性與兒少版本安全提示。

## 現在的 Gemini Notebook 相容性

工作流清單依 Google 公開文件維護；相容性資訊放在 `data/workflows.json`，避免散落寫死在程式裡。

- Gemini Notebook 官方介紹：https://notebooklm.google/
- 官方說明中心：https://support.google.com/notebooklm
- 目前 Web App：https://notebook.google.com/

## 為什麼值得 Fork

這個 repo 的核心不是特定佛堂，而是：

```text
可信來源
  ↓
受眾適配（年齡／程度）
  ↓
呈現主題（30 styles）
  ↓
工作流（slides/audio/video/quiz/...）
  ↓
品質檢查
  ↓
Gemini Notebook
```

你可以把原始場景換成國中／高中課程、大學講義、企業教育訓練、讀書會、社區課程、專業證照、研究文獻整理或自己的 Prompt Pack。

## 開源與授權

- **網站與工具程式碼：MIT**，見 [LICENSE](LICENSE)。
- **本專案自行改寫／建立的 Prompt 與 metadata：CC BY 4.0**，見 [LICENSE-DATA.md](LICENSE-DATA.md)。
- 參考過的上游開源專案與授權說明：見 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。

本專案與 Google 無官方關係；Gemini Notebook、NotebookLM 等名稱只用來描述相容產品。

## 參與貢獻

適合第一次 PR 的項目包含：改善分齡 Prompt、新增完整三受眾主題、改善工作流 recipe、新增 Prompt Linter 規則與測試、翻譯 UI / metadata，以及手機版與 accessibility。

詳細規則請看 [CONTRIBUTING.md](CONTRIBUTING.md)。

## Roadmap

請看 [ROADMAP.md](ROADMAP.md)。目前優先是真實成果 Showcase、最近使用紀錄、Accessibility、更多語言與可選的低權限 Browser Extension。

## 發布與 Star 成長

Repo 描述、Topics、Social Preview、Issues 與發布分享策略請看 [`docs/launch-and-growth.md`](docs/launch-and-growth.md)。

## 如果這個專案有幫到你

可以按一顆 GitHub ⭐。更好的方式是 Fork 後加一個你真的會用的 Prompt／工作流，再送 PR 回來。
