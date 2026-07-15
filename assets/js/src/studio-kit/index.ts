/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/*
 * @pimcore/studio-kit — LOCAL (unpublished) package. Framework entry (SLIM).
 *
 * The reusable Studio host-framework surface for building standalone Studio-stack
 * applications (the customer portal, and other apps in future). Kept deliberately
 * LIGHT: it does NOT pull the full admin service graph or the component library.
 *
 *   - Heavy component library  → import from '@pimcore/studio-kit/components'
 *   - Full admin service set   → import { installCoreServices } from '@pimcore/studio-kit/services'
 *
 * A standalone app builds this in (local bundle), not Module Federation.
 */

// ── Host & DI framework ──
export { createHost, type PortalHost, type CreateHostOptions } from '@Pimcore/app/host/create-host'
export { createDiInstance } from '@Pimcore/lib/dependency-injection'
export {
  container,
  ContainerContext,
  ContainerProvider,
  useInjection,
  useOptionalInjection,
  useMultiInjection
} from '@Pimcore/app/depency-injection'
export { serviceIds } from '@Pimcore/app/config/services/service-ids'

// ── Store ──
export {
  createStore,
  store,
  rootReducer,
  injectSliceWithState,
  useAppDispatch,
  useAppSelector,
  addAppMiddleware,
  withAppMiddleware,
  type AppStore,
  type AppDispatch,
  type RootState
} from '@Pimcore/app/store'

// ── API & config ──
export { api } from '@Pimcore/app/api/pimcore'
export { appConfig, currentDomain, type AppConfig } from '@Pimcore/app/config/app-config'

// ── Extensibility: plugin / module / registry system ──
export * as PluginSystem from '@Pimcore/app/plugin-system/plugin-system'
export * as ModuleSystem from '@Pimcore/app/module-system/module-system'

// ── Theming ──
export * as Theme from '@Pimcore/modules/app/theme/theme-provider'
export * as DynamicTheme from '@Pimcore/modules/app/theme/dynamic-theme-provider'
export * as Styles from '@Pimcore/modules/ant-design/styles/create-styles'
