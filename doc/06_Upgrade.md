---
title: Upgrade Information
---

# Upgrade Information

The following steps are necessary when updating to newer versions.

## Upgrade to 2026.4

- [Data Object Module] The `BaseColumnEditor` component is now part of the Studio SDK (`@pimcore/studio-ui-bundle/modules/data-object`). It accepts new props: `onChange`, `compact`, `readOnly`, `fillHeight`, `hideApplyDiscard`, `hideAddButtons`, `hidePreviewControls`. The `hideToolbar` prop is deprecated. Newly added columns store the real field type in `fieldtype` ('system' for system columns, 'advanced' for advanced columns) instead of the column key.

## Upgrade to 2026.3.1

- [Documents] `DocumentLinkEditableValue.internalType` is now typed as `string | null | undefined` instead of `string | undefined`. The link editable clears the property with `null` rather than `undefined`, so the cleared value survives JSON serialisation and actually reaches the backend. Code that assigns this property to a `string | undefined` variable has to widen its own type accordingly.

## Upgrade to 2025.4.6

- [Frontend build] The compiled frontend now ships as a single archive (`build-dist/build-<id>.zip`) instead of a committed `public/build/` directory, and is extracted into `public/build/` automatically during cache warmup.

> **Note:** Read-only filesystem deployments must run `bin/console cache:warmup` (or `cache:clear`) during the build/deploy phase while `vendor/` is still writable — standard Pimcore deployments already do this. When `assets:install` runs in copy mode, run `cache:warmup` before it.
