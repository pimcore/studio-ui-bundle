/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ElementType } from '@Pimcore/types/enums/element/element-type'

/**
 * Creates a safe string for use in test IDs by removing special characters
 * and normalizing the format.
 */
export const createSafeTestIdString = (input: string | number): string => {
  return String(input).toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/(^-|-$)/g, '')
}

/**
 * Generic test ID builder that combines parts with separators.
 *
 * @param parts - Array of string/number parts to combine
 * @param separator - Separator to use between parts (default: '-')
 * @returns Formatted test ID string
 *
 * @example
 * buildTestId(['tree', 'node', 123, 'asset'])
 * // Returns: 'tree-node-123-asset'
 */
export const buildTestId = (parts: Array<string | number | undefined>, separator: string = '-'): string => {
  return parts
    .filter(part => part !== undefined && part !== null && part !== '')
    .map(createSafeTestIdString)
    .join(separator)
    .replace(new RegExp(`${separator}+`, 'g'), separator)
    .replace(new RegExp(`^${separator}|${separator}$`, 'g'), '')
}

/**
 * Creates a test ID with optional prefix and suffix.
 * More flexible version that can be used as base for specific generators.
 *
 * @param base - The base identifier
 * @param options - Configuration options
 * @returns Formatted test ID string
 *
 * @example
 * createGenericTestId('123', { prefix: 'tree-node', elementType: 'asset' })
 * // Returns: 'tree-node-asset-123'
 */
export const createGenericTestId = (
  base: string | number,
  options: {
    prefix?: string
    suffix?: string
    elementType?: ElementType
    separator?: string
  } = {}
): string => {
  const { prefix, suffix, elementType, separator = '-' } = options

  const parts = [
    prefix,
    elementType,
    base,
    suffix
  ]

  return buildTestId(parts, separator)
}

/**
 * Creates a test ID for tree nodes using node ID and element type.
 * Used for element tree components (assets, documents, data objects).
 *
 * @param id - The node ID (numeric)
 * @param elementType - Optional element type (asset, document, data-object)
 * @returns Formatted test ID string
 *
 * @example
 * createNodeTestId(123, 'document')
 * // Returns: 'tree-node-document-123'
 */
export const createNodeTestId = (id: number, elementType?: ElementType): string => {
  return createGenericTestId(id, {
    prefix: 'tree-node',
    elementType
  })
}

/**
 * Creates a test ID for border buttons that open tree widgets.
 * Uses a priority system: nodeId > elementType+name > name > fallback.
 *
 * @param nodeId - Optional unique node identifier
 * @param nodeName - Optional node name
 * @param elementType - Optional element type
 * @returns Formatted test ID string
 *
 * @example
 * createBorderTestId('asset-tree-123', 'Main Tree', 'asset')
 * // Returns: 'border-button-asset-tree-123'
 *
 * createBorderTestId(undefined, 'Main Tree', 'asset')
 * // Returns: 'border-button-asset-main-tree'
 */
export const createBorderTestId = (nodeId?: string, nodeName?: string, elementType?: string): string => {
  if (nodeId != null && nodeId !== '') {
    return buildTestId(['border-button', nodeId])
  }

  if (nodeName != null && nodeName !== '' && elementType != null && elementType !== '') {
    return buildTestId(['border-button', elementType, nodeName])
  }

  if (nodeName != null && nodeName !== '') {
    return buildTestId(['border-button', nodeName])
  }

  return 'border-button'
}

/**
 * Creates a test ID for element trees with underscore to dash replacement.
 * Falls back to 'element-tree' when treeId is empty.
 *
 * @param treeId - The tree identifier (may contain underscores)
 * @returns Formatted test ID string
 *
 * @example
 * createTreeTestId('data_object')
 * // Returns: 'element-tree-data-object'
 *
 * createTreeTestId('')
 * // Returns: 'element-tree'
 */
export const createTreeTestId = (treeId: string): string => {
  if (treeId != null && treeId !== '') {
    const sanitizedTreeId = treeId.replace(/_/g, '-')
    return buildTestId(['element-tree', sanitizedTreeId])
  }
  return 'element-tree'
}

/**
 * Creates a test ID for tab titles with element information when available.
 * Prioritizes element type and ID for specificity, falls back to title.
 *
 * @param title - The tab title text
 * @param elementId - Optional element ID
 * @param elementType - Optional element type string
 * @returns Formatted test ID string
 *
 * @example
 * createTabTitleTestId('My Asset', 123, 'asset')
 * // Returns: 'tab-title-asset-123'
 *
 * createTabTitleTestId('My Widget')
 * // Returns: 'tab-title-my-widget'
 */
export const createTabTitleTestId = (title: string, elementId?: number | string, elementType?: string): string => {
  if (elementType != null && elementType !== '' && elementId != null && elementId !== '') {
    return createGenericTestId(elementId, {
      prefix: 'tab-title',
      elementType: elementType as ElementType
    })
  }

  return createGenericTestId(title, {
    prefix: 'tab-title'
  })
}

/**
 * Creates a test ID for tree nodes with ID and type.
 * Generic function that can be used for user management, tag management, and other tree components.
 *
 * @param id - The node ID (user, role, tag, etc.)
 * @param type - The node type ('user', 'role', 'folder', 'tag', etc.)
 * @returns Formatted test ID string
 *
 * @example
 * createTreeNodeTestId(123, 'user')
 * // Returns: 'tree-node-user-123'
 *
 * createTreeNodeTestId(456, 'role')
 * // Returns: 'tree-node-role-456'
 *
 * createTreeNodeTestId(789, 'tag')
 * // Returns: 'tree-node-tag-789'
 */
export const createTreeNodeTestId = (id: number | string, type: string): string => {
  return createGenericTestId(id, {
    prefix: 'tree-node',
    elementType: type as ElementType
  })
}

/**
 * Creates a test ID for tab content areas.
 * Generic function that can be used for any tab panel content.
 *
 * @param context - The context identifier (user-id, asset-id, etc.)
 * @param options - Configuration options
 * @param options.prefix - Prefix for the test ID (default: 'tab-content')
 * @param options.tabKey - Optional tab key for specific tab content identification
 * @returns Formatted test ID string
 *
 * @example
 * createTabContentTestId(123, { prefix: 'user-tab' })
 * // Returns: 'user-tab-content-123'
 *
 * createTabContentTestId(456, { prefix: 'asset-detail', tabKey: 'properties' })
 * // Returns: 'asset-detail-content-properties-456'
 *
 * createTabContentTestId('settings', { prefix: 'user-detail', tabKey: 'workspaces' })
 * // Returns: 'user-detail-content-workspaces-settings'
 */
export const createTabContentTestId = (
  context: number | string,
  options: {
    prefix?: string
    tabKey?: string
  } = {}
): string => {
  const { prefix = 'tab', tabKey } = options

  if (tabKey !== undefined) {
    return buildTestId([prefix, 'content', tabKey, context])
  }
  return buildTestId([prefix, 'content', context])
}

/**
 * Creates a test ID for table containers.
 * Used to identify different types of tables.
 *
 * @param tableType - The type of table (documents, assets, data-objects, etc.)
 * @returns Formatted test ID string
 *
 * @example
 * createTableTestId('documents')
 * // Returns: 'table-documents'
 *
 * createTableTestId('user-workspaces-assets')
 * // Returns: 'table-user-workspaces-assets'
 */
export const createTableTestId = (tableType: string): string => {
  return buildTestId(['table', tableType])
}

/**
 * Creates a test ID for table rows.
 * Uses just the row index for identification.
 *
 * @param rowIdentifier - Row index (number) or row ID (string)
 * @returns Formatted test ID string
 *
 * @example
 * createTableRowTestId(0)
 * // Returns: 'row-0'
 *
 * createTableRowTestId('asset-123')
 * // Returns: 'row-asset-123'
 */
export const createTableRowTestId = (rowIdentifier: number | string): string => {
  return buildTestId(['row', rowIdentifier])
}

/**
 * Creates a test ID for table cells.
 * Combines row identifier and column ID.
 *
 * @param rowIdentifier - Row index (number) or row ID (string)
 * @param columnId - Column identifier
 * @returns Formatted test ID string
 *
 * @example
 * createTableCellTestId(0, 'cpath')
 * // Returns: 'cell-0-cpath'
 *
 * createTableCellTestId('asset-123', 'permissions')
 * // Returns: 'cell-asset-123-permissions'
 */
export const createTableCellTestId = (rowIdentifier: number | string, columnId: string): string => {
  return buildTestId(['cell', rowIdentifier, columnId])
}
