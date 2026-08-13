const isZhA11y = () => document.documentElement.lang.toLowerCase().startsWith('zh');
let lastDialogTrigger = null;

function visibleTabsA11y() {
  return [...document.querySelectorAll('.tabs .tab')].filter(tab => !tab.classList.contains('hidden') && !tab.hidden);
}

function syncTabsA11y() {
  const tabs = [...document.querySelectorAll('.tabs .tab')];
  tabs.forEach(tab => {
    const id = tab.dataset.tab;
    if (!id) return;
    tab.setAttribute('aria-controls', `panel-${id}`);
    tab.tabIndex = tab.getAttribute('aria-selected') === 'true' ? 0 : -1;
  });

  document.querySelectorAll('.tab-panel').forEach(panel => {
    const id = panel.id.replace(/^panel-/, '');
    if (id) panel.setAttribute('aria-labelledby', `tab-${id}`);
  });
}

function labelDynamicControlsA11y() {
  const zh = isZhA11y();
  document.querySelectorAll('.favorite-button').forEach(button => {
    const active = button.classList.contains('active') || button.textContent.trim() === '★';
    button.setAttribute('aria-pressed', String(active));
    button.setAttribute('aria-label', zh
      ? (active ? '取消收藏這個提示詞' : '收藏這個提示詞')
      : (active ? 'Remove this prompt from favorites' : 'Add this prompt to favorites'));
  });

  const dialogFavorite = document.querySelector('#favoriteDialogBtn');
  if (dialogFavorite) {
    const active = dialogFavorite.textContent.trim() === '★';
    dialogFavorite.setAttribute('aria-pressed', String(active));
    dialogFavorite.setAttribute('aria-label', zh
      ? (active ? '取消收藏目前提示詞' : '收藏目前提示詞')
      : (active ? 'Remove current prompt from favorites' : 'Add current prompt to favorites'));
  }

  document.querySelectorAll('[data-view]').forEach(button => {
    if (!button.hasAttribute('aria-haspopup')) button.setAttribute('aria-haspopup', 'dialog');
  });
}

function setupDialogA11y() {
  const dialog = document.querySelector('#promptDialog');
  if (!dialog || dialog.dataset.a11yReady === '1') return;
  dialog.dataset.a11yReady = '1';
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-labelledby', 'dialogTitle');
  dialog.setAttribute('aria-describedby', 'dialogSummary');

  dialog.addEventListener('close', () => {
    const target = lastDialogTrigger;
    lastDialogTrigger = null;
    if (target instanceof HTMLElement && target.isConnected) {
      requestAnimationFrame(() => target.focus({preventScroll: true}));
    }
  });
}

function setupTabKeyboardA11y() {
  const tablist = document.querySelector('.tabs');
  if (!tablist || tablist.dataset.keyboardReady === '1') return;
  tablist.dataset.keyboardReady = '1';

  tablist.addEventListener('keydown', event => {
    const current = event.target.closest('.tab');
    if (!current) return;
    const tabs = visibleTabsA11y();
    const index = tabs.indexOf(current);
    if (index < 0) return;

    let next = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = tabs[(index + 1) % tabs.length];
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = tabs[(index - 1 + tabs.length) % tabs.length];
    if (event.key === 'Home') next = tabs[0];
    if (event.key === 'End') next = tabs[tabs.length - 1];
    if (!next) return;

    event.preventDefault();
    next.focus();
    next.click();
    requestAnimationFrame(syncTabsA11y);
  });
}

function patchA11y() {
  syncTabsA11y();
  labelDynamicControlsA11y();
  setupDialogA11y();
  setupTabKeyboardA11y();
}

window.addEventListener('DOMContentLoaded', () => {
  patchA11y();
  setTimeout(patchA11y, 200);
  setTimeout(patchA11y, 900);
}, {once: true});

document.addEventListener('click', event => {
  const trigger = event.target.closest('[data-view]');
  if (trigger instanceof HTMLElement) lastDialogTrigger = trigger;
  if (event.target.closest('.tab, [data-favorite], #favoriteDialogBtn, #langBtn, #uiModeToggleBtn')) {
    requestAnimationFrame(patchA11y);
  }
});

const a11yObserver = new MutationObserver(() => patchA11y());
a11yObserver.observe(document.body, {subtree: true, childList: true});
a11yObserver.observe(document.documentElement, {attributes: true, attributeFilter: ['lang']});
