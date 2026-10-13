/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Actions, type Model, type TabSetNode } from 'flexlayout-react'
import { type WidgetManagerTabConfig } from '../widget-manager-slice'

export interface ReplaceTabPayload {
  originalId: string
  config: WidgetManagerTabConfig
}

/**
 * Moves a persisted tab to a new id and config. If a tab with the new id is already open, the
 * original tab is closed and the open one takes over its selection.
 */
export const migrateTab = (model: Model, { originalId, config }: ReplaceTabPayload): void => {
  const node = model.getNodeById(originalId)

  if (node !== undefined && config.id !== undefined && model.getNodeById(config.id) !== undefined) {
    const wasSelected = (node.getParent() as TabSetNode).getSelectedNode() === node
    model.doAction(Actions.deleteTab(originalId))
    if (wasSelected) model.doAction(Actions.selectTab(config.id))
  } else if (node !== undefined) {
    model.doAction(Actions.updateNodeAttributes(originalId, config))
  }
}

/**
 * Points an open tab at a new id and config. If a tab with the new id is already open, that tab is
 * focused instead and the original one stays as it is.
 */
export const rebindTab = (model: Model, { originalId, config }: ReplaceTabPayload): void => {
  if (config.id === undefined || model.getNodeById(originalId) === undefined) {
    return
  }

  if (model.getNodeById(config.id) === undefined) {
    model.doAction(Actions.updateNodeAttributes(originalId, config))
  } else {
    model.doAction(Actions.selectTab(config.id))
  }
}
