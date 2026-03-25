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
 *  @example
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
 * @example
 * createGenericTestId('123', { prefix: 'tree-node', elementType: 'asset' })
 * // Returns: 'tree-node-asset-123'
 */
export const createGenericTestId = (
  base: string | number,
  options: {
    prefix?: string
    suffix?: string
    elementType?: string
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
 * @example
 * createNodeTestId(123, 'document')
 * // Returns: 'tree-node-document-123'
 */
export const createNodeTestId = (id: number | string, elementType?: string): string => {
  return createGenericTestId(id, {
    prefix: 'tree-node',
    elementType
  })
}

/**
 * Creates a test ID for border buttons that open tree widgets.
 * Uses a priority system: nodeId > elementType+name > name > fallback.
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

export const createTableCellTestId = (rowIdentifier: number | string, columnId: string): string => {
  return buildTestId(['cell', rowIdentifier, columnId])
}

export const createContextMenuContainerTestId = (elementType: ElementType, nodeId: number | string): string => {
  return buildTestId(['context-menu', elementType, String(nodeId)])
}

export const createContextMenuItemTestId = (key: string): string => {
  return buildTestId(['context-menu-item', key])
}

/**
 * Creates a test ID for modal buttons (form modals, confirmation modals, etc.).
 *
 * @example
 * createModalButtonTestId('ok')
 * // Returns: 'modal-ok-button'
 *
 * createModalButtonTestId('ok', 'form')
 * // Returns: 'form-modal-ok-button'
 *
 * createModalButtonTestId('cancel', 'confirmation')
 * // Returns: 'confirmation-modal-cancel-button'
 */
export const createModalButtonTestId = (buttonType: string, modalType?: string): string => {
  if (modalType !== undefined && modalType !== '') {
    return buildTestId([modalType, 'modal', buttonType, 'button'])
  }
  return buildTestId(['modal', buttonType, 'button'])
}
