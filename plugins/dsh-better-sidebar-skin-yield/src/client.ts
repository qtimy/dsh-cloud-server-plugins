/**
 * dsh-better-sidebar-skin-yield — browser half
 *
 * Injects a single CSS rule into the active document whenever a dsh-skins
 * fake-window titlebar (miku / qq98 / ths / trading / xp) is mounted:
 *
 *     body:has([data-skin-chrome=titlebar]) .RPIlfG_toggleCluster {
 *       top: 34px;
 *       z-index: 1000001;
 *     }
 *
 * Why a CSS rule and not a local patch of dsh-better-sidebar? Two reasons:
 *  1. dsh-better-sidebar 0.12.x ships pre-bundled CSS strings inside JS, so
 *     editing them in-place means rebuild-from-source — and sandbox perms
 *     do not let agent or user code mutate that install dir.
 *  2. A CSS rule added by an independent plugin is implicitly scoped to its
 *     own lifetime — when the plugin unloads, the rule disappears with it.
 *
 * Why `:has([data-skin-chrome="titlebar"])` and not `body[data-dsh-miku]`?
 * The dsh-skins family is the only consumer of that attribute today, and
 * the marker is the canonical signal of a fake-window titlebar overlay (set
 * uniformly by miku / qq98 / ths / trading / xp in
 * `packages/skins/<name>/src/client/index.ts`). Future skins that need the
 * same yield pick it up automatically without a per-skin allow-list.
 *
 * Why watch attribute mutations?  The Skin Center's "Try-on" flow mounts
 * and disposes a tried-on skin fiber at runtime, which adds or removes
 * `data-skin-chrome="titlebar"` mid-session. We must follow the active
 * skin's lifetime -- otherwise the rule would persist when the user exits
 * try-on back to the stock look.
 *
 * Disposal. The owning plugin framework calls the disposer returned by
 * `ctx.effect()` on uninstall/refresh, and we use it to drop the `<style>`
 * tag and disconnect the observer.
 */

import {
  YIELD_CSS_RULE,
  STYLE_TAG_ID,
  SKIN_CHROME_ATTR,
  SKIN_CHROME_VALUE,
} from './index.js';

/**
 * Whether a yield should currently be active: any descendant of `<body>`
 * carries the `data-skin-chrome="titlebar"` marker. The check is robust to
 * viewport changes and to skin-center try-on teardowns because we re-query
 * (no cached `length`) and we listen to body attribute mutations elsewhere.
 */
function activeTitlebarPresent(body: Element | null): boolean {
  if (!body) return false;
  return body.querySelector(`[${SKIN_CHROME_ATTR}="${SKIN_CHROME_VALUE}"]`) !== null;
}

/** Build the <style> tag content. */
function buildStyleText(): string {
  return YIELD_CSS_RULE;
}

/**
 * Mount-or-update the global yield tag. Idempotent — reuses the existing
 * `<style id="STYLE_TAG_ID">` if present, updates its text otherwise.
 */
function mountYield(body: Element, head: Element): { mounted: boolean; node: HTMLStyleElement } {
  const desired = buildStyleText();
  let node = head.querySelector<HTMLStyleElement>(`style#${CSS.escape(STYLE_TAG_ID)}`);
  if (!node) {
    node = document.createElement('style');
    node.id = STYLE_TAG_ID;
    node.dataset.dshBetterSidebarSkinYield = '';
    head.appendChild(node);
  }
  if (node.textContent !== desired) node.textContent = desired;
  return { mounted: true, node };
}

/** Detach the yield tag -- called on disable, dispose, or stock-look skin. */
function unmountYield(head: Element): void {
  const node = head.querySelector<HTMLStyleElement>(`style#${CSS.escape(STYLE_TAG_ID)}`);
  if (node) node.remove();
}

/**
 * Client entry. DSH's client router calls this with a context that owns an
 * effect lifecycle: every side-effect we install must be wrapped in
 * `ctx.effect(work, label)` so the loader can retract our writes when the
 * plug-in is hot-unloaded.
 *
 * The plug-in needs:
 *  - one `<style>` tag in `<head>`, conditionally mounted/kept-empty
 *  - one `MutationObserver` on the active skin body attributes, so we can
 *    re-evaluate the rule when Skin Center swaps the active skin mid-session
 *
 * Both effects are wrapped; disposal is therefore atomic.
 */
export function apply(ctx: {
  effect: (work: () => () => void, label: string) => unknown;
}): void {
  // Defer until DOM ready -- the client router can call apply() before the
  // body's skin attribute has settled on a DSH page-load edge case.
  const start = () => {
    const body = document.body;
    const head = document.head;
    if (!body || !head) {
      // try again on next microtask; the page is still booting
      Promise.resolve().then(() => requestAnimationFrame(start));
      return;
    }
    const refresh = () => {
      if (activeTitlebarPresent(body)) mountYield(body, head);
      else unmountYield(head);
    };
    refresh();
    const observer = new MutationObserver(refresh);
    observer.observe(body, {
      attributes: true,
      attributeFilter: [SKIN_CHROME_ATTR, 'data-dsh-miku', 'data-dsh-ths', 'data-dsh-xp', 'data-dsh-qq98', 'data-dsh-trading'],
      childList: true,
      subtree: true,
    });
    ctx.effect(
      () => () => {
        observer.disconnect();
        unmountYield(head);
      },
      'dsh-better-sidebar-skin-yield: yield style + observer',
    );
  };
  if (document.body) start();
  else {
    const onReady = () => {
      document.removeEventListener('DOMContentLoaded', onReady);
      start();
    };
    document.addEventListener('DOMContentLoaded', onReady, { once: true });
    // safety: schedule a fallback microtask for browsers where
    // DOMContentLoaded has already fired by the time we attach
    Promise.resolve().then(() => document.body && start());
  }
}
