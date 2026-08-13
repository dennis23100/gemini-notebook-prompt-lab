# 真實生成成果 Showcase

## 目標

讓第一次進 GitHub 的使用者，在一分鐘內透過**真正生成的成果**理解這個專案，而不是只看到一長串 Prompt 文字。

第一個里程碑刻意只做 **9 個成果**，不是 90 個。

## 已建立可重現 Showcase

現在 repository 已經有一套公開、可重現的 Showcase 骨架：

- 線上頁面：`https://dennis23100.github.io/gemini-notebook-prompt-lab/showcase.html`
- 固定測試來源：[`notebooklm/docs/showcase/SOURCE.md`](../notebooklm/docs/showcase/SOURCE.md)
- 9 格設定檔：[`notebooklm/docs/showcase/manifest.json`](../notebooklm/docs/showcase/manifest.json)
- 圖片上傳規則：[`notebooklm/assets/showcase/README.md`](../notebooklm/assets/showcase/README.md)

在真正成果圖還沒放進去以前，線上頁面只會顯示透明的 placeholder，並提供對應 Prompt 的直接入口，**不會拿 mockup 冒充 Gemini Notebook 真實輸出**。

## 第一批展示矩陣

九個範例全部固定使用專案自行撰寫、可公開重新散布的虛構教學來源 **The Community Garden Plan**，這樣才能公平比較受眾與視覺主題差異。

| 主題 | 幼兒 | 青年 | 壯年 |
|---|---|---|---|
| 漫畫（不拘） | ⬜ | ⬜ | ⬜ |
| 科技 | ⬜ | ⬜ | ⬜ |
| 水墨 | ⬜ | ⬜ | ⬜ |

總共是 **3 個主題 × 3 種受眾 = 9 個範例**。

精確 Prompt ID 已經固定寫進 `notebooklm/docs/showcase/manifest.json`，未來可以重現與比對。

## 為什麼先選這三種？

- **漫畫（不拘）**：最容易看出分齡與節奏差異。
- **科技**：證明工具不只適合童趣／教學風格。
- **水墨**：視覺語言與前兩種差異很大，也能展示較成熟、沉穩的方向。

三種放在一起就能展示範圍，不需要一開始就把 README 塞滿 90 張圖片。

## 每張真實生成成果都要記錄

```text
Prompt ID：
主題：
受眾：
來源名稱／來源類型：
生成工具：
生成日期：
生成後是否人工修改：是／否 + 說明
```

第一批九張必須使用上面固定的 controlled source，除非未來明確修改 Showcase 規格並留下紀錄。

## 標示規則

一定要清楚區分：

- **風格預覽・示意**：目前網站用 CSS 畫出的視覺方向示意。
- **真實生成範例**：實際使用本專案 Prompt／Workflow 生成的結果。

即使是真實生成成果，也只能稱為「範例」，**不能保證另一個人重新生成時會長得完全一樣**。

## 第一批檔案結構

```text
notebooklm/assets/showcase/
├── comic-flex-children.webp
├── comic-flex-youth.webp
├── comic-flex-adult.webp
├── tech-children.webp
├── tech-youth.webp
├── tech-adult.webp
├── ink-children.webp
├── ink-youth.webp
└── ink-adult.webp
```

圖片優先使用 WebP；不必要的超高解析原圖不要全部塞進 repository。

## 現在先不要做的事

不要為了讓 GitHub 看起來很大，就先做完 **30 × 3 = 90** 張。

只有在以下情況再擴充：

- 使用者真的想看某一個主題；
- contributor 提供合法、可公開且有價值的範例；
- 新範例能增加理解，而不是只是重複既有畫面。

追蹤 Issue：[#6](https://github.com/dennis23100/gemini-notebook-prompt-lab/issues/6)。
