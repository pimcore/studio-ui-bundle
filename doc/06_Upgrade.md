---
title: Upgrade Information
---

# Upgrade Information

The following steps are necessary when updating to newer versions.

## Upgrade to 2026.4.0

- [Classification Store] Added: sub groups, the per-store vocabulary a key's assignment to a group can be tagged with.

- [Classification Store] Added: a key assignment in a group can narrow the key's options and units for that group, from a new action on each row of the group's key grid.

- [Classification Store] Added: free-form pairs and localized internal titles on keys, groups, collections and sub groups, edited from two new row actions in the Classification Store configuration screen.

- [Classification Store] Added: Export and Import actions on a store in the Classification Store configuration screen, which write and read the store's whole configuration as one JSON artifact.

- [Data Objects] Added: the Group tab in the data object grid's add-column picker, which adds a column for every key of the picked group, in the order the group lists them, leaving out the keys the configuration already shows.

- [Dependencies] `pimcore/studio-backend-bundle` is now required in `^2026.4`, because the Group tab asks for a group's key layout without an object in context and `2026.3` answers that with a 404.

- [Data Objects] Classification Store key labels in the object editor now show the key title instead of the technical key name; keys without a title keep showing their name. The new label is used on the Edit tab, in the language comparison and in the version detail view. Group names, the group-by-key selection, the grid column picker and batch edit are unchanged. Which title that is still depends on how the key's group reached the object. A group added through the group dialog is labelled with the `Title` column of `Settings > Classification Store > <store> > Keys`, and falls back to the key name when that column is empty. A group that was already active when the object was opened is labelled with the title stored inside the key definition, and falls back to the key name only when the definition carries no title either. The two titles are separate values and the Keys grid now writes only the configured one (see the next note), so a key whose titles have drifted apart — configured `Height`, definition `Legacy` — is labelled `Height` right after it is added through the dialog and `Legacy` once the object is reopened. Resolving the already-active path by the configured title as well is still open.

- [Data Objects] The `Title` column in `Settings > Classification Store > <store> > Keys` now reads and writes the configured key title instead of the title inside the key definition. Renaming a key, editing its description, changing its type or saving its definition no longer writes the definition's title over the configured one, so a title entered in that column survives those edits. Stores where the two titles had already drifted apart show the configured title in the column from now on; a key whose configured title is empty shows an empty cell even when its definition carries a title.

- [Data Objects] `Image` can now be chosen as the type of a Classification Store key in `Settings > Classification Store > <store> > Keys`, and renders as the image field on the object's Classification Store tab.

- [Classification Store] Added: every data field type except the container types, `URL Slug` and `Reverse Object Relation` can now be chosen as a key type, listed disabled on a store whose engine cannot hold it, and a store shows its engine on its own screen. Keys of a type without a grid filter are no longer offered one in the grid filter's group-by-key picker; filters already saved keep working.

- [Data Objects] The `Edit key definition` dialog in `Settings > Classification Store > <store> > Keys` no longer offers `Mandatory`, `Index`, `Unique`, `Visible in grid view` or `Visible in search result`, because none of them had any effect on a Classification Store key — a key's values are stored in `classificationstore_data` rather than in the object's query table, and the per-assignment `Mandatory` of the `Groups` tab is the only one the object editor reads. `Not editable` and `Invisible` are read and stay. Values a key definition already carries for the five removed options are kept as they are on save; the dialogs of class, object brick and field collection fields are unchanged.

- [Classification Store] Added: an `Include in the Classification Store search index` toggle on the `Edit key definition` dialog in `Settings > Classification Store > <store> > Keys`, stored as `indexed` inside the key definition. A key whose definition carries no such flag opens with the toggle on, so no existing key is reported as excluded.

- [Classification Store] Added: a key can decide its own localization. The `Edit key definition` dialog in `Settings > Classification Store > <store> > Keys` carries an `Inherit` / `Localized` / `Not localized` control, and the object editor binds a key that resolves to not localized to the language-independent value even inside a localized field. A class field that is not localized but holds a key flagged localized now offers the language controls it previously withheld.

- [Classification Store] Added: a `Deleted` view on the `Keys` tab of a store, where a deleted key can be found and restored; the key's delete dialog now says what deleting removes and what it leaves.

- [Classification Store] Added: `Multi Value` as a key type, a key that holds several values of one other type, optionally split into named variants and repeatable up to a maximum, edited from the `Edit key definition` dialog and on the object's Classification Store tab.

- [Listings] Search modes can contribute columns while they are applied (`SearchModeAbstract.getAdditionalColumns()`, default: none). They are shown via the new `visibleColumns` of `useSelectedColumns()`, can be filtered and reordered for the session, and are never stored in grid configurations or saved searches. A bundle with its own listing data query must request `visibleColumns` instead of `selectedColumns`, otherwise mode columns stay empty.
- [Layout] New SDK component `PageLayout` (`@pimcore/studio-ui-bundle/components`) with `variant: 'content' | 'split' | 'config'` replaces three layout components. `ContentLayout` becomes `<PageLayout variant="content">` with the same props. `SplitLayout` becomes `<PageLayout variant="split">` and `ConfigLayout` becomes `<PageLayout variant="config">` (same defaults: 20/80 split, 170px minimum for the left item, divider and toolbar alignment on); for both, `resizeAble` is renamed to `resizable`. For `SplitLayout`, `leftItemFullWidth`/`rightItemFullWidth` are replaced by `fullWidth="left"`/`fullWidth="right"`; `ConfigLayout` ignores these flags, so drop them when migrating it (`fullWidth` on the config variant does hide the other item). The split and config variants also take a `className`, which the deprecated components do not. `SplitLayoutItem` has no replacement: `PageLayout` renders its items from `leftItem` and `rightItem`. New types: `PageLayoutProps`, `PageLayoutContentProps`, `PageLayoutSplitProps`, `PageLayoutConfigProps` and `PageLayoutPaneProps`. `ContentLayout`, `SplitLayout`, `SplitLayoutProps`, `SplitLayoutItem`, `SplitLayoutItemProps`, `ConfigLayout` and `ConfigLayoutProps` are deprecated: they keep their props, defaults and rendered markup, and will be removed in the next major version. The one exception: `SplitLayout` with both full-width flags set now shows both items at their own sizes instead of both at 100% width. `SplitLayoutDivider` is not deprecated. The `ConfigLayout` documentation now states its real defaults (20/80, 170px minimum, no maximum) instead of 25/75 with a 280px maximum.
## Upgrade to 2026.3.3

- [Dependencies] `react-router-dom` moved from 6.30.4 to 7.18. React Router 6 is end of life and affected by [CVE-2026-53669](https://github.com/advisories/GHSA-wrjc-x8rr-h8h6) (open redirect through backslashes in `<Link to>` and `navigate()`); 7.18 is the first patched line. Studio UI itself only navigates to hard-coded routes and keeps importing from `react-router-dom`, so nothing changes for Studio users. Plugins are affected in two ways: Studio UI shares its runtime dependencies through module federation, so a plugin that declares `react-router-dom` has to require `^7.18` to keep using the host's copy (a `^6` requirement makes it bundle its own, still vulnerable, copy); and in React Router 7 `navigate()` returns `void | Promise<void>`, so code checked by `@typescript-eslint/no-floating-promises` needs `void navigate(...)` or `await`.

## Upgrade to 2026.3.1

- [Documents] `DocumentLinkEditableValue.internalType` is now typed as `string | null | undefined` instead of `string | undefined`. The link editable clears the property with `null` rather than `undefined`, so the cleared value survives JSON serialisation and actually reaches the backend. Code that assigns this property to a `string | undefined` variable has to widen its own type accordingly.

## Upgrade to 2025.4.18

- [Dependencies] `react-router-dom` moved from 6.30.4 to 7.18. React Router 6 is end of life and affected by [CVE-2026-53669](https://github.com/advisories/GHSA-wrjc-x8rr-h8h6) (open redirect through backslashes in `<Link to>` and `navigate()`); 7.18 is the first patched line. Studio UI itself only navigates to hard-coded routes and keeps importing from `react-router-dom`, so nothing changes for Studio users. Plugins are affected in two ways: Studio UI shares its runtime dependencies through module federation, so a plugin that declares `react-router-dom` has to require `^7.18` to keep using the host's copy (a `^6` requirement makes it bundle its own, still vulnerable, copy); and in React Router 7 `navigate()` returns `void | Promise<void>`, so code checked by `@typescript-eslint/no-floating-promises` needs `void navigate(...)` or `await`.

## Upgrade to 2025.4.6

- [Frontend build] The compiled frontend now ships as a single archive (`build-dist/build-<id>.zip`) instead of a committed `public/build/` directory, and is extracted into `public/build/` automatically during cache warmup.

> **Note:** Read-only filesystem deployments must run `bin/console cache:warmup` (or `cache:clear`) during the build/deploy phase while `vendor/` is still writable — standard Pimcore deployments already do this. When `assets:install` runs in copy mode, run `cache:warmup` before it.
