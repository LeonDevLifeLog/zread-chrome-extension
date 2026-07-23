(function () {
  'use strict';

  const BTN_ID = 'zread-jump-btn';

  // 仅仓库页（路径形如 /owner/repo 或更深层级）才展示按钮
  function isRepoPage() {
    const parts = window.location.pathname.split('/').filter(Boolean);
    return parts.length >= 2;
  }

  // 地址的所有信息不变，仅将 github.com 替换为 zread.ai
  function getZreadUrl() {
    try {
      const url = new URL(window.location.href);
      url.hostname = 'zread.ai';
      return url.toString();
    } catch (e) {
      return null;
    }
  }

  // 注入一次样式（高亮 + 呼吸光晕动画）
  function ensureStyle() {
    if (document.getElementById('zread-jump-style')) return;
    const style = document.createElement('style');
    style.id = 'zread-jump-style';
    style.textContent = `
      /* 显式小号尺寸对齐 GitHub 仓库页头的 Watch/Fork/Star 按钮，仅用颜色做高亮 */
      .zread-jump-btn {
        display: inline-flex !important;
        align-items: center !important;
        gap: 4px !important;
        height: 28px !important;
        padding: 0 12px !important;
        font-size: 12px !important;
        font-weight: 500 !important;
        line-height: 1 !important;
        color: #ffffff !important;
        background: linear-gradient(135deg, #7c3aed 0%, #d946ef 100%) !important;
        border: 1px solid rgba(255,255,255,0.3) !important;
        border-radius: 6px !important;
        text-decoration: none !important;
        cursor: pointer !important;
        box-shadow: 0 0 0 0 rgba(217,70,239,0.6) !important;
        animation: zread-pulse 2s infinite !important;
        white-space: nowrap !important;
        user-select: none !important;
      }
      .zread-jump-btn:hover {
        filter: brightness(1.08) !important;
        text-decoration: none !important;
      }
      .zread-jump-btn:active { transform: translateY(1px) !important; }
      @keyframes zread-pulse {
        0%   { box-shadow: 0 0 0 0 rgba(217,70,239,0.6); }
        70%  { box-shadow: 0 0 0 12px rgba(217,70,239,0); }
        100% { box-shadow: 0 0 0 0 rgba(217,70,239,0); }
      }
      /* 找不到合适的页头容器时的浮动兜底方案 */
      .zread-jump-floating {
        position: fixed !important;
        top: 12px !important;
        right: 12px !important;
        z-index: 99999 !important;
        margin: 0 !important;
      }
    `;
    document.head.appendChild(style);
  }

  function createButton() {
    const url = getZreadUrl();
    if (!url) return null;
    const btn = document.createElement('a');
    btn.id = BTN_ID;
    btn.className = 'zread-jump-btn';
    btn.href = url;
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.title = '在新标签页打开 zread.ai（github.com → zread.ai）';
    btn.innerHTML = '<span aria-hidden="true">⚡</span> zread.ai';
    return btn;
  }

  function insertButton(btn) {
    // 1) 新版仓库页头操作列表（Watch/Fork/Star 所在 ul），插在最前 = Watch 左侧
    const actions = document.querySelector(
      '[data-testid="repo-header-actions"], ul.pagehead-actions'
    );
    if (actions) {
      const li = document.createElement('li');
      li.className = 'd-flex flex-items-center';
      li.appendChild(btn);
      actions.insertBefore(li, actions.firstChild);
      return true;
    }
    // 2) 找到 Watch 控件，在其所在列表项之前插入
    const watch = document.querySelector(
      '[data-testid="notifications-subscriptions-menu-button"], ' +
      'details[id^="repo-notifications"], [aria-label*="Watch" i]'
    );
    const watchLi = watch && (watch.closest('li') || watch);
    if (watchLi && watchLi.parentElement) {
      const li = document.createElement('li');
      li.className = 'd-flex flex-items-center';
      li.appendChild(btn);
      watchLi.parentElement.insertBefore(li, watchLi);
      return true;
    }
    // 3) 兜底：固定浮动在右上角
    btn.classList.add('zread-jump-floating');
    document.body.appendChild(btn);
    return true;
  }

  function injectButton() {
    if (!isRepoPage()) {
      const existing = document.getElementById(BTN_ID);
      if (existing) existing.remove();
      return;
    }
    if (document.getElementById(BTN_ID)) return; // 已存在则跳过
    ensureStyle();
    const btn = createButton();
    if (btn) insertButton(btn);
  }

  // 防抖：避免 MutationObserver 高频触发造成重复计算
  let scheduled = false;
  function scheduleInject() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      injectButton();
    });
  }

  function init() {
    injectButton();
    // GitHub 使用 Turbo 做 SPA 路由，监听其渲染事件
    document.addEventListener('turbo:render', scheduleInject);
    // 兜底：监听 DOM 变化（页头异步加载等情况）
    const observer = new MutationObserver(scheduleInject);
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
