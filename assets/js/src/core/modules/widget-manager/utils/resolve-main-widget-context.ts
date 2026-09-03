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
 * Resolve which main widget is active from an in-memory model.
 */
export const resolveMainWidgetContext = (model: Model): ActiveMainWidgetContext | null => {
  let activeNode = model.getActiveTabset()?.getSelectedNode()

  if (isUndefined(activeNode)) {
    model.visitNodes((node) => {
      if (isUndefined(activeNode) && node instanceof TabSetNode) {
        activeNode = node.getSelectedNode()
      }
    })
  }

  return isUndefined(activeNode) ? null : { nodeId: activeNode.getId() }
}
