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

const findExpansion = (model: Model, nodeId: string): { tabset: TabSetNode, emptyTabset: TabSetNode } | undefined => {
  const tabset = model.getNodeById(nodeId)?.getParent()
  const emptyTabset = findEmptyTabset(model)

  return tabset instanceof TabSetNode && !isUndefined(emptyTabset) ? { tabset, emptyTabset } : undefined
}

export const canExpandMainWidgetTabset = (model: Model, nodeId: string): boolean => !isUndefined(findExpansion(model, nodeId))

// only the main tabset stays when emptied, so the tabs move into it and FlexLayout removes their own tabset
export const expandMainWidgetTabset = (model: Model, nodeId: string): boolean => {
  const expansion = findExpansion(model, nodeId)

  if (isUndefined(expansion)) {
    return false
  }

  const { tabset, emptyTabset } = expansion
  const tabs = [...tabset.getChildren()]

  tabs.forEach((tab) => {
    model.doAction(Actions.moveNode(tab.getId(), emptyTabset.getId(), DockLocation.CENTER, -1, false))
  })

  model.doAction(Actions.selectTab(nodeId))
  return true
}
