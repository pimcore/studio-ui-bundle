/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Actions, DockLocation, type Model, TabSetNode } from 'flexlayout-react'
import { isUndefined } from 'lodash'

const findEmptyTabset = (model: Model): TabSetNode | undefined => {
  let emptyTabset: TabSetNode | undefined

  model.visitNodes((node) => {
    if (isUndefined(emptyTabset) && node instanceof TabSetNode && node.getChildren().length === 0) {
      emptyTabset = node
    }
  })

  return emptyTabset
}

/**
 * Lets the tabset of the given main widget take the space of an empty tabset. Only the main tabset
 * stays when emptied, so the tabs move into it and their own tabset is removed.
 */
export const expandMainWidgetTabset = (model: Model, nodeId: string): void => {
  const tabset = model.getNodeById(nodeId)?.getParent()
  const emptyTabset = findEmptyTabset(model)

  if (!(tabset instanceof TabSetNode) || isUndefined(emptyTabset)) {
    return
  }

  [...tabset.getChildren()].forEach((tab) => {
    model.doAction(Actions.moveNode(tab.getId(), emptyTabset.getId(), DockLocation.CENTER, -1, false))
  })

  model.doAction(Actions.selectTab(nodeId))
}
