const RECENT_KEY = 'gnpl.recentPrompts';
const MAX_RECENT = 8;
let builtinPromptsCache = null;
let restoringUrlState = false;
let searchSyncTimer = null;
let pendingCategoryKey = null;

const isZhProductivity = () => document.documentElement.lang.toLowerCase().startsWith('zh');
const localizedProductivity = (obj) => {
  if (typeof obj === 'string') return obj;
  const lang = isZhProductivity() ? 'zh-TW' : 'en';
  return obj?.[lang] ?? obj?.en ?? obj?.['zh-TW'] ?? '';
};
const escapeHtmlProductivity = (value = '') => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

function localToastProductivity(message) {
  const toast = document.querySelector('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(localToastProductivity.timer);
  localToastProductivity.timer = setTimeout(() => toast.classList.remove('show'), 1800);
}

async function loadBuiltinPromptsProductivity() {
  if (builtinPromptsCache) return builtinPromptsCache;
  const manifest = await fetch('./data/prompts.json').then(r => {
    if (!r.ok) throw new Error(`Prompt manifest ${r.status}`);
    return r.json();
  });
  const packs = await Promise.all((manifest.packs || []).map(pack => fetch(pack.path).then(r => {
    if (!r.ok) throw new Error(`Prompt pack ${r.status}`);
    return r.json();
  })));
  builtinPromptsCache = packs.flatMap(pack => pack.prompts || []);
  return builtinPromptsCache;
}

async function allPromptDataProductivity() {
  const builtins = await loadBuiltinPromptsProductivity();
  let custom = [];
  try { custom = JSON.parse(localStorage.getItem('gnpl.customPrompts') || '[]'); }
  catch { custom = []; }
  return [...builtins, ...(Array.isArray(custom) ? custom : [])];
}

function categoryKeyProductivity(prompt) {
  if (typeof prompt?.category === 'string') return prompt.category;
  return prompt?.category?.en ?? prompt?.category?.['zh-TW'] ?? '';
}

async function categoryKeyFromLabelProductivity(label) {
  if (!label || label === 'all') return 'all';
  const prompts = await allPromptDataProductivity();
  return categoryKeyProductivity(prompts.find(prompt => localizedProductivity(prompt.category) === label)) || label;
}

async function categoryLabelFromKeyProductivity(key) {
  if (!key || key === 'all') return 'all';
  const prompts = await allPromptDataProductivity();
  const prompt = prompts.find(item => categoryKeyProductivity(item) === key);
  return prompt ? localizedProductivity(prompt.category) : key;
}

function filterSnapshotProductivity() {
  return {
    age: document.querySelector('#ageFilters .chip.active')?.dataset.age || 'all',
    categoryLabel: document.querySelector('#categoryFilters .chip.active')?.dataset.category || 'all',
    search: document.querySelector('#searchInput')?.value?.trim() || '',
    favoritesOnly: document.querySelector('#favoritesOnlyBtn')?.getAttribute('aria-pressed') === 'true'
  };
}

async function syncFilterUrlProductivity() {
  if (restoringUrlState) return;
  const snapshot = filterSnapshotProductivity();
  const url = new URL(location.href);
  if (snapshot.age !== 'all') url.searchParams.set('age', snapshot.age); else url.searchParams.delete('age');
  const categoryKey = await categoryKeyFromLabelProductivity(snapshot.categoryLabel);
  if (categoryKey !== 'all') url.searchParams.set('category', categoryKey); else url.searchParams.delete('category');
  if (snapshot.search) url.searchParams.set('q', snapshot.search); else url.searchParams.delete('q');
  if (snapshot.favoritesOnly) url.searchParams.set('favorites', '1'); else url.searchParams.delete('favorites');
  history.replaceState({}, '', url);
}

async function restoreFilterUrlProductivity() {
  const params = new URL(location.href).searchParams;
  if (![...params.keys()].some(key => ['age', 'category', 'q', 'favorites'].includes(key))) return;
  restoringUrlState = true;
  try {
    const search = document.querySelector('#searchInput');
    if (search && params.has('q')) {
      search.value = params.get('q') || '';
      search.dispatchEvent(new Event('input', {bubbles: true}));
    }

    const age = params.get('age');
    if (age && ['children', 'youth', 'adult'].includes(age)) {
      document.querySelector(`#ageFilters [data-age="${CSS.escape(age)}"]`)?.click();
    }

    const categoryKey = params.get('category');
    if (categoryKey) {
      const label = await categoryLabelFromKeyProductivity(categoryKey);
      const categoryButton = [...document.querySelectorAll('#categoryFilters [data-category]')]
        .find(button => button.dataset.category === label);
      categoryButton?.click();
    }

    if (params.get('favorites') === '1') {
      const favorites = document.querySelector('#favoritesOnlyBtn');
      if (favorites?.getAttribute('aria-pressed') !== 'true') favorites?.click();
    }
  } finally {
    restoringUrlState = false;
    await syncFilterUrlProductivity();
  }
}

function recentIdsProductivity() {
  try {
    const raw = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    return Array.isArray(raw) ? raw.filter(Boolean).slice(0, MAX_RECENT) : [];
  } catch { return []; }
}

function saveRecentProductivity(ids) {
  localStorage.setItem(RECENT_KEY, JSON.stringify(ids.slice(0, MAX_RECENT)));
}

async function recordRecentProductivity(id) {
  if (!id) return;
  const ids = recentIdsProductivity().filter(existing => existing !== id);
  ids.unshift(id);
  saveRecentProductivity(ids);
  await renderRecentProductivity();
}

function ensureRecentSectionProductivity() {
  if (document.querySelector('#recentSection')) return;
  const toolbar = document.querySelector('#panel-library .library-toolbar');
  if (!toolbar) return;
  const section = document.createElement('section');
  section.id = 'recentSection';
  section.className = 'recent-section hidden';
  section.innerHTML = `
    <div class="recent-head">
      <div><span aria-hidden="true">↻</span><strong id="recentTitle">${isZhProductivity() ? '最近使用' : 'Recently used'}</strong></div>
      <button id="clearRecentBtn" class="link-button" type="button">${isZhProductivity() ? '清除紀錄' : 'Clear history'}</button>
    </div>
    <div id="recentList" class="recent-list"></div>`;
  toolbar.insertAdjacentElement('afterend', section);
  section.querySelector('#clearRecentBtn').addEventListener('click', () => {
    saveRecentProductivity([]);
    renderRecentProductivity();
  });
  section.querySelector('#recentList').addEventListener('click', event => {
    const button = event.target.closest('[data-recent-id]');
    if (!button) return;
    const url = new URL(location.href);
    url.searchParams.set('prompt', button.dataset.recentId);
    location.assign(url);
  });
}

async function renderRecentProductivity() {
  ensureRecentSectionProductivity();
  const section = document.querySelector('#recentSection');
  const list = document.querySelector('#recentList');
  if (!section || !list) return;
  const ids = recentIdsProductivity();
  if (!ids.length) {
    section.classList.add('hidden');
    list.innerHTML = '';
    return;
  }
  const prompts = await allPromptDataProductivity();
  const byId = new Map(prompts.map(prompt => [prompt.id, prompt]));
  const items = ids.map(id => byId.get(id)).filter(Boolean);
  section.classList.toggle('hidden', items.length === 0);
  document.querySelector('#recentTitle').textContent = isZhProductivity() ? '最近使用' : 'Recently used';
  document.querySelector('#clearRecentBtn').textContent = isZhProductivity() ? '清除紀錄' : 'Clear history';
  list.innerHTML = items.map(prompt => `<button type="button" class="recent-chip" data-recent-id="${escapeHtmlProductivity(prompt.id)}"><span>${escapeHtmlProductivity(localizedProductivity(prompt.title))}</span><small>${escapeHtmlProductivity(localizedProductivity(prompt.ageLabel) || prompt.ageGroup)}</small></button>`).join('');
}

function csvCellProductivity(value) {
  return `"${String(value ?? '').replaceAll('"', '""')}"`;
}

function downloadTextProductivity(content, filename, type) {
  const blob = new Blob([content], {type});
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

async function filteredPromptDataProductivity() {
  const prompts = await allPromptDataProductivity();
  const snapshot = filterSnapshotProductivity();
  const query = snapshot.search.toLocaleLowerCase();
  let favoriteIds = [];
  try { favoriteIds = JSON.parse(localStorage.getItem('gnpl.favorites') || '[]'); } catch { favoriteIds = []; }
  const favorites = new Set(Array.isArray(favoriteIds) ? favoriteIds : []);
  return prompts.filter(prompt => {
    if (snapshot.age !== 'all' && prompt.ageGroup !== snapshot.age) return false;
    if (snapshot.categoryLabel !== 'all' && localizedProductivity(prompt.category) !== snapshot.categoryLabel) return false;
    if (snapshot.favoritesOnly && !favorites.has(prompt.id)) return false;
    if (!query) return true;
    const haystack = [localizedProductivity(prompt.title), localizedProductivity(prompt.summary), localizedProductivity(prompt.category), prompt.prompt, prompt.themeId, prompt.ageGroup].join(' ').toLocaleLowerCase();
    return haystack.includes(query);
  });
}

function markdownExportProductivity(prompts) {
  const heading = isZhProductivity() ? '# Gemini Notebook 提示詞匯出' : '# Gemini Notebook Prompt Export';
  const metadata = `${isZhProductivity() ? '匯出時間' : 'Exported'}: ${new Date().toISOString()}\n\n${isZhProductivity() ? '數量' : 'Count'}: ${prompts.length}`;
  const sections = prompts.map(prompt => `## ${localizedProductivity(prompt.title)}\n\n- ID: \`${prompt.id}\`\n- ${isZhProductivity() ? '受眾' : 'Audience'}: ${localizedProductivity(prompt.ageLabel) || prompt.ageGroup}\n- ${isZhProductivity() ? '分類' : 'Category'}: ${localizedProductivity(prompt.category)}\n\n${localizedProductivity(prompt.summary)}\n\n\`\`\`text\n${prompt.prompt}\n\`\`\``).join('\n\n---\n\n');
  return `${heading}\n\n${metadata}\n\n${sections}\n`;
}

function csvExportProductivity(prompts) {
  const headers = ['id', 'title', 'audience', 'category', 'summary', 'prompt'];
  const rows = prompts.map(prompt => [prompt.id, localizedProductivity(prompt.title), localizedProductivity(prompt.ageLabel) || prompt.ageGroup, localizedProductivity(prompt.category), localizedProductivity(prompt.summary), prompt.prompt].map(csvCellProductivity).join(','));
  return [headers.join(','), ...rows].join('\r\n');
}

async function exportProductivity(format) {
  const prompts = await filteredPromptDataProductivity();
  const stamp = new Date().toISOString().slice(0, 10);
  if (format === 'md') {
    downloadTextProductivity(markdownExportProductivity(prompts), `gemini-notebook-prompts-${stamp}.md`, 'text/markdown;charset=utf-8');
  } else if (format === 'csv') {
    downloadTextProductivity('\ufeff' + csvExportProductivity(prompts), `gemini-notebook-prompts-${stamp}.csv`, 'text/csv;charset=utf-8');
  } else {
    const payload = {schemaVersion: '1.0.0', exportedAt: new Date().toISOString(), prompts};
    downloadTextProductivity(JSON.stringify(payload, null, 2), `gemini-notebook-prompts-${stamp}.json`, 'application/json;charset=utf-8');
  }
  localToastProductivity(isZhProductivity() ? `已匯出 ${prompts.length} 組提示詞` : `Exported ${prompts.length} prompts`);
}

function ensureExportMenuProductivity() {
  const exportButton = document.querySelector('#exportBtn');
  if (!exportButton || exportButton.dataset.enhancedExport === '1') return;
  exportButton.dataset.enhancedExport = '1';
  const wrapper = document.createElement('span');
  wrapper.className = 'export-wrap';
  exportButton.parentNode.insertBefore(wrapper, exportButton);
  wrapper.appendChild(exportButton);
  const menu = document.createElement('div');
  menu.id = 'exportMenu';
  menu.className = 'export-menu hidden';
  menu.innerHTML = `
    <button type="button" data-export-format="json"><strong>JSON</strong><small>${isZhProductivity() ? '可重新匯入' : 'Re-importable'}</small></button>
    <button type="button" data-export-format="md"><strong>Markdown</strong><small>${isZhProductivity() ? '適合閱讀與文件' : 'Readable docs'}</small></button>
    <button type="button" data-export-format="csv"><strong>CSV</strong><small>${isZhProductivity() ? '適合試算表' : 'Spreadsheet friendly'}</small></button>`;
  wrapper.appendChild(menu);

  exportButton.addEventListener('click', event => {
    event.preventDefault();
    event.stopImmediatePropagation();
    menu.classList.toggle('hidden');
  }, true);

  menu.addEventListener('click', async event => {
    const button = event.target.closest('[data-export-format]');
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    menu.classList.add('hidden');
    await exportProductivity(button.dataset.exportFormat);
  });

  document.addEventListener('click', event => {
    if (!wrapper.contains(event.target)) menu.classList.add('hidden');
  });
}

async function restoreCategoryAfterLanguageSwitchProductivity() {
  if (!pendingCategoryKey || pendingCategoryKey === 'all') return;
  const label = await categoryLabelFromKeyProductivity(pendingCategoryKey);
  const button = [...document.querySelectorAll('#categoryFilters [data-category]')].find(item => item.dataset.category === label);
  button?.click();
  pendingCategoryKey = null;
  await syncFilterUrlProductivity();
}

function bindProductivityEvents() {
  document.addEventListener('input', event => {
    if (!event.target.matches('#searchInput')) return;
    clearTimeout(searchSyncTimer);
    searchSyncTimer = setTimeout(syncFilterUrlProductivity, 180);
  });

  document.addEventListener('click', event => {
    const filterTarget = event.target.closest('[data-age], [data-category], #favoritesOnlyBtn, #clearFiltersBtn');
    if (filterTarget) setTimeout(syncFilterUrlProductivity, 0);

    const recentTarget = event.target.closest('[data-view], [data-copy], [data-variant]');
    if (recentTarget) {
      const id = recentTarget.dataset.view || recentTarget.dataset.copy || recentTarget.dataset.variant;
      recordRecentProductivity(id);
    }

    if (event.target.closest('#copyDialogBtn, #copyOpenDialogBtn')) {
      recordRecentProductivity(new URL(location.href).searchParams.get('prompt'));
    }

    if (event.target.closest('#langBtn')) {
      const currentLabel = filterSnapshotProductivity().categoryLabel;
      categoryKeyFromLabelProductivity(currentLabel).then(key => { pendingCategoryKey = key; });
      setTimeout(() => {
        renderRecentProductivity();
        restoreCategoryAfterLanguageSwitchProductivity();
      }, 220);
    }
  });
}

async function initProductivity() {
  ensureRecentSectionProductivity();
  ensureExportMenuProductivity();
  bindProductivityEvents();
  loadBuiltinPromptsProductivity().catch(console.warn);
  setTimeout(async () => {
    await restoreFilterUrlProductivity();
    await renderRecentProductivity();
  }, 850);
}

window.addEventListener('DOMContentLoaded', initProductivity, {once: true});
