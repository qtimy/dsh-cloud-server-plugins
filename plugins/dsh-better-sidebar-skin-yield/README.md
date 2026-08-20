# dsh-better-sidebar-skin-yield

A narrow compatibility add-on for the top-right controls of
[`omdsh-dev/DSH-better-sidebar`](https://github.com/omdsh-dev/DSH-better-sidebar)
when older fake-window skins add a title bar.

This plugin is based on the integration surface of Better Sidebar and the skin
family in [`zhu1090093659/dsh-web-ui`](https://github.com/zhu1090093659/dsh-web-ui).
It is therefore kept inside the collection rather than presented as an
independent original project. It does not copy source from either project.

## Status

Legacy compatibility plugin. It was active with `dsh-better-sidebar@0.12.1` on
the recovered RC.8 deployment. Newer Better Sidebar releases have substantially
expanded desktop/skin positioning compatibility; test the current upstream
release first and install this add-on only if the controls still overlap.

The browser plugin watches for a `data-skin-chrome="titlebar"` marker and mounts
one lifecycle-owned CSS rule using the stable `_toggleCluster` CSS-module suffix.
It removes the style and observer when unloaded.

## Install

From the plugin collection checkout:

```bash
dsh plugin --profile web add ./plugins/dsh-better-sidebar-skin-yield
```

## License

MIT. Better Sidebar and dsh-web-ui retain their own licenses and attribution.
