/**
 * dsh-better-sidebar-skin-yield
 *
 * Browser-only, no-host-routes companion plugin: yields dsh-better-sidebar's
 * top-right toggle cluster (`.RPIlfG_toggleCluster`) above + just below any
 * dsh-skins "fake-window" titlebar (`data-skin-chrome="titlebar"`) that
 * paints a full-width `position:fixed z-index:1000000` titlebar at top:0 —
 * otherwise the cluster's `z-index:55 top:3` lives underneath it and every
 * mouse click is swallowed by the skin's decorative window-control glyphs
 * (a11y-hidden `– □ ×` spans that look exactly like min/max/close).
 *
 * Detection is attribute-based so future fake-window skins that reuse the
 * canonical `data-skin-chrome="titlebar"` marker (set by miku / qq98 / ths /
 * trading / xp today) get it for free; non-window skins (blue-fantasy /
 * minecraft / dragon-heir / whale-song) don't set the marker, so the
 * injected rule is a no-op and the cluster keeps the original `top:3
 * z-index:55` behavior.
 *
 * No-host-routes: this plugin exports a no-op `apply()` on the server side.
 * The browser half injects one `<style data-dsh-better-sidebar-skin-yield>`
 * tag whenever the active skin marks a titlebar; the plug-in's effect
 * lifecycle removes it on dispose.
 */

/** The single rule we need. Kept as a constant so tests can match exactly. */
export const YIELD_CSS_RULE = 'body:has([data-skin-chrome=titlebar]) .RPIlfG_toggleCluster{top:34px;z-index:1000001}';

/** Stable <style> tag id so other code (or tests) can find it. */
export const STYLE_TAG_ID = 'dsh-better-sidebar-skin-yield';

/** Body-attribute name the dsh-skins family uses for their fake-window titlebar. */
export const SKIN_CHROME_ATTR = 'data-skin-chrome';
export const SKIN_CHROME_VALUE = 'titlebar';

/** DSH expects a host face even when the plugin is browser-only — return a no-op. */
export const name = 'dsh-better-sidebar-skin-yield';
export const inject: string[] = [];

/** Host-side hook. Never called on the client; kept stable for the loader. */
export function apply(): void {
  /* browser-only; nothing to register server-side */
  /* keep an explicit return for bundlers that drop pure-empty functions */
  return;
}
