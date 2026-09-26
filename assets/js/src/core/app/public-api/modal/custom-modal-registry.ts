/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type React from 'react'

/**
 * Props every custom modal component receives, regardless of who registered it.
 */
export interface CustomModalComponentProps<TPayload = unknown, TResult = unknown> {
  payload: TPayload
  onClose: (result?: TResult) => void
}

export type CustomModalComponent<TPayload = unknown, TResult = unknown> =
  React.ComponentType<CustomModalComponentProps<TPayload, TResult>>

const customModalRegistry = new Map<string, CustomModalComponent>()

/**
 * Registers a component that a plugin's own code (running inside the document editor iframe, or
 * any other realm) can ask Studio to render in the parent, main-window realm - the same place the
 * built-in element selector, link, upload, crop and video modals render - via
 * `PimcoreStudio.modal.openCustom(id, payload, options)`. The name reflects what the modal *does*
 * (renders in the main window regardless of which realm asked for it), not the realm the caller
 * happens to be in - a plugin with no iframe presence at all can register and open one too.
 *
 * A plugin whose federation module loads into more than one realm (e.g. both the main Studio app
 * and the document editor iframe, via a second `pimcore_studio_ui.webpack_entry_point_provider.*`
 * tag) should call this unconditionally from its `onInit`. The registration only takes effect in
 * the realm it is called from - calling it from the iframe realm registers into that realm's own,
 * unused copy of this registry, since each realm loads its own instance of the SDK. Registering
 * the component from the plugin's main-window `onInit` is what makes it available.
 *
 * The component itself must be the parent (main-window) realm's component: give it access to
 * whatever the main window provides (the Redux store, the DI container, class definitions,
 * classification store pickers, i18n, …) rather than assuming it can reach anything specific to
 * the iframe it was requested from.
 *
 * Registering a second component under the same `id` overwrites the first and logs a warning, the
 * same as {@link registerApiGatewayHandler}.
 *
 * Only this registration function is exported from the SDK (`modules/app`) - the lookup side
 * ({@link getCustomModal}) is an implementation detail of the `openCustomModal` API gateway
 * handler, not something a plugin ever needs to call itself.
 *
 * @param id - A unique identifier for the modal, e.g. `"my-bundle.my-modal"`.
 * @param component - The component to render. Receives `payload` (whatever was passed to
 * `openCustom`) and an `onClose` callback to close the modal and hand a result back to the caller.
 */
export const registerCustomModal = <TPayload = unknown, TResult = unknown>(
  id: string,
  component: CustomModalComponent<TPayload, TResult>
): void => {
  if (customModalRegistry.has(id)) {
    console.warn(`A custom modal with id "${id}" is already registered. It will be overwritten.`)
  }
  customModalRegistry.set(id, component as CustomModalComponent)
}

/**
 * Looks up a component registered via {@link registerCustomModal}. Used internally by the
 * `openCustomModal` API gateway handler; not exported from the SDK and not normally called
 * directly by plugins.
 */
export const getCustomModal = (id: string): CustomModalComponent | undefined => {
  return customModalRegistry.get(id)
}
