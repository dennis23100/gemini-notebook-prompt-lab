const ZH_TEXT = {
  install: '安裝網站',
  openNotebook: '📓 開啟 Gemini Notebook ↗',
  eyebrow: '來源限定 · 分齡適配 · 可分享 · 隱私優先',
  heroTitle: '把「找提示詞」變成一套可重複的 Gemini Notebook 工作流。',
  heroBody: '從 132 組分齡簡報 Prompt 與 44 種視覺主題出發，快速找到夢幻、動畫、冒險、文化與成熟生動的方向。所有資料都在瀏覽器本機執行。',
  browsePrompts: '瀏覽提示詞',
  buildPrompt: '建立提示詞',
  statPrompts: '分齡提示詞',
  statThemes: '視覺主題',
  statAges: '年齡層',
  statWorkflows: '工作流',
  privacyNote: '不需登入、不上傳你的提示詞、不使用追蹤器。',
  quickEyebrow: '30 秒上手',
  quickTitle: '複製 → 開啟 → 生成',
  step1Title: '選受眾',
  step1Body: '幼兒、青年或壯年，讓語氣、閱讀密度與視覺節奏跟著調整。',
  step2Title: '複製提示詞',
  step2Body: '使用既有模板，或在提示詞工作室依任務快速組合。',
  step3Title: '開新分頁',
  step3Body: '按一下直接開啟 Gemini Notebook，不會覆蓋目前頁面。',
  tabLibrary: '📚 提示詞庫',
  tabLab: '🧪 提示詞工作室',
  tabChain: '🔗 流程串接',
  tabLint: '✅ 品質檢查',
  search: '搜尋',
  favorites: '☆ 收藏',
  export: '匯出',
  import: '匯入',
  age: '年齡',
  category: '分類',
  clearFilters: '清除篩選',
  emptyTitle: '找不到符合條件的提示詞',
  emptyBody: '換一個關鍵字，或清除篩選條件。',
  composerEyebrow: '提示詞組合器',
  composerTitle: '用任務組合，而不是從空白開始',
  workflow: '工作流',
  audience: '受眾',
  focus: '聚焦主題',
  visualTheme: '視覺主題',
  difficulty: '深度 / 難度',
  role: '角色',
  extra: '額外要求',
  strictGrounding: '嚴格來源限定：來源沒有寫，就不要補。',
  generatePrompt: '產生提示詞',
  addToChain: '加入流程',
  preview: '預覽',
  generatedPrompt: '產生的英文提示詞',
  copy: '複製',
  copyOpen: '複製並開啟 Gemini Notebook ↗',
  checkQuality: '檢查品質',
  chainTitle: '把多個提示詞串成可重複流程',
  chainBody: '適合「先萃取 → 再產出 → 最後檢查」這類任務。所有步驟都可以編輯與重新排序。',
  loadExample: '載入範例流程',
  copyChain: '複製整個流程',
  clear: '清空',
  chainEmptyTitle: '流程還是空的',
  chainEmptyBody: '從提示詞庫或提示詞工作室加入提示詞，或載入範例流程。',
  lintTitle: '在送進 Gemini Notebook 前先做品質檢查',
  lintBody: '這不是 AI 評審，而是一套透明的本機規則：來源限定、受眾、任務、輸出格式、約束與防杜撰。',
  runCheck: '執行檢查',
  useSelected: '使用目前選取的提示詞',
  qualityScore: '提示詞品質分數',
  lintIdle: '貼上英文提示詞後執行檢查。',
  whyEyebrow: '為什麼做這個工具？',
  whyTitle: '不是「提示詞越多越好」，而是要能被使用、修改、驗證與共同維護。',
  f1Title: '分齡對照',
  f1Body: '同一主題可以直接比較三種年齡層的提示詞差異。',
  f2Title: '來源限定',
  f2Body: '提示詞明確要求只使用來源，降低內容被風格指令帶偏。',
  f3Title: '可組合工作流',
  f3Body: '簡報、音訊、影片、測驗、報告等任務都能用同一套組合器完成。',
  f4Title: '隱私優先',
  f4Body: '收藏、自訂內容與流程都存在瀏覽器本機；沒有帳號與伺服器。',
  footerOrigin: '起源於分齡佛堂教學需求，後來整理成任何教育與知識工作者都能自行改作的開源工具。',
  share: '分享',
  copyOpenShort: '複製並開啟 ↗',
  sources: '來源與授權',
  all: '全部',
  view: '查看',
  copied: '已複製',
  favoriteAdded: '已加入收藏',
  favoriteRemoved: '已取消收藏',
  shared: '分享連結已複製',
  imported: '已匯入提示詞',
  importError: '匯入失敗：JSON 格式不符合需求',
  exported: '已匯出目前篩選結果',
  addedChain: '已加入流程',
  chainCopied: '流程已複製',
  chainLoaded: '範例流程已載入',
  noFocus: '請先輸入聚焦主題',
  results: '個提示詞',
  custom: '自訂',
  compare: '比較年齡版本'
};

const EN_TAB_TEXT = {
  tabLibrary: '📚 Prompt Library',
  tabLab: '🧪 Prompt Lab',
  tabChain: '🔗 Chain Builder',
  tabLint: '✅ Quality Check'
};

const ROLE_PRESETS = [
  { value: 'source-grounded tutor', zh: '來源限定教學助手', en: 'Source-grounded tutor' },
  { value: 'research analyst', zh: '研究分析助手', en: 'Research analyst' },
  { value: 'presentation designer', zh: '簡報設計助手', en: 'Presentation designer' },
  { value: 'critical reviewer', zh: '內容查核助手', en: 'Critical reviewer' }
];

const DIFFICULTY = {
  beginner: { zh: '入門', en: 'Beginner' },
  balanced: { zh: '平衡', en: 'Balanced' },
  advanced: { zh: '進階', en: 'Advanced' }
};

const THEME_MIGRATION_VERSION = '2';
const UI_MODE_KEY = 'gnpl.uiMode';
const FEEDBACK_URL = 'https://github.com/dennis23100/gemini-notebook-prompt-lab/issues/new/choose';
const isZh = () => document.documentElement.lang.toLowerCase().startsWith('zh');

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('gnpl.theme', theme);
  localStorage.setItem('gnpl.themeVersion', THEME_MIGRATION_VERSION);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = theme === 'dark' ? '#151b27' : '#f6f8fc';
  updateThemeButton();
}

function updateThemeButton() {
  const btn = document.querySelector('#themeToggleBtn');
  if (!btn) return;
  const theme = document.documentElement.dataset.theme || 'light';
  const zh = isZh();
  const switchToDark = theme === 'light';
  btn.innerHTML = `<span aria-hidden="true">${switchToDark ? '🌙' : '☀️'}</span><span class="theme-label">${zh ? (switchToDark ? '深色' : '淺色') : (switchToDark ? 'Dark' : 'Light')}</span>`;
  btn.title = zh ? (switchToDark ? '切換到深色模式' : '切換到淺色模式') : (switchToDark ? 'Switch to dark mode' : 'Switch to light mode');
}

function ensureThemeToggle() {
  if (document.querySelector('#themeToggleBtn')) return;
  const lang = document.querySelector('#langBtn');
  if (!lang) return;
  const btn = document.createElement('button');
  btn.id = 'themeToggleBtn';
  btn.type = 'button';
  btn.className = 'button ghost compact theme-toggle';
  btn.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme || 'light';
    applyTheme(current === 'light' ? 'dark' : 'light');
  });
  lang.parentElement.insertBefore(btn, lang);
  updateThemeButton();
}

function ensureFeedbackLink() {
  const actions = document.querySelector('.top-actions');
  if (!actions) return;
  let link = document.querySelector('#feedbackLink');
  if (!link) {
    link = document.createElement('a');
    link.id = 'feedbackLink';
    link.className = 'button ghost compact feedback-link';
    link.href = FEEDBACK_URL;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    const githubLink = [...actions.querySelectorAll('a')].find(a => /github\.com/i.test(a.href));
    if (githubLink) actions.insertBefore(link, githubLink);
    else actions.appendChild(link);
  }
  link.textContent = isZh() ? '💬 回饋' : '💬 Feedback';
  link.title = isZh() ? '回報問題、提出功能建議或分享使用心得' : 'Report a problem, request a feature, or share feedback';
}

function applyUiMode(mode) {
  const normalized = mode === 'advanced' ? 'advanced' : 'simple';
  localStorage.setItem(UI_MODE_KEY, normalized);
  document.documentElement.dataset.uiMode = normalized;

  ['#tab-chain', '#tab-lint'].forEach(selector => {
    const tab = document.querySelector(selector);
    if (!tab) return;
    tab.classList.toggle('hidden', normalized === 'simple');
  });

  if (normalized === 'simple') {
    const activeAdvanced = document.querySelector('#tab-chain.active, #tab-lint.active');
    if (activeAdvanced) document.querySelector('#tab-library')?.click();
  }
  updateUiModeButton();
}

function updateUiModeButton() {
  const btn = document.querySelector('#uiModeToggleBtn');
  if (!btn) return;
  const mode = document.documentElement.dataset.uiMode || 'simple';
  const zh = isZh();
  const showAdvanced = mode === 'simple';
  btn.textContent = zh
    ? (showAdvanced ? '⚙️ 顯示進階功能' : '✨ 回到簡易模式')
    : (showAdvanced ? '⚙️ Show advanced' : '✨ Simple mode');
  btn.title = zh
    ? (showAdvanced ? '顯示流程串接與品質檢查' : '只顯示提示詞庫與提示詞工作室')
    : (showAdvanced ? 'Show Chain Builder and Quality Check' : 'Show only Library and Prompt Lab');
}

function ensureUiModeToggle() {
  const tabs = document.querySelector('.tabs');
  if (!tabs) return;
  let btn = document.querySelector('#uiModeToggleBtn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'uiModeToggleBtn';
    btn.type = 'button';
    btn.className = 'button ghost compact ui-mode-toggle';
    btn.style.marginLeft = 'auto';
    btn.addEventListener('click', () => {
      const current = document.documentElement.dataset.uiMode || 'simple';
      applyUiMode(current === 'simple' ? 'advanced' : 'simple');
    });
    tabs.appendChild(btn);
  }
  applyUiMode(localStorage.getItem(UI_MODE_KEY) || 'simple');
}

function ensureRolePreset() {
  const input = document.querySelector('#roleInput');
  if (!input || document.querySelector('#rolePreset')) return;
  const select = document.createElement('select');
  select.id = 'rolePreset';
  select.setAttribute('aria-label', '角色預設');
  select.addEventListener('change', () => { input.value = select.value; });
  input.type = 'hidden';
  input.insertAdjacentElement('afterend', select);
  renderRolePreset();
}

function renderRolePreset() {
  const select = document.querySelector('#rolePreset');
  const input = document.querySelector('#roleInput');
  if (!select || !input) return;
  const zh = isZh();
  const current = input.value || 'source-grounded tutor';
  select.innerHTML = ROLE_PRESETS.map(item => `<option value="${item.value}">${zh ? item.zh : item.en}</option>`).join('');
  select.value = ROLE_PRESETS.some(item => item.value === current) ? current : ROLE_PRESETS[0].value;
  input.value = select.value;
}

function localizeDifficulty() {
  const select = document.querySelector('#difficultySelect');
  if (!select) return;
  const zh = isZh();
  [...select.options].forEach(option => {
    const labels = DIFFICULTY[option.value];
    if (labels) option.textContent = zh ? labels.zh : labels.en;
  });
}

function markAdvancedTabs() {
  const zh = isZh();
  ['#tab-chain', '#tab-lint'].forEach(selector => {
    const el = document.querySelector(selector);
    if (!el) return;
    el.classList.add('tab-advanced');
    el.dataset.advancedLabel = zh ? '進階' : 'Advanced';
  });
}

function ensureAdvancedNotes() {
  const zh = isZh();
  const configs = [
    ['#panel-chain .compact-heading', zh ? '適合需要「多步驟、重複執行」的進階使用者。一般使用者可先從提示詞庫與提示詞工作室開始。' : 'Best for repeatable multi-step workflows. New users can start with Library and Prompt Lab.'],
    ['#panel-lint .compact-heading', zh ? '適合檢查自訂或外部提示詞。網站內建提示詞本身已經過規則檢查。' : 'Best for custom or external prompts. Built-in prompts are already checked by the project rules.']
  ];
  configs.forEach(([selector, text]) => {
    const host = document.querySelector(selector);
    if (!host) return;
    let note = host.querySelector('.advanced-note');
    if (!note) {
      note = document.createElement('div');
      note.className = 'advanced-note';
      host.appendChild(note);
    }
    note.innerHTML = `<strong>${zh ? '進階工具' : 'Advanced tool'}</strong><span>${text}</span>`;
  });
}

function patchStaticLabels() {
  const zh = isZh();
  if (zh) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const text = ZH_TEXT[el.dataset.i18n];
      if (text && el.textContent !== text) el.textContent = text;
    });
    const brand = document.querySelector('.brand strong');
    const sub = document.querySelector('.brand small');
    if (brand) brand.textContent = 'Gemini Notebook 提示詞工作室';
    if (sub) sub.textContent = '原 NotebookLM';
    const chainEyebrow = document.querySelector('#panel-chain .eyebrow');
    if (chainEyebrow) chainEyebrow.textContent = '多步驟工作流';
    const lintEyebrow = document.querySelector('#panel-lint .eyebrow');
    if (lintEyebrow) lintEyebrow.textContent = '本機提示詞檢查器';
    const lintInput = document.querySelector('#lintInput');
    if (lintInput) lintInput.placeholder = '在這裡貼上英文提示詞…';
    const search = document.querySelector('#searchInput');
    if (search) search.placeholder = '搜尋主題、分類或提示詞…';
    const footerLinks = document.querySelectorAll('.footer-links a');
    if (footerLinks[0]) footerLinks[0].textContent = '專案說明';
    if (footerLinks[1]) footerLinks[1].textContent = '參與貢獻';
    if (footerLinks[2]) footerLinks[2].textContent = 'MIT 授權';
  } else {
    const brand = document.querySelector('.brand strong');
    const sub = document.querySelector('.brand small');
    if (brand) brand.textContent = 'Gemini Notebook Prompt Lab';
    if (sub) sub.textContent = 'formerly NotebookLM';
    Object.entries(EN_TAB_TEXT).forEach(([key, text]) => {
      const el = document.querySelector(`[data-i18n="${key}"]`);
      if (el) el.textContent = text;
    });
    const chainEyebrow = document.querySelector('#panel-chain .eyebrow');
    if (chainEyebrow) chainEyebrow.textContent = 'Multi-step Workflow';
    const lintEyebrow = document.querySelector('#panel-lint .eyebrow');
    if (lintEyebrow) lintEyebrow.textContent = 'Local Prompt Linter';
    const lintInput = document.querySelector('#lintInput');
    if (lintInput) lintInput.placeholder = 'Paste an English prompt here…';
    const footerLinks = document.querySelectorAll('.footer-links a');
    if (footerLinks[0]) footerLinks[0].textContent = 'README';
    if (footerLinks[1]) footerLinks[1].textContent = 'Contributing';
    if (footerLinks[2]) footerLinks[2].textContent = 'MIT';
  }
  localizeDifficulty();
  renderRolePreset();
  markAdvancedTabs();
  ensureAdvancedNotes();
  ensureFeedbackLink();
  updateThemeButton();
  updateUiModeButton();
}

function addHelpfulTitles() {
  const titles = isZh() ? {
    '#tab-library': '瀏覽、搜尋、收藏與複製現成提示詞',
    '#tab-lab': '依工作流、受眾與主題組合新的英文提示詞',
    '#tab-chain': '進階：把多個提示詞串成「萃取 → 產出 → 檢查」流程',
    '#tab-lint': '進階：檢查自訂提示詞是否包含來源限定、受眾、格式與防杜撰規則'
  } : {
    '#tab-library': 'Browse, search, favorite, and copy curated prompts',
    '#tab-lab': 'Compose a new prompt from workflow, audience, and topic',
    '#tab-chain': 'Advanced: connect prompts into an extract → create → verify flow',
    '#tab-lint': 'Advanced: check grounding, audience, format, constraints, and anti-hallucination rules'
  };
  Object.entries(titles).forEach(([selector, title]) => {
    const el = document.querySelector(selector);
    if (el) el.title = title;
  });
}

let scheduled = false;
function schedulePatch() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    scheduled = false;
    ensureThemeToggle();
    ensureFeedbackLink();
    ensureUiModeToggle();
    ensureRolePreset();
    patchStaticLabels();
    addHelpfulTitles();
  });
}

const previousThemeVersion = localStorage.getItem('gnpl.themeVersion');
const storedTheme = localStorage.getItem('gnpl.theme');
if (previousThemeVersion !== THEME_MIGRATION_VERSION) {
  applyTheme('light');
} else {
  applyTheme(storedTheme === 'dark' ? 'dark' : 'light');
}

document.documentElement.dataset.uiMode = localStorage.getItem(UI_MODE_KEY) || 'simple';

window.addEventListener('DOMContentLoaded', () => {
  schedulePatch();
  setTimeout(schedulePatch, 150);
  setTimeout(schedulePatch, 700);
});

document.addEventListener('click', event => {
  if (event.target.closest('#langBtn')) setTimeout(schedulePatch, 0);
});

// Watch only the language attribute. Watching every child-list mutation here
// created a self-sustaining DOM patch loop that could peg the CPU and make
// native <select> menus appear frozen or impossible to dismiss.
const observer = new MutationObserver(() => schedulePatch());
observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
