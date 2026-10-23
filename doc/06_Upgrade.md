---
title: Upgrade Information
---

# Upgrade Information

The following steps are necessary when updating to newer versions.

## Upgrade to 2026.4.0

- [Listings] Search modes can contribute columns while they are applied (`SearchModeAbstract.getAdditionalColumns()`, default: none). They are shown via the new `visibleColumns` of `useSelectedColumns()`, can be filtered and reordered for the session, and are never stored in grid configurations or saved searches. A bundle with its own listing data query must request `visibleColumns` instead of `selectedColumns`, otherwise mode columns stay empty.
- [Layout] New SDK component `PageLayout` (`@pimcore/studio-ui-bundle/components`) with `variant: 'content' | 'split' | 'config'` replaces three layout components; the props stay the same apart from `variant`. `ContentLayout` becomes `<PageLayout variant="content">`, `SplitLayout` becomes `<PageLayout variant="split">` and `ConfigLayout` becomes `<PageLayout variant="config">` (same defaults: 20/80 split, 170px minimum for the left item, divider and toolbar alignment on; unlike `ConfigLayout`, it also supports `leftItemFullWidth`/`rightItemFullWidth`). New types: `PageLayoutProps`, `PageLayoutContentProps`, `PageLayoutSplitProps`, `PageLayoutSplitOptions`, `PageLayoutConfigProps` and `PageLayoutPaneProps`. `ContentLayout`, `SplitLayout`, `SplitLayoutProps`, `SplitLayoutItem`, `SplitLayoutItemProps`, `ConfigLayout` and `ConfigLayoutProps` are deprecated: they keep their props, defaults and rendered markup, and will be removed in the next major version. `SplitLayoutDivider` is not deprecated. The `ConfigLayout` documentation now states its real defaults (20/80, 170px minimum, no maximum) instead of 25/75 with a 280px maximum.
## Upgrade to 2026.3.3

- [Dependencies] `react-router-dom` moved from 6.30.4 to 7.18. React Router 6 is end of life and affected by [CVE-2026-53669](https://github.com/advisories/GHSA-wrjc-x8rr-h8h6) (open redirect through backslashes in `<Link to>` and `navigate()`); 7.18 is the first patched line. Studio UI itself only navigates to hard-coded routes and keeps importing from `react-router-dom`, so nothing changes for Studio users. Plugins are affected in two ways: Studio UI shares its runtime dependencies through module federation, so a plugin that declares `react-router-dom` has to require `^7.18` to keep using the host's copy (a `^6` requirement makes it bundle its own, still vulnerable, copy); and in React Router 7 `navigate()` returns `void | Promise<void>`, so code checked by `@typescript-eslint/no-floating-promises` needs `void navigate(...)` or `await`.

## Upgrade to 2026.3.1

- [Documents] `DocumentLinkEditableValue.internalType` is now typed as `string | null | undefined` instead of `string | undefined`. The link editable clears the property with `null` rather than `undefined`, so the cleared value survives JSON serialisation and actually reaches the backend. Code that assigns this property to a `string | undefined` variable has to widen its own type accordingly.

## Upgrade to 2025.4.18

- [Dependencies] `react-router-dom` moved from 6.30.4 to 7.18. React Router 6 is end of life and affected by [CVE-2026-53669](https://github.com/advisories/GHSA-wrjc-x8rr-h8h6) (open redirect through backslashes in `<Link to>` and `navigate()`); 7.18 is the first patched line. Studio UI itself only navigates to hard-coded routes and keeps importing from `react-router-dom`, so nothing changes for Studio users. Plugins are affected in two ways: Studio UI shares its runtime dependencies through module federation, so a plugin that declares `react-router-dom` has to require `^7.18` to keep using the host's copy (a `^6` requirement makes it bundle its own, still vulnerable, copy); and in React Router 7 `navigate()` returns `void | Promise<void>`, so code checked by `@typescript-eslint/no-floating-promises` needs `void navigate(...)` or `await`.

## Upgrade to 2025.4.6

- [Frontend build] The compiled frontend now ships as a single archive (`build-dist/build-<id>.zip`) instead of a committed `public/build/` directory, and is extracted into `public/build/` automatically during cache warmup.

> **Note:** Read-only filesystem deployments must run `bin/console cache:warmup` (or `cache:clear`) during the build/deploy phase while `vendor/` is still writable — standard Pimcore deployments already do this. When `assets:install` runs in copy mode, run `cache:warmup` before it.
