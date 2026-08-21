---
title: Upgrade Information
---

# Upgrade Information

The following steps are necessary when updating to newer versions.

## Upgrade to 2026.2.7

- [Button] The core `Button` component's DOM class names were renamed from the generic `button` BEM family to `studio-button` (`button` → `studio-button`, `button--type-*` → `studio-button--type-*`, `button--color-*` → `studio-button--color-*`, `button__text` → `studio-button__text`, `button__loading-spinner` → `studio-button__loading-spinner`). The generic `.button` class collided with website CSS in document editmode. Update any custom styles targeting these class names.

## Upgrade to 2025.4.6

- [Frontend build] The compiled frontend now ships as a single archive (`build-dist/build-<id>.zip`) instead of a committed `public/build/` directory, and is extracted into `public/build/` automatically during cache warmup.

> **Note:** Read-only filesystem deployments must run `bin/console cache:warmup` (or `cache:clear`) during the build/deploy phase while `vendor/` is still writable — standard Pimcore deployments already do this. When `assets:install` runs in copy mode, run `cache:warmup` before it.
