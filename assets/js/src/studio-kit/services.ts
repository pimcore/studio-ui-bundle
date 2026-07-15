/**
 * @pimcore/studio-kit/services — the FULL admin service installer.
 * Opt-in subpath: importing this pulls all 384 core service bindings. A portal
 * should prefer a curated installer (bind only what its screens need) and pass it
 * to createHost({ installServices }). Use this only when you truly want the whole set.
 */
export { installCoreServices } from '@Pimcore/app/config/services'
