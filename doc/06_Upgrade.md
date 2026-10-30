---
title: Upgrade Information
---

# Upgrade Information

The following steps are necessary when updating to newer versions.

## Upgrade to 2026.4.0

- [Data Objects] Classification Store key labels in the object editor now show the key title instead of the technical key name; keys without a title keep showing their name. The new label is used on the Edit tab, in the language comparison and in the version detail view. Group names, the group-by-key selection, the grid column picker and batch edit are unchanged. Which title that is still depends on how the key's group reached the object. A group added through the group dialog is labelled with the `Title` column of `Settings > Classification Store > <store> > Keys`, and falls back to the key name when that column is empty. A group that was already active when the object was opened is labelled with the title stored inside the key definition, and falls back to the key name only when the definition carries no title either. The two titles are separate values and the Keys grid now writes only the configured one (see the next note), so a key whose titles have drifted apart — configured `Height`, definition `Legacy` — is labelled `Height` right after it is added through the dialog and `Legacy` once the object is reopened. Resolving the already-active path by the configured title as well is still open.

- [Data Objects] The `Title` column in `Settings > Classification Store > <store> > Keys` now reads and writes the configured key title instead of the title inside the key definition. Renaming a key, editing its description, changing its type or saving its definition no longer writes the definition's title over the configured one, so a title entered in that column survives those edits. Stores where the two titles had already drifted apart show the configured title in the column from now on; a key whose configured title is empty shows an empty cell even when its definition carries a title.

- [Data Objects] `Image` can now be chosen as the type of a Classification Store key in `Settings > Classification Store > <store> > Keys`, and renders as the image field on the object's Classification Store tab. The other image types (`Image Advanced`, `Image Gallery`, `External Image`) stay unavailable there.

- [Listings] Search modes can contribute columns while they are applied (`SearchModeAbstract.getAdditionalColumns()`, default: none). They are shown via the new `visibleColumns` of `useSelectedColumns()`, can be filtered and reordered for the session, and are never stored in grid configurations or saved searches. A bundle with its own listing data query must request `visibleColumns` instead of `selectedColumns`, otherwise mode columns stay empty.

## Upgrade to 2026.3.3

- [Dependencies] `react-router-dom` moved from 6.30.4 to 7.18. React Router 6 is end of life and affected by [CVE-2026-53669](https://github.com/advisories/GHSA-wrjc-x8rr-h8h6) (open redirect through backslashes in `<Link to>` and `navigate()`); 7.18 is the first patched line. Studio UI itself only navigates to hard-coded routes and keeps importing from `react-router-dom`, so nothing changes for Studio users. Plugins are affected in two ways: Studio UI shares its runtime dependencies through module federation, so a plugin that declares `react-router-dom` has to require `^7.18` to keep using the host's copy (a `^6` requirement makes it bundle its own, still vulnerable, copy); and in React Router 7 `navigate()` returns `void | Promise<void>`, so code checked by `@typescript-eslint/no-floating-promises` needs `void navigate(...)` or `await`.

## Upgrade to 2026.3.1

- [Documents] `DocumentLinkEditableValue.internalType` is now typed as `string | null | undefined` instead of `string | undefined`. The link editable clears the property with `null` rather than `undefined`, so the cleared value survives JSON serialisation and actually reaches the backend. Code that assigns this property to a `string | undefined` variable has to widen its own type accordingly.

## Upgrade to 2025.4.18

- [Dependencies] `react-router-dom` moved from 6.30.4 to 7.18. React Router 6 is end of life and affected by [CVE-2026-53669](https://github.com/advisories/GHSA-wrjc-x8rr-h8h6) (open redirect through backslashes in `<Link to>` and `navigate()`); 7.18 is the first patched line. Studio UI itself only navigates to hard-coded routes and keeps importing from `react-router-dom`, so nothing changes for Studio users. Plugins are affected in two ways: Studio UI shares its runtime dependencies through module federation, so a plugin that declares `react-router-dom` has to require `^7.18` to keep using the host's copy (a `^6` requirement makes it bundle its own, still vulnerable, copy); and in React Router 7 `navigate()` returns `void | Promise<void>`, so code checked by `@typescript-eslint/no-floating-promises` needs `void navigate(...)` or `await`.

## Upgrade to 2025.4.6

- [Frontend build] The compiled frontend now ships as a single archive (`build-dist/build-<id>.zip`) instead of a committed `public/build/` directory, and is extracted into `public/build/` automatically during cache warmup.

> **Note:** Read-only filesystem deployments must run `bin/console cache:warmup` (or `cache:clear`) during the build/deploy phase while `vendor/` is still writable — standard Pimcore deployments already do this. When `assets:install` runs in copy mode, run `cache:warmup` before it.
