const NOTEBOOK_URL = 'https://notebook.google.com/';
const REPO_URL = 'https://github.com/dennis23100/toolkit_60/tree/main/notebooklm';
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const i18n = {
  'zh-TW': {
    install: '安裝 App', openNotebook: '📓 開啟 Gemini Notebook ↗', eyebrow: '來源導向 · 分齡 · 可分享 · 隱私優先',
    heroTitle: '把「找 Prompt」變成一套可重複的 Gemini Notebook 工作流。',
    heroBody: '從 90 組分齡簡報 Prompt 出發，再加上多格式工作流、Prompt Chain、品質檢查與一鍵開啟 Gemini Notebook。所有資料都在瀏覽器本機執行。',
    browsePrompts: '瀏覽 Prompt', buildPrompt: '建立 Prompt', statPrompts: '分齡 Prompt', statThemes: '視覺主題', statAges: '年齡層', statWorkflows: '工作流', privacyNote: '不需登入、不上傳你的 Prompt、不使用追蹤器。',
    quickEyebrow: '30 秒上手', quickTitle: 'Copy → Open → Generate', step1Title: '選受眾', step1Body: '幼兒、青年或壯年，讓語氣、閱讀密度與視覺節奏跟著調整。', step2Title: '複製 Prompt', step2Body: '使用既有模板，或在 Prompt Lab 依任務快速組合。', step3Title: '開新分頁', step3Body: '按一下直接開啟 Gemini Notebook，不會覆蓋目前頁面。',
    tabLibrary: 'Prompt Library', tabLab: 'Prompt Lab', tabChain: 'Chain Builder', tabLint: 'Quality Check', search: '搜尋', favorites: '☆ 收藏', export: '匯出', import: '匯入', age: '年齡', category: '分類', clearFilters: '清除篩選', emptyTitle: '找不到符合條件的 Prompt', emptyBody: '換一個關鍵字，或清除篩選條件。',
    composerEyebrow: 'Prompt Composer', composerTitle: '用任務組合，而不是從空白開始', workflow: '工作流', audience: '受眾', focus: '聚焦主題', visualTheme: '視覺主題', difficulty: '深度 / 難度', role: '角色', extra: '額外要求', strictGrounding: '嚴格來源限定：來源沒有寫，就不要補。', generatePrompt: '產生 Prompt', addToChain: '加入 Chain', preview: 'Preview', generatedPrompt: '產生的 Prompt', copy: '複製', copyOpen: '複製並開啟 Gemini Notebook ↗', checkQuality: '檢查品質',
    chainTitle: '把多個 Prompt 串成可重複流程', chainBody: '適合「先萃取 → 再產出 → 最後檢查」這類任務。所有步驟都可以編輯與重新排序。', loadExample: '載入範例 Chain', copyChain: '複製整個 Chain', clear: '清空', chainEmptyTitle: 'Chain 還是空的', chainEmptyBody: '從 Library 或 Prompt Lab 加入 Prompt，或載入範例流程。',
    lintTitle: '在送進 Gemini Notebook 前先做品質檢查', lintBody: '這不是 AI 評審，而是一套透明的本機規則：來源限定、受眾、任務、輸出格式、約束與防杜撰。', runCheck: '執行檢查', useSelected: '使用目前選取 Prompt', qualityScore: 'Prompt Quality Score', lintIdle: '貼上 Prompt 後執行檢查。',
    whyEyebrow: 'Why this repo?', whyTitle: '不是「Prompt 越多越好」，而是要能被使用、修改、驗證與貢獻。', f1Title: '分齡對照', f1Body: '同一主題可以直接比較三種年齡層的表達差異。', f2Title: 'Source-grounded', f2Body: 'Prompt 明確要求只使用來源，降低內容被風格指令帶偏。', f3Title: '可組合工作流', f3Body: 'Slide、Audio、Video、Quiz、Report 等任務用同一套 Composer 組合。', f4Title: 'Privacy-first', f4Body: '收藏、自訂與 Chain 儲存在 localStorage；沒有帳號與伺服器。',
    footerOrigin: '起源於分齡佛堂教學需求，設計成可被任何教育與知識工作者 fork 的開源工具。', share: '分享', copyOpenShort: '複製並開啟 ↗', sources: '來源與授權', all: '全部', view: '查看', copied: '已複製', opened: '已複製，正在開啟 Gemini Notebook', favoriteAdded: '已加入收藏', favoriteRemoved: '已取消收藏', shared: '分享連結已複製', imported: '已匯入 Prompt', importError: '匯入失敗：JSON 格式不符合需求', exported: '已匯出目前篩選結果', addedChain: '已加入 Chain', chainCopied: 'Chain 已複製', chainLoaded: '範例 Chain 已載入', noFocus: '請先輸入聚焦主題', results: '個 Prompt', custom: '自訂', compare: '比較年齡版本'
  },
  en: {
    install: 'Install App', openNotebook: '📓 Open Gemini Notebook ↗', eyebrow: 'Source-grounded · Age-adaptive · Shareable · Privacy-first',
    heroTitle: 'Turn “find a prompt” into a repeatable Gemini Notebook workflow.',
    heroBody: 'Start with 90 age-adaptive slide prompts, then compose multi-format workflows, prompt chains, local quality checks, and open Gemini Notebook in one click. Everything runs locally in your browser.',
    browsePrompts: 'Browse prompts', buildPrompt: 'Build a prompt', statPrompts: 'age prompts', statThemes: 'visual themes', statAges: 'audiences', statWorkflows: 'workflows', privacyNote: 'No sign-in, no prompt uploads, no trackers.',
    quickEyebrow: '30-second start', quickTitle: 'Copy → Open → Generate', step1Title: 'Pick an audience', step1Body: 'Children, youth, or adults — adjust tone, density, and visual pacing.', step2Title: 'Copy a prompt', step2Body: 'Use a curated template or compose one in Prompt Lab.', step3Title: 'Open a new tab', step3Body: 'Jump to Gemini Notebook without replacing this page.',
    tabLibrary: 'Prompt Library', tabLab: 'Prompt Lab', tabChain: 'Chain Builder', tabLint: 'Quality Check', search: 'Search', favorites: '☆ Favorites', export: 'Export', import: 'Import', age: 'Age', category: 'Category', clearFilters: 'Clear filters', emptyTitle: 'No matching prompts', emptyBody: 'Try another keyword or clear your filters.',
    composerEyebrow: 'Prompt Composer', composerTitle: 'Compose from a task instead of a blank page', workflow: 'Workflow', audience: 'Audience', focus: 'Focus topic', visualTheme: 'Visual theme', difficulty: 'Depth / difficulty', role: 'Role', extra: 'Extra instructions', strictGrounding: 'Strict source grounding: do not fill gaps with outside knowledge.', generatePrompt: 'Generate prompt', addToChain: 'Add to chain', preview: 'Preview', generatedPrompt: 'Generated prompt', copy: 'Copy', copyOpen: 'Copy & open Gemini Notebook ↗', checkQuality: 'Check quality',
    chainTitle: 'Turn prompts into a repeatable multi-step workflow', chainBody: 'Great for extract → create → verify flows. Every step is editable and reorderable.', loadExample: 'Load example chain', copyChain: 'Copy full chain', clear: 'Clear', chainEmptyTitle: 'Your chain is empty', chainEmptyBody: 'Add a prompt from Library or Prompt Lab, or load the example flow.',
    lintTitle: 'Check prompt quality before sending it to Gemini Notebook', lintBody: 'This is not an AI judge. It is a transparent local rubric for source grounding, audience, task, format, constraints, and anti-hallucination language.', runCheck: 'Run check', useSelected: 'Use selected prompt', qualityScore: 'Prompt Quality Score', lintIdle: 'Paste a prompt and run the check.',
    whyEyebrow: 'Why this repo?', whyTitle: 'A useful prompt project needs more than a large count — it should be usable, editable, testable, and contributable.', f1Title: 'Age comparison', f1Body: 'Compare three audience adaptations of the same theme side by side.', f2Title: 'Source-grounded', f2Body: 'Prompts explicitly keep content inside the selected sources.', f3Title: 'Composable workflows', f3Body: 'Slides, audio, video, quizzes, reports and more share one composer.', f4Title: 'Privacy-first', f4Body: 'Favorites, custom prompts, and chains stay in localStorage. No server required.',
    footerOrigin: 'Originated from age-adaptive temple teaching needs, then redesigned as an open tool any educator or knowledge worker can fork.', share: 'Share', copyOpenShort: 'Copy & open ↗', sources: 'Sources & licensing', all: 'All', view: 'View', copied: 'Copied', opened: 'Copied — opening Gemini Notebook', favoriteAdded: 'Added to favorites', favoriteRemoved: 'Removed from favorites', shared: 'Share link copied', imported: 'Prompt imported', importError: 'Import failed: incompatible JSON format', exported: 'Current results exported', addedChain: 'Added to chain', chainCopied: 'Chain copied', chainLoaded: 'Example chain loaded', noFocus: 'Add a focus topic first', results: 'prompts', custom: 'Custom', compare: 'Compare age variants'
  }
};

const state = {
  lang: localStorage.getItem('gnpl.lang') || 'zh-TW',
  age: 'all', category: 'all', search: '', favoritesOnly: false,
  favorites: new Set(JSON.parse(localStorage.getItem('gnpl.favorites') || '[]')),
  prompts: [], workflows: [], customPrompts: JSON.parse(localStorage.getItem('gnpl.customPrompts') || '[]'),
  chain: JSON.parse(localStorage.getItem('gnpl.chain') || '[]'), selectedPromptId: null,
  deferredInstallPrompt: null
};

function t(key) { return i18n[state.lang]?.[key] ?? i18n.en[key] ?? key; }
function localized(obj) { return typeof obj === 'string' ? obj : (obj?.[state.lang] ?? obj?.en ?? obj?.['zh-TW'] ?? ''); }
function escapeHtml(str = '') { return String(str).replace(/[&<>'\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','\"':'&quot;'}[c])); }
function safeHttpUrl(value) {
  try { const url = new URL(String(value)); return ['http:', 'https:'].includes(url.protocol) ? url.href : null; }
  catch { return null; }
}
function saveFavorites() { localStorage.setItem('gnpl.favorites', JSON.stringify([...state.favorites])); }
function saveChain() { localStorage.setItem('gnpl.chain', JSON.stringify(state.chain)); }
function saveCustomPrompts() { localStorage.setItem('gnpl.customPrompts', JSON.stringify(state.customPrompts)); }
function toast(msg) { const el = $('#toast'); el.textContent = msg; el.classList.add('show'); clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove('show'), 1800); }

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); }
  catch { const ta = document.createElement('textarea'); ta.value = text; ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); }
}

function openNotebook() { window.open(NOTEBOOK_URL, '_blank', 'noopener,noreferrer'); }
async function copyAndOpen(text) { await copyText(text); toast(t('opened')); openNotebook(); }

function updateI18n() {
  document.documentElement.lang = state.lang === 'zh-TW' ? 'zh-Hant' : 'en';
  $$('[data-i18n]').forEach(el => { const key = el.dataset.i18n; if (t(key)) el.textContent = t(key); });
  $('#langBtn').textContent = state.lang === 'zh-TW' ? 'EN' : '中';
  $('#searchInput').placeholder = state.lang === 'zh-TW' ? '搜尋主題、分類或 Prompt…' : 'Search theme, category, or prompt…';
  $('#focusInput').placeholder = state.lang === 'zh-TW' ? '例如：孝道在現代家庭中的實踐' : 'e.g. practicing filial care in modern families';
  $('#extraInput').placeholder = state.lang === 'zh-TW' ? '例如：每頁最多 45 字；最後加 3 個反思問題' : 'e.g. max 45 words per slide; end with 3 reflection questions';
}

function applyLanguage() {
  localStorage.setItem('gnpl.lang', state.lang);
  updateI18n(); renderFilters(); renderLibrary(); renderWorkflowOptions(); renderThemeOptions(); renderChain();
  if (state.selectedPromptId) openPrompt(state.selectedPromptId, false);
}

function allPrompts() { return [...state.prompts, ...state.customPrompts]; }
function filteredPrompts() {
  const q = state.search.trim().toLocaleLowerCase();
  return allPrompts().filter(p => {
    if (state.age !== 'all' && p.ageGroup !== state.age) return false;
    const cat = localized(p.category);
    if (state.category !== 'all' && cat !== state.category) return false;
    if (state.favoritesOnly && !state.favorites.has(p.id)) return false;
    if (!q) return true;
    const hay = [localized(p.title), localized(p.summary), localized(p.category), p.prompt, p.themeId, p.ageGroup].join(' ').toLocaleLowerCase();
    return hay.includes(q);
  });
}

function scorePrompt(text, ageGroup = null) {
  const s = String(text || '');
  const lower = s.toLowerCase();
  const checks = [
    {id:'grounding', max:20, ok:/(selected|uploaded|provided|source material|sources?)/i.test(s) && /(only|ground|based on|from)/i.test(s), zh:'來源限定', en:'Source grounding', tipZh:'明確寫出「只使用已選來源／上傳來源」。', tipEn:'Explicitly say to use only the selected/uploaded sources.'},
    {id:'antiHallucination', max:20, ok:/(do not invent|don['’]t invent|unsupported|outside knowledge|do not add|avoid adding|if the sources do not|leave.*blank)/i.test(s), zh:'防杜撰', en:'Anti-hallucination', tipZh:'加入「來源沒有就說不知道／不要補外部知識」。', tipEn:'Add an explicit rule for missing or unsupported information.'},
    {id:'audience', max:15, ok:/(audience|learners?|aged?|ages?|children|youth|adults?|beginner|advanced|for \{\{|for [a-z0-9])/i.test(s), zh:'受眾', en:'Audience', tipZh:'指定讀者年齡、程度或角色。', tipEn:'Specify the audience, age, level, or role.'},
    {id:'objective', max:15, ok:/(create|generate|transform|write|build|explain|summari[sz]e|answer|turn)/i.test(s), zh:'任務動詞', en:'Task objective', tipZh:'用明確動詞說明要產出什麼。', tipEn:'Use a clear action verb describing the desired output.'},
    {id:'format', max:12, ok:/(slide|deck|audio|video|infographic|quiz|flashcard|report|table|chat|map|section|step|question|row|column)/i.test(s), zh:'輸出格式', en:'Output format', tipZh:'寫清楚輸出形式與結構。', tipEn:'Name the output format or structure.'},
    {id:'constraints', max:10, ok:/(avoid|must|keep|limit|one |each |concise|short|clear|exact|preserve|do not)/i.test(s), zh:'約束條件', en:'Constraints', tipZh:'加入長度、結構、禁止事項或精準度要求。', tipEn:'Add length, structure, precision, or exclusion constraints.'},
    {id:'specificity', max:8, ok:s.trim().length >= 180 && /[:\n]/.test(s), zh:'具體程度', en:'Specificity', tipZh:'Prompt 太短時容易產生不穩定輸出；補上結構與重點。', tipEn:'Very short prompts are less repeatable; add structure and focus.'}
  ];
  if (ageGroup === 'children') {
    checks.push({id:'childSafety', max:5, ok:/(safe|friendly|gentle|age-appropriate|age appropriate|avoid.*scary|emotionally safe)/i.test(s), zh:'兒少友善', en:'Child-safe framing', tipZh:'兒少版本建議加入情緒安全、易讀與避免驚嚇內容。', tipEn:'For children, add age-appropriate, readable, emotionally safe framing.'});
  }
  const totalMax = checks.reduce((a,c)=>a+c.max,0);
  let raw = checks.reduce((a,c)=>a+(c.ok?c.max:0),0);
  const score = Math.round(raw / totalMax * 100);
  return {score, checks};
}

function renderFilters() {
  const ages = [
    {id:'all', label:t('all')},
    {id:'children', label: state.lang==='zh-TW'?'幼兒':'Children'},
    {id:'youth', label: state.lang==='zh-TW'?'青年':'Youth'},
    {id:'adult', label: state.lang==='zh-TW'?'壯年':'Adults'}
  ];
  $('#ageFilters').innerHTML = ages.map(a => `<button class="chip ${state.age===a.id?'active':''}" type="button" data-age="${a.id}">${escapeHtml(a.label)}</button>`).join('');
  const categories = [...new Set(allPrompts().map(p => localized(p.category)).filter(Boolean))].sort((a,b)=>a.localeCompare(b, state.lang==='zh-TW'?'zh-Hant':'en'));
  $('#categoryFilters').innerHTML = [{id:'all',label:t('all')}, ...categories.map(c=>({id:c,label:c}))].map(c => `<button class="chip ${state.category===c.id?'active':''}" type="button" data-category="${escapeHtml(c.id)}">${escapeHtml(c.label)}</button>`).join('');
}

function renderLibrary() {
  const items = filteredPrompts();
  $('#resultCount').textContent = `${items.length} ${t('results')}`;
  $('#emptyState').classList.toggle('hidden', items.length > 0);
  const grid = $('#promptGrid');
  grid.innerHTML = items.map(p => {
    const lint = scorePrompt(p.prompt, p.ageGroup);
    const fav = state.favorites.has(p.id);
    return `<article class="prompt-card" data-id="${escapeHtml(p.id)}">
      <div class="card-top"><div class="badges"><span class="badge age">${escapeHtml(localized(p.ageLabel) || p.ageGroup)}</span><span class="badge">${escapeHtml(localized(p.category))}</span><span class="badge score-good">${lint.score}/100</span>${p.custom?`<span class="badge">${t('custom')}</span>`:''}</div><button class="favorite-button ${fav?'active':''}" type="button" data-favorite="${escapeHtml(p.id)}" aria-label="Favorite">${fav?'★':'☆'}</button></div>
      <h3>${escapeHtml(localized(p.title))}</h3><p>${escapeHtml(localized(p.summary))}</p>
      <div class="card-actions"><button class="button ghost compact" type="button" data-view="${escapeHtml(p.id)}">${t('view')}</button><button class="button primary compact" type="button" data-copy="${escapeHtml(p.id)}">${t('copy')}</button></div>
    </article>`;
  }).join('');
}

function toggleFavorite(id) {
  if (state.favorites.has(id)) { state.favorites.delete(id); toast(t('favoriteRemoved')); }
  else { state.favorites.add(id); toast(t('favoriteAdded')); }
  saveFavorites(); renderLibrary();
  if (state.selectedPromptId === id) $('#favoriteDialogBtn').textContent = state.favorites.has(id) ? '★' : '☆';
}

function getPrompt(id) { return allPrompts().find(p => p.id === id); }

function openPrompt(id, show = true) {
  const p = getPrompt(id); if (!p) return;
  state.selectedPromptId = id;
  $('#dialogTitle').textContent = localized(p.title);
  $('#dialogSummary').textContent = localized(p.summary);
  $('#dialogPrompt').value = p.prompt;
  const lint = scorePrompt(p.prompt, p.ageGroup);
  $('#dialogBadges').innerHTML = `<span class="badge age">${escapeHtml(localized(p.ageLabel) || p.ageGroup)}</span><span class="badge">${escapeHtml(localized(p.category))}</span><span class="badge score-good">${lint.score}/100</span>`;
  $('#favoriteDialogBtn').textContent = state.favorites.has(id) ? '★' : '☆';
  const variants = allPrompts().filter(x => x.themeId === p.themeId).sort((a,b)=>['children','youth','adult'].indexOf(a.ageGroup)-['children','youth','adult'].indexOf(b.ageGroup));
  $('#compareBar').innerHTML = `<span class="filter-label">${t('compare')}</span>` + variants.map(v => `<button class="chip ${v.id===p.id?'active':''}" type="button" data-variant="${escapeHtml(v.id)}">${escapeHtml(localized(v.ageLabel)||v.ageGroup)}</button>`).join('');
  const sources = (p.sources || []).map(safeHttpUrl).filter(Boolean).map(u => `<li><a href="${escapeHtml(u)}" target="_blank" rel="noopener noreferrer">${escapeHtml(u)}</a></li>`).join('');
  $('#dialogSources').innerHTML = `${p.sourceName?`<p>${escapeHtml(p.sourceName)}</p>`:''}<ul>${sources}</ul><p>${escapeHtml(p.licenseNote || '')}</p>`;
  const url = new URL(location.href); url.searchParams.set('prompt', id); history.replaceState({}, '', url);
  if (show && !$('#promptDialog').open) $('#promptDialog').showModal();
}

function closePromptUrl() { const url = new URL(location.href); url.searchParams.delete('prompt'); history.replaceState({}, '', url); }

function renderWorkflowOptions() {
  $('#workflowSelect').innerHTML = state.workflows.map(w => `<option value="${w.id}">${w.icon} ${escapeHtml(localized(w.name))}</option>`).join('');
  $('#audienceSelect').innerHTML = [
    ['children', state.lang==='zh-TW'?'幼兒（15歲以下）':'Children (15 and below)'],
    ['youth', state.lang==='zh-TW'?'青年（16–35歲）':'Youth (16–35)'],
    ['adult', state.lang==='zh-TW'?'壯年（35歲以上）':'Adults (35 and above)']
  ].map(([v,l])=>`<option value="${v}">${l}</option>`).join('');
}

function uniqueThemes() {
  const map = new Map();
  state.prompts.filter(p=>p.ageGroup==='children').forEach(p=>map.set(p.themeId,p));
  return [...map.values()].sort((a,b)=>a.order-b.order);
}
function renderThemeOptions() { $('#themeSelect').innerHTML = uniqueThemes().map(p=>`<option value="${p.themeId}">${escapeHtml(localized(p.title))}</option>`).join(''); }

function composePrompt() {
  const workflowId = $('#workflowSelect').value;
  const audience = $('#audienceSelect').value;
  const focus = $('#focusInput').value.trim();
  if (!focus) { toast(t('noFocus')); return ''; }
  const extra = $('#extraInput').value.trim();
  const difficulty = $('#difficultySelect').value;
  const role = $('#roleInput').value.trim() || 'source-grounded tutor';
  const strict = $('#strictGrounding').checked;
  let body = '';
  if (workflowId === 'slide-deck') {
    const themeId = $('#themeSelect').value;
    const base = state.prompts.find(p=>p.ageGroup===audience && p.themeId===themeId);
    body = base?.prompt || '';
    body = `Primary focus for this generation: ${focus}.\n\n${body}`;
  } else {
    const wf = state.workflows.find(w=>w.id===workflowId);
    const audienceLabel = audience==='children'?'learners aged 15 and below':audience==='youth'?'ages 16 to 35':'ages 35 and above';
    body = (wf?.starter || '')
      .replaceAll('{{audience}}', audienceLabel)
      .replaceAll('{{focus}}', focus)
      .replaceAll('{{difficulty}}', difficulty)
      .replaceAll('{{role}}', role);
  }
  if (strict && !/do not invent|outside knowledge|unsupported/i.test(body)) body += '\n\nStrict grounding rule: Use only the selected sources. Do not add outside facts or invent examples. If the sources do not support a claim, say so explicitly.';
  if (extra) body += `\n\nAdditional requirements:\n${extra}`;
  $('#labOutput').value = body;
  const lint = scorePrompt(body, audience); $('#labScore').textContent = lint.score; renderMiniLint(lint);
  return body;
}

function renderMiniLint(lint) {
  const missing = lint.checks.filter(c=>!c.ok).slice(0,3);
  $('#labLintMini').innerHTML = missing.length ? missing.map(c=>`<div>• ${escapeHtml(state.lang==='zh-TW'?c.tipZh:c.tipEn)}</div>`).join('') : `<div>✓ ${state.lang==='zh-TW'?'核心規則完整，可以直接使用。':'Core rules look complete and ready to use.'}</div>`;
}

function addToChain(text, title='Prompt') {
  if (!text?.trim()) return;
  state.chain.push({id: crypto.randomUUID(), title, prompt:text.trim()}); saveChain(); renderChain(); toast(t('addedChain'));
}

function renderChain() {
  const list = $('#chainList'), empty = $('#chainEmpty');
  empty.classList.toggle('hidden', state.chain.length>0);
  list.innerHTML = state.chain.map((step, i)=>`<article class="chain-item" data-chain-id="${escapeHtml(step.id)}"><div class="chain-number">${String(i+1).padStart(2,'0')}</div><div><input class="chain-title" value="${escapeHtml(step.title||`Step ${i+1}`)}" aria-label="Step title" /><textarea class="chain-text" aria-label="Step prompt">${escapeHtml(step.prompt)}</textarea></div><div class="chain-controls"><button type="button" data-move-up="${escapeHtml(step.id)}" aria-label="Move up">↑</button><button type="button" data-move-down="${escapeHtml(step.id)}" aria-label="Move down">↓</button><button type="button" data-remove-chain="${escapeHtml(step.id)}" aria-label="Remove">×</button></div></article>`).join('');
}

function syncChainEdits() {
  $$('.chain-item').forEach(el=>{ const item=state.chain.find(x=>x.id===el.dataset.chainId); if(item){item.title=$('.chain-title',el).value; item.prompt=$('.chain-text',el).value;} }); saveChain();
}
function chainText() { syncChainEdits(); return state.chain.map((s,i)=>`STEP ${i+1} — ${s.title}\n${s.prompt}`).join('\n\n---\n\n'); }
function loadDefaultChain() {
  const audience = state.lang==='zh-TW'?'學習者':'learners';
  state.chain = [
    {id:crypto.randomUUID(), title: state.lang==='zh-TW'?'萃取核心概念':'Extract core concepts', prompt:`Use only the selected sources. Identify the 5–7 most important ideas for ${audience}. For each idea, provide a short explanation and the source evidence that supports it. Do not add outside knowledge.`},
    {id:crypto.randomUUID(), title: state.lang==='zh-TW'?'轉成教學產出':'Turn into a teaching artifact', prompt:'Using only the source-grounded key ideas from the previous step, create a clear teaching artifact with one main idea per section. Preserve important terminology and explain difficult concepts in accessible language.'},
    {id:crypto.randomUUID(), title: state.lang==='zh-TW'?'檢查忠實度':'Verify fidelity', prompt:'Audit the previous output against the selected sources. List any claim, example, number, quote, or interpretation that is not directly supported. Then propose a corrected version using only source-supported material.'}
  ]; saveChain(); renderChain(); toast(t('chainLoaded'));
}

function renderLint(lint) {
  $('#lintScore').textContent = lint.score;
  $('#lintSummary').textContent = lint.score>=85 ? (state.lang==='zh-TW'?'結構完整，適合直接使用。':'Strong structure and ready to use.') : lint.score>=65 ? (state.lang==='zh-TW'?'基本可用，但還有幾個可提升的地方。':'Usable, with a few important improvements available.') : (state.lang==='zh-TW'?'建議先補齊核心規則再使用。':'Add the missing core rules before using it.');
  $('#lintResults').innerHTML = lint.checks.map(c=>`<div class="lint-row ${c.ok?'pass':'warn'}"><div class="status">${c.ok?'✓':'!'}</div><div><strong>${escapeHtml(state.lang==='zh-TW'?c.zh:c.en)}</strong><small>${escapeHtml(c.ok?(state.lang==='zh-TW'?'已偵測到相關規則。':'Relevant rule detected.'):(state.lang==='zh-TW'?c.tipZh:c.tipEn))}</small></div><div class="points">${c.ok?c.max:0}/${c.max}</div></div>`).join('');
}

function switchTab(id) {
  $$('.tab').forEach(btn=>{ const active=btn.dataset.tab===id; btn.classList.toggle('active',active); btn.setAttribute('aria-selected',String(active)); });
  $$('.tab-panel').forEach(panel=>{ const active=panel.id===`panel-${id}`; panel.classList.toggle('active',active); panel.hidden=!active; });
  document.querySelector('.workspace').scrollIntoView({behavior:'smooth',block:'start'});
}

function exportResults() {
  const data = {schemaVersion:'1.0.0', exportedAt:new Date().toISOString(), prompts:filteredPrompts()};
  const blob = new Blob([JSON.stringify(data,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='gemini-notebook-prompts-export.json'; a.click(); URL.revokeObjectURL(a.href); toast(t('exported'));
}

async function importFile(file) {
  try {
    const data=JSON.parse(await file.text()); const incoming = Array.isArray(data)?data:(data.prompts||[]); if(!incoming.length) throw new Error('no prompts');
    const normalized=incoming.filter(p=>p.prompt && (p.title||p.name)).map((p,i)=>({
      id:p.id||`custom-${Date.now()}-${i}`, themeId:p.themeId||`custom-${i}`, ageGroup:p.ageGroup||'youth', ageLabel:p.ageLabel||{'zh-TW':'自訂','en':'Custom'}, title:typeof p.title==='string'?{'zh-TW':p.title,'en':p.title}:p.title, summary:typeof p.summary==='string'?{'zh-TW':p.summary,'en':p.summary}:(p.summary||{'zh-TW':'自訂 Prompt','en':'Custom prompt'}), category:typeof p.category==='string'?{'zh-TW':p.category,'en':p.category}:(p.category||{'zh-TW':'自訂','en':'Custom'}), prompt:p.prompt, sources:p.sources||[], custom:true
    }));
    state.customPrompts=[...state.customPrompts,...normalized]; saveCustomPrompts(); renderFilters(); renderLibrary(); toast(`${t('imported')} × ${normalized.length}`);
  } catch(e){ console.error(e); toast(t('importError')); }
}

function bindEvents() {
  $('#langBtn').addEventListener('click',()=>{state.lang=state.lang==='zh-TW'?'en':'zh-TW';applyLanguage();});
  $$('.tab').forEach(b=>b.addEventListener('click',()=>switchTab(b.dataset.tab)));
  $$('[data-tab-target]').forEach(b=>b.addEventListener('click',()=>switchTab(b.dataset.tabTarget)));
  $('#searchInput').addEventListener('input',e=>{state.search=e.target.value;renderLibrary();});
  $('#ageFilters').addEventListener('click',e=>{const b=e.target.closest('[data-age]');if(!b)return;state.age=b.dataset.age;renderFilters();renderLibrary();});
  $('#categoryFilters').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;state.category=b.dataset.category;renderFilters();renderLibrary();});
  $('#favoritesOnlyBtn').addEventListener('click',()=>{state.favoritesOnly=!state.favoritesOnly;$('#favoritesOnlyBtn').setAttribute('aria-pressed',String(state.favoritesOnly));renderLibrary();});
  $('#clearFiltersBtn').addEventListener('click',()=>{state.age='all';state.category='all';state.search='';state.favoritesOnly=false;$('#searchInput').value='';$('#favoritesOnlyBtn').setAttribute('aria-pressed','false');renderFilters();renderLibrary();});
  $('#promptGrid').addEventListener('click',async e=>{const f=e.target.closest('[data-favorite]');if(f){toggleFavorite(f.dataset.favorite);return;} const v=e.target.closest('[data-view]');if(v){openPrompt(v.dataset.view);return;} const c=e.target.closest('[data-copy]');if(c){const p=getPrompt(c.dataset.copy);if(p){await copyText(p.prompt);toast(t('copied'));}}});
  $('#exportBtn').addEventListener('click',exportResults); $('#importInput').addEventListener('change',e=>{if(e.target.files[0]) importFile(e.target.files[0]);e.target.value='';});
  $('#promptDialog').addEventListener('close',closePromptUrl); $('#compareBar').addEventListener('click',e=>{const b=e.target.closest('[data-variant]');if(b)openPrompt(b.dataset.variant,false);});
  $('#favoriteDialogBtn').addEventListener('click',()=>state.selectedPromptId&&toggleFavorite(state.selectedPromptId));
  $('#copyDialogBtn').addEventListener('click',async()=>{await copyText($('#dialogPrompt').value);toast(t('copied'));}); $('#copyOpenDialogBtn').addEventListener('click',()=>copyAndOpen($('#dialogPrompt').value));
  $('#shareDialogBtn').addEventListener('click',async()=>{const url=location.href;if(navigator.share){try{await navigator.share({title:$('#dialogTitle').textContent,url});return;}catch{}}await copyText(url);toast(t('shared'));});
  $('#addDialogChainBtn').addEventListener('click',()=>addToChain($('#dialogPrompt').value,$('#dialogTitle').textContent));
  $('#workflowSelect').addEventListener('change',()=>{$('#themeField').style.display=$('#workflowSelect').value==='slide-deck'?'grid':'none';});
  $('#generatePromptBtn').addEventListener('click',composePrompt); $('#copyLabBtn').addEventListener('click',async()=>{if(!$('#labOutput').value)composePrompt();if($('#labOutput').value){await copyText($('#labOutput').value);toast(t('copied'));}}); $('#copyOpenLabBtn').addEventListener('click',()=>{if(!$('#labOutput').value)composePrompt();if($('#labOutput').value)copyAndOpen($('#labOutput').value);});
  $('#lintLabBtn').addEventListener('click',()=>{const text=$('#labOutput').value||composePrompt();if(text){$('#lintInput').value=text;renderLint(scorePrompt(text,$('#audienceSelect').value));switchTab('lint');}});
  $('#addLabToChainBtn').addEventListener('click',()=>{const text=$('#labOutput').value||composePrompt();if(text)addToChain(text,localized(state.workflows.find(w=>w.id===$('#workflowSelect').value)?.name)||'Prompt Lab');});
  $('#defaultChainBtn').addEventListener('click',loadDefaultChain); $('#copyChainBtn').addEventListener('click',async()=>{const text=chainText();if(text){await copyText(text);toast(t('chainCopied'));}}); $('#clearChainBtn').addEventListener('click',()=>{state.chain=[];saveChain();renderChain();});
  $('#chainList').addEventListener('input',syncChainEdits); $('#chainList').addEventListener('click',e=>{const up=e.target.closest('[data-move-up]'),down=e.target.closest('[data-move-down]'),rm=e.target.closest('[data-remove-chain]');let id=up?.dataset.moveUp||down?.dataset.moveDown||rm?.dataset.removeChain;if(!id)return;syncChainEdits();let i=state.chain.findIndex(x=>x.id===id);if(rm){state.chain.splice(i,1);}else if(up&&i>0){[state.chain[i-1],state.chain[i]]=[state.chain[i],state.chain[i-1]];}else if(down&&i<state.chain.length-1){[state.chain[i+1],state.chain[i]]=[state.chain[i],state.chain[i+1]];}saveChain();renderChain();});
  $('#runLintBtn').addEventListener('click',()=>renderLint(scorePrompt($('#lintInput').value))); $('#useSelectedLintBtn').addEventListener('click',()=>{const p=getPrompt(state.selectedPromptId)||filteredPrompts()[0];if(p){$('#lintInput').value=p.prompt;renderLint(scorePrompt(p.prompt,p.ageGroup));}});
  document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){e.preventDefault();switchTab('library');$('#searchInput').focus();} if(e.key==='Escape'&&$('#promptDialog').open)$('#promptDialog').close();});
  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();state.deferredInstallPrompt=e;$('#installBtn').classList.remove('hidden');}); $('#installBtn').addEventListener('click',async()=>{if(!state.deferredInstallPrompt)return;state.deferredInstallPrompt.prompt();await state.deferredInstallPrompt.userChoice;state.deferredInstallPrompt=null;$('#installBtn').classList.add('hidden');});
}

async function init() {
  updateI18n();
  const [pManifest,wData] = await Promise.all([fetch('./data/prompts.json').then(r=>r.json()),fetch('./data/workflows.json').then(r=>r.json())]);
  const packData = await Promise.all((pManifest.packs || []).map(pack => fetch(pack.path).then(r => r.json())));
  const pData = {...pManifest, prompts: packData.flatMap(pack => pack.prompts || [])};
  state.prompts = pData.prompts; state.workflows = wData.workflows; $('#statPrompts').textContent = pData.counts.prompts;
  renderFilters(); renderLibrary(); renderWorkflowOptions(); renderThemeOptions(); renderChain(); composeInitialLab(); bindEvents();
  const promptId = new URL(location.href).searchParams.get('prompt'); if(promptId && getPrompt(promptId)) openPrompt(promptId);
  if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('./service-worker.js').catch(()=>{});
}
function composeInitialLab(){ $('#focusInput').value = state.lang==='zh-TW'?'核心概念與實際應用':'core concepts and practical application'; composePrompt(); $('#focusInput').value=''; }

init().catch(err=>{console.error(err);$('#promptGrid').innerHTML=`<div class="empty-state"><strong>Failed to load data</strong><p>${escapeHtml(err.message)}</p></div>`;});
