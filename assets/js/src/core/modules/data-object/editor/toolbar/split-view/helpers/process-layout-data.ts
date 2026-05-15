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
  fieldBreadcrumbTitle?: string
  [key: string]: unknown
}

export interface LocalizedFieldSection {
  /** Hierarchical path of layout panel titles joined with '/', e.g. 'General Information/Content' */
  breadcrumbTitle: string
  nodes: LayoutNode[]
}

const DATATYPE_LAYOUT = 'layout'
const DATATYPE_DATA = 'data'
const FIELDTYPE_LOCALIZED_FIELDS = 'localizedfields'

/**
 * Walks the data-object layout tree and returns localizedfields nodes grouped
 * by their ancestor panel path (fieldBreadcrumbTitle), matching the object-merger pattern.
 *
 * Layout containers (panel / tabpanel / region / fieldset / accordion) are recursed
 * into while building the breadcrumb string from their `title` values joined with '/'.
 * Non-localized data leaves are dropped.
 */
export const processLayoutData = (
  layout: DataObjectGetLayoutByIdApiResponse | LayoutNode | undefined
): LocalizedFieldSection[] => {
  if (layout === undefined || layout === null) {
    return []
  }

  const flat = collectLocalizedFields((layout as LayoutNode).children ?? [], '')
  return groupByBreadcrumb(flat)
}

interface LocalizedFieldEntry {
  breadcrumbTitle: string
  node: LayoutNode
}

const collectLocalizedFields = (nodes: LayoutNode[], breadcrumb: string): LocalizedFieldEntry[] => {
  const result: LocalizedFieldEntry[] = []

  for (const node of nodes) {
    if (node.datatype === DATATYPE_LAYOUT) {
      const childBreadcrumb = buildBreadcrumb(breadcrumb, node.title ?? '')
      result.push(...collectLocalizedFields(node.children ?? [], childBreadcrumb))
      continue
    }

    if (node.datatype === DATATYPE_DATA && node.fieldtype === FIELDTYPE_LOCALIZED_FIELDS) {
      result.push({ breadcrumbTitle: breadcrumb, node: { ...node, fieldBreadcrumbTitle: breadcrumb } })
    }
  }

  return result
}

const buildBreadcrumb = (current: string, next: string | null | undefined): string => {
  const part = (next ?? '').trim()
  if (current === '') return part
  if (part === '') return current
  return `${current}/${part}`
}

const groupByBreadcrumb = (entries: LocalizedFieldEntry[]): LocalizedFieldSection[] => {
  const map = new Map<string, LayoutNode[]>()

  for (const { breadcrumbTitle, node } of entries) {
    const existing = map.get(breadcrumbTitle)
    if (existing !== undefined) {
      existing.push(node)
    } else {
      map.set(breadcrumbTitle, [node])
    }
  }

  return Array.from(map.entries()).map(([breadcrumbTitle, nodes]) => ({ breadcrumbTitle, nodes }))
}
