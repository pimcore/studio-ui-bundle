# Upgrade Notes

## Frontend build now ships as an archive (extracted at cache warmup)

The compiled frontend is no longer committed/shipped as an expanded `public/build/`
directory. It now ships as a single archive (`build-dist/build-<id>.zip`) and is reconstructed
into `public/build/` automatically by a cache warmer.

### What you need to know for deployments

- **Read-only filesystem deployments must run `bin/console cache:warmup` (or
  `cache:clear`) during the build/deploy phase, while `vendor/` is still writable.**
  The cache warmer extracts the build at that point; afterwards nothing writes to
  `vendor/` at runtime. Standard Pimcore deployments already warm the cache at deploy
  time, so this normally requires no change — but a deployment that only warms the cache
  at read-only runtime would start with no frontend assets.

- **Command order for `assets:install` in copy mode:** run `cache:warmup` *before*
  `assets:install`, so the extracted build is in place when assets are copied to the
  web root. Pimcore's default scripts (`clearCache` then `installAssets`) already do this;
  this only matters for custom deploy scripts. Symlink-mode installs are unaffected.

No action is required for standard installations: the warmer runs on `composer`
post-update and on every deploy, and a writable-guarded fallback reconstructs the build on
local development environments (e.g. after `git pull`). A local `npm run dev-app` build is
never overwritten by the archive.
