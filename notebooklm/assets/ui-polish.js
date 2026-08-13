const ZH_TEXT = {
  install: '安裝 App',
  eyebrow: '來源限定 · 分齡適配 · 可分享 · 隱私優先',
  heroTitle: '把「找提示詞」變成一套可重複的 Gemini Notebook 工作流。',
  heroBody: '從 90 組分齡簡報提示詞出發，再加上多格式工作流、流程串接、品質檢查與一鍵開啟 Gemini Notebook。所有資料都在瀏覽器本機執行。',
  browsePrompts: '瀏覽提示詞',
  buildPrompt: '建立提示詞',
  statPrompts: '分齡提示詞',
  privacyNote: '不需登入、不上傳你的提示詞、不使用追蹤器。',
  quickTitle: '複製 → 開啟 → 生成',
  step2Title: '複製提示詞',
  step2Body: '使用既有模板，或在提示詞工作室依任務快速組合。',
  tabLibrary: '📚 提示詞庫',
  tabLab: '🧪 提示詞工作室',
  tabChain: '🔗 流程串接',
  tabLint: '✅ 品質檢查',
  emptyTitle: '找不到符合條件的提示詞',
  composerEyebrow: '提示詞組合器',
  generatePrompt: '產生提示詞',
  addToChain: '加入流程',
  preview: '預覽',
  generatedPrompt: '產生的英文 Prompt',
  chainTitle: '把多個提示詞串成可重複流程',
  chainBody: '適合「先萃取 → 再產出 → 最後檢查」這類任務。所有步驟都可以編輯與重新排序。',
  loadExample: '載入範例流程',
  copyChain: '複製整個流程',
  chainEmptyTitle: '流程還是空的',
  chainEmptyBody: '從提示詞庫或提示詞工作室加入提示詞，或載入範例流程。',
  lintTitle: '在送進 Gemini Notebook 前先做品質檢查',
  lintBody: '這不是 AI 評審，而是一套透明的本機規則：來源限定、受眾、任務、輸出格式、約束與防杜撰。',
  useSelected: '使用目前選取的提示詞',
  qualityScore: '提示詞品質分數',
  lintIdle: '貼上英文 Prompt 後執行檢查。',
  whyEyebrow: '為什麼做這個工具？',
  whyTitle: '不是「提示詞越多越好」，而是要能被使用、修改、驗證與共同維護。',
  f1Body: '同一主題可以直接比較三種年齡層的提示詞差異。',
  f2Title: '來源限定',
  f2Body: '提示詞明確要求只使用來源，降低內容被風格指令帶偏。',
  f3Body: '簡報、音訊、影片、測驗、報告等任務都能用同一套組合器完成。',
  f4Title: '隱私優先',
  f4Body: '收藏、自訂內容與流程都存在瀏覽器本機；沒有帳號與伺服器。',
  footerOrigin: '起源於分齡佛堂教學需求，後來整理成任何教育與知識工作者都能自行改作的開源工具。',
  results: '個提示詞',
  imported: '已匯入提示詞',
  export: '匯出',
  import: '匯入',
  favorites: '☆ 收藏',
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

const isZh = () => document.documentElement.lang.toLowerCase().startsWith('zh');

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('gnpl.theme', theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = theme === 'dark' ? '#111827' : '#f4f6fb';
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

function ensureRolePreset() {
  const input = document.querySelector('#roleInput');
  if (!input || document.querySelector('#rolePreset')) return;
  const select = document.createElement('select');
  select.id = 'rolePreset';
  select.setAttribute('aria-label', 'Role preset');
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
    if (lintInput) lintInput.placeholder = '在這裡貼上英文 Prompt…';
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
  updateThemeButton();
}

function addHelpfulTitles() {
  const titles = isZh() ? {
    '#tab-library': '瀏覽、搜尋、收藏與複製現成提示詞',
    '#tab-lab': '依工作流、受眾與主題組合新的英文 Prompt',
    '#tab-chain': '把多個 Prompt 依序串成「萃取 → 產出 → 檢查」流程',
    '#tab-lint': '檢查 Prompt 是否包含來源限定、受眾、格式與防杜撰規則'
  } : {
    '#tab-library': 'Browse, search, favorite, and copy curated prompts',
    '#tab-lab': 'Compose a new prompt from workflow, audience, and topic',
    '#tab-chain': 'Connect multiple prompts into an extract → create → verify flow',
    '#tab-lint': 'Check grounding, audience, format, constraints, and anti-hallucination rules'
  };
  Object.entries(titles).forEach(([selector, title]) => {
    const el = document.querySelector(selector);
    if (el) title ? el.title = title : el.removeAttribute('title');
  });
}

let scheduled = false;
function schedulePatch() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    scheduled = false;
    ensureThemeToggle();
    ensureRolePreset();
    patchStaticLabels();
    addHelpfulTitles();
  });
}

const storedTheme = localStorage.getItem('gnpl.theme') || 'light';
applyTheme(storedTheme === 'dark' ? 'dark' : 'light');

window.addEventListener('DOMContentLoaded', () => {
  schedulePatch();
  setTimeout(schedulePatch, 150);
  setTimeout(schedulePatch, 700);
});

document.addEventListener('click', event => {
  if (event.target.closest('#langBtn')) setTimeout(schedulePatch, 0);
});

const observer = new MutationObserver(() => schedulePatch());
observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
observer.observe(document.body, { childList: true, subtree: true });
