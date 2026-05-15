/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type DataObjectGetLayoutByIdApiResponse } from '@Pimcore/modules/data-object/data-object-api-slice.gen'

export interface LayoutNode {
  datatype?: string
  fieldtype?: string
  name?: string
  title?: string | null
  children?: LayoutNode[]
  [key: string]: unknown
}

const DATATYPE_LAYOUT = 'layout'
const DATATYPE_DATA = 'data'
const FIELDTYPE_LOCALIZED_FIELDS = 'localizedfields'

/**
 * Walks the data-object layout tree and returns ONLY the descendant nodes that
 * are `localizedfields` data nodes. Layout containers (panel / tabpanel /
 * region / fieldset / accordion) are recursed into; non-localized data leaves
 * (input, numeric, block, ...) are dropped.
 *
 * The returned nodes preserve their original `children` so the regular
 * `<ObjectComponent>` renderer can render them as-is inside a per-column
 * `<LocalizedFieldsProvider>`.
 */
export const processLayoutData = (
  layout: DataObjectGetLayoutByIdApiResponse | LayoutNode | undefined
): LayoutNode[] => {
  if (layout === undefined || layout === null) {
    return []
  }

  return collectLocalizedFields((layout as LayoutNode).children ?? [])
}

const collectLocalizedFields = (nodes: LayoutNode[]): LayoutNode[] => {
  const result: LayoutNode[] = []

  for (const node of nodes) {
    if (node.datatype === DATATYPE_LAYOUT) {
      result.push(...collectLocalizedFields(node.children ?? []))
      continue
    }

    if (node.datatype === DATATYPE_DATA && node.fieldtype === FIELDTYPE_LOCALIZED_FIELDS) {
      result.push(node)
    }
  }

  return result
}
