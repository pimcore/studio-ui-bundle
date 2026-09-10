/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Container } from 'inversify'
import { createStore } from '@Pimcore/app/store'
import { ContainerProvider } from '@Pimcore/app/depency-injection'

export interface PortalHost {
  container: Container
  store: ReturnType<typeof createStore>['store']
  injectSliceWithState: ReturnType<typeof createStore>['injectSliceWithState']
  ContainerProvider: typeof ContainerProvider
}

export interface CreateHostOptions {
  /**
   * Install services into this host's container. A standalone app passes a
   * curated installer that binds ONLY what it needs. Omit it (e.g. a shell) to
   * install nothing — deliberately NOT the full admin service graph, so a local
   * build stays slim. For the full admin set, import `installCoreServices` from
   * `@pimcore/portal-ui-kit/services` and pass it here — that entry re-exports the
   * side-effect-free installer, so the graph is bound exactly once. Do NOT reach for
   * `@Pimcore/app/config/services`: that is the admin bootstrap entry and installs the
   * graph on import, which would double-bind every identifier when the installer runs
   * again, leaving container.get() throwing "Ambiguous match found".
   */
  installServices?: (container: Container) => void
}

/**
 * WS3 — spin up an ISOLATED host: its own DI container + its own Redux store,
 * independent of the admin globals. Services are opt-in via `installServices`
 * (nothing by default) to keep standalone bundles slim.
 */
export function createHost (options: CreateHostOptions = {}): PortalHost {
  // One host per page: the host container IS the global window.Pimcore.container,
  // so studio dynamic-type registration/adapters (which read the global directly)
  // and context-based useInjection all resolve to the SAME container.
  const w = globalThis as unknown as { Pimcore?: { container?: Container } }
  w.Pimcore = w.Pimcore ?? {}
  const container = w.Pimcore.container ?? new Container()
  w.Pimcore.container = container
  options.installServices?.(container)
  const { store, injectSliceWithState } = createStore()

  return {
    container,
    store,
    injectSliceWithState,
    ContainerProvider
  }
}
