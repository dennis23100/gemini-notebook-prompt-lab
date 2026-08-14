const AGE_META = {
  children: { zh: '兒童', zhRange: '15歲以下', en: 'Children', enRange: '≤15' },
  youth: { zh: '青年', zhRange: '16–34歲', en: 'Youth', enRange: '16–34' },
  adult: { zh: '成熟讀者', zhRange: '35歲以上', en: 'Mature readers', enRange: '35+' }
};

const isZhAudience = () => document.documentElement.lang.toLowerCase().startsWith('zh');
const audienceLabel = (id, withRange = true) => {
  const meta = AGE_META[id];
  if (!meta) return id;
  if (isZhAudience()) return withRange ? `${meta.zh} · ${meta.zhRange}` : meta.zh;
  return withRange ? `${meta.en} · ${meta.enRange}` : meta.en;
};
const ageFromPromptId = id => ['children', 'youth', 'adult'].find(age => String(id || '').startsWith(`${age}-`)) || null;

function patchAudienceFilters() {
  const host = document.querySelector('#ageFilters');
  if (!host) return;
  host.setAttribute('role', 'radiogroup');
  host.querySelector('[data-age="all"]')?.remove();
  host.querySelectorAll('[data-age]').forEach(button => {
    const age = button.dataset.age;
    if (!AGE_META[age]) return;
    const next = audienceLabel(age, true);
    if (button.textContent !== next) button.textContent = next;
    button.setAttribute('role', 'radio');
    button.setAttribute('aria-checked', String(button.classList.contains('active')));
  });
}

function patchPromptCards() {
  document.querySelectorAll('#promptGrid .prompt-card[data-id]').forEach(card => {
    const age = ageFromPromptId(card.dataset.id);
    const badge = card.querySelector('.badge.age');
    if (age && badge) {
      const next = audienceLabel(age, true);
      if (badge.textContent !== next) badge.textContent = next;
    }
  });
}

function patchDialogAudience() {
  const compare = document.querySelector('#compareBar');
  if (compare) {
    compare.querySelectorAll('[data-variant]').forEach(button => {
      const age = ageFromPromptId(button.dataset.variant);
      if (age) {
        const next = audienceLabel(age, true);
        if (button.textContent !== next) button.textContent = next;
      }
    });
    const active = compare.querySelector('[data-variant].active');
    const activeAge = ageFromPromptId(active?.dataset.variant);
    const badge = document.querySelector('#dialogBadges .badge.age');
    if (activeAge && badge) {
      const next = audienceLabel(activeAge, true);
      if (badge.textContent !== next) badge.textContent = next;
    }
  }
}

function patchAudienceSelect() {
  const select = document.querySelector('#audienceSelect');
  if (!select) return;
  [...select.options].forEach(option => {
    if (!AGE_META[option.value]) return;
    const next = audienceLabel(option.value, true);
    if (option.textContent !== next) option.textContent = next;
  });
}

function patchAudienceCopy() {
  const zh = isZhAudience();
  const step = document.querySelector('[data-i18n="step1Body"]');
  if (step) step.textContent = zh
    ? '兒童、青年或成熟讀者，讓語氣、閱讀密度與視覺節奏跟著調整。'
    : 'Children, youth, or mature readers — adjust tone, density, and visual pacing.';
  const reset = document.querySelector('#clearFiltersBtn');
  if (reset) reset.textContent = zh ? '重設篩選' : 'Reset filters';
}

function patchAllAudienceUi() {
  patchAudienceFilters();
  patchPromptCards();
  patchDialogAudience();
  patchAudienceSelect();
  patchAudienceCopy();
}

function desiredAudienceFromUrl() {
  const age = new URL(location.href).searchParams.get('age');
  return AGE_META[age] ? age : 'children';
}

function selectAudience(age) {
  const button = document.querySelector(`#ageFilters [data-age="${age}"]`);
  if (button && !button.classList.contains('active')) button.click();
}

function installFilterBehavior() {
  const categories = document.querySelector('#categoryFilters');
  if (categories && categories.dataset.toggleReady !== '1') {
    categories.dataset.toggleReady = '1';
    let clickedActive = false;
    categories.addEventListener('click', event => {
      const button = event.target.closest('[data-category]');
      clickedActive = Boolean(button && button.dataset.category !== 'all' && button.classList.contains('active'));
    }, true);
    categories.addEventListener('click', () => {
      if (!clickedActive) return;
      clickedActive = false;
      queueMicrotask(() => categories.querySelector('[data-category="all"]')?.click());
    });
  }

  const lang = document.querySelector('#langBtn');
  if (lang && lang.dataset.audienceLangReady !== '1') {
    lang.dataset.audienceLangReady = '1';
    lang.addEventListener('click', () => setTimeout(patchAllAudienceUi, 20));
  }

  const reset = document.querySelector('#clearFiltersBtn');
  if (reset && reset.dataset.audienceResetReady !== '1') {
    reset.dataset.audienceResetReady = '1';
    reset.addEventListener('click', () => queueMicrotask(() => selectAudience('children')));
  }
}

function observeAudienceUi() {
  const configs = [
    ['#ageFilters', patchAudienceFilters],
    ['#promptGrid', patchPromptCards],
    ['#compareBar', patchDialogAudience],
    ['#dialogBadges', patchDialogAudience],
    ['#audienceSelect', patchAudienceSelect]
  ];
  configs.forEach(([selector, patch]) => {
    const node = document.querySelector(selector);
    if (!node || node.dataset.audienceObserver === '1') return;
    node.dataset.audienceObserver = '1';
    new MutationObserver(() => requestAnimationFrame(patch)).observe(node, { childList: true });
  });

  const langObserver = new MutationObserver(() => requestAnimationFrame(patchAllAudienceUi));
  langObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
}

function initAudienceGallery() {
  const ready = document.querySelector('#ageFilters [data-age="children"]');
  if (!ready) return false;
  patchAllAudienceUi();
  installFilterBehavior();
  observeAudienceUi();
  selectAudience(desiredAudienceFromUrl());
  document.documentElement.dataset.audienceReady = '1';
  setTimeout(patchAllAudienceUi, 180);
  setTimeout(patchAllAudienceUi, 850);
  return true;
}

if (!initAudienceGallery()) {
  const timer = setInterval(() => {
    if (initAudienceGallery()) clearInterval(timer);
  }, 40);
  setTimeout(() => clearInterval(timer), 5000);
}
