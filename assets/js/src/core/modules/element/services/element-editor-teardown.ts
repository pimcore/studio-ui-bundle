/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createListenerMiddleware } from '@reduxjs/toolkit'
import { Model, TabNode } from 'flexlayout-react'
import { addAppMiddleware } from '@sdk/app'
import { closeWidget, selectInnerModel } from '@Pimcore/modules/widget-manager/widget-manager-slice'
import { documentApi } from '@Pimcore/app/public-api/document/document-api'
import { removeDocument as removeDocumentDraft } from '@Pimcore/modules/document/document-draft-slice'
import { removeAsset } from '@Pimcore/modules/asset/asset-draft-slice'
import { removeDataObject } from '@Pimcore/modules/data-object/data-object-draft-slice'

/**
 * Deterministic teardown for element editor widgets (document / asset / data-object).
 *
 * Relying on the editor component's React unmount to free resources is unreliable:
 * when several editors are open, closing them does not consistently unmount every
 * component, leaving per-element state — and, for documents, the whole editmode
 * iframe realm — resident.
 *
 * `closeWidget` is the single reducer every close path dispatches (tab close button,
 * context menu, close-all, session restore), so we hang the cleanup off a listener on
 * that action. `getOriginalState()` gives us the layout model from *before* the tab
 * was removed, so the closed node (and its element type / id) is still resolvable.
 *
 * For documents this unmounts the editmode iframe's React app (via `unregisterIframe`),
 * which is what actually lets the browser reclaim the iframe's realm. All `remove*`
 * dispatches and `unregisterIframe` are idempotent, so a later component unmount
 * calling them again is harmless.
 */
const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  actionCreator: closeWidget,
  effect: (action, listenerApi) => {
    const innerModelJson = selectInnerModel(
      listenerApi.getOriginalState() as Parameters<typeof selectInnerModel>[0]
    )
    const node = Model.fromJson(innerModelJson).getNodeById(action.payload)

    if (!(node instanceof TabNode)) {
      return
    }

    const component = node.getComponent()
    const elementId = (node.getConfig() as { id?: unknown } | undefined)?.id

    if (typeof elementId !== 'number') {
      return
    }

    switch (component) {
      case 'document-editor':
        documentApi.unregisterIframe(elementId)
        listenerApi.dispatch(removeDocumentDraft(elementId))
        break
      case 'asset-editor':
        listenerApi.dispatch(removeAsset(elementId))
        break
      case 'data-object-editor':
        listenerApi.dispatch(removeDataObject(elementId))
        break
    }
  }
})

addAppMiddleware(listenerMiddleware.middleware)
