/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type IJsonModel, type IJsonRowNode, type IJsonTabSetNode } from 'flexlayout-react'
import { isUndefined } from 'lodash'
import { TAB_SET_MIN_SIZE } from './widget-manager-inner-model'

const DEFAULT_WEIGHT = 100

type LayoutNode = IJsonRowNode | IJsonTabSetNode

const restoreRow = (row: IJsonRowNode): IJsonRowNode => {
  const children = row.children
  let changed = false

  let restoredChildren = children.map((child: LayoutNode) => {
    if (child.type !== 'row') {
      return child
    }

    const restoredChild = restoreRow(child)
    changed = changed || restoredChild !== child
    return restoredChild
  })

  // flexlayout sizes children by their share of the total weight - when every child
  // has weight 0 (e.g. a splitter dragged to the edge, then the sibling closed) the
  // row renders all of them with a width of 0 and newly opened tabs stay invisible
  const isCollapsed = restoredChildren.length > 0 && restoredChildren.every((child: LayoutNode) => !isUndefined(child.weight) && child.weight <= 0)

  if (isCollapsed) {
    restoredChildren = restoredChildren.map((child: LayoutNode) => ({ ...child, weight: DEFAULT_WEIGHT }))
    changed = true
  }

  return changed ? { ...row, children: restoredChildren } : row
}

export const restoreCollapsedRows = (json: IJsonModel): IJsonModel => {
  const layout = restoreRow(json.layout)

  return layout === json.layout ? json : { ...json, layout }
}

// layouts saved before the min size existed would otherwise drop it on restore
export const normalizeInnerModel = (json: IJsonModel): IJsonModel => {
  const model = restoreCollapsedRows(json)

  return {
    ...model,
    global: { ...model.global, tabSetMinWidth: TAB_SET_MIN_SIZE, tabSetMinHeight: TAB_SET_MIN_SIZE }
  }
}
