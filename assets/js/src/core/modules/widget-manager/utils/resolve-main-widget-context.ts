/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Model, TabSetNode } from 'flexlayout-react'
import { isUndefined } from 'lodash'

export interface ActiveMainWidgetContext {
  nodeId: string
}

/**
 * Resolve which main widget is active from an in-memory model. Prefers flexlayout's active
 * tabset, but falls back to the first tabset's selected tab: after deleting the active pane's
 * last tab, flexlayout leaves the (now removed) tabset as "active", so getActiveTabset()
 * returns undefined and the surviving pane must be picked explicitly.
 */
export const resolveMainWidgetContext = (model: Model): ActiveMainWidgetContext | null => {
  let activeNode = model.getActiveTabset()?.getSelectedNode()

  if (isUndefined(activeNode)) {
    let firstTabset: TabSetNode | undefined
    model.visitNodes((node) => {
      if (isUndefined(firstTabset) && node instanceof TabSetNode) {
        firstTabset = node
      }
    })
    activeNode = firstTabset?.getSelectedNode()
  }

  return isUndefined(activeNode) ? null : { nodeId: activeNode.getId() }
}
