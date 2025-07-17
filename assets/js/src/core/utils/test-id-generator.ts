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
export const createSafeTestIdString = (input: string): string => {
  return input.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
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
 * // Returns: 'document-node-123'
 */
export const createNodeTestId = (id: number, elementType?: ElementType): string => {
  const safeId = id.toString()
  const prefix = elementType ? `${elementType}-` : ''
  return `tree-node-${prefix}${safeId}`.replace(/-+/g, '-')
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
  if (nodeId) {
    return `border-button-${createSafeTestIdString(nodeId)}`
  }
  
  if (nodeName && elementType) {
    const safeName = createSafeTestIdString(nodeName)
    const safeType = createSafeTestIdString(elementType)
    return `border-button-${safeType}-${safeName}`
  }
  
  if (nodeName) {
    const safeName = createSafeTestIdString(nodeName)
    return `border-button-${safeName}`
  }
  
  return 'border-button'
}

/**
 * Creates a test ID for navigation items based on their path.
 * Used for main navigation menu items.
 * 
 * @param path - The navigation path (e.g., 'File/Assets')
 * @returns Formatted test ID string
 * 
 * @example
 * createNavTestId('File/Assets')
 * // Returns: 'file-assets'
 * 
 * createNavTestId('Settings/Users & Groups')
 * // Returns: 'settings-users-groups'
 */
export const createNavTestId = (path: string): string => {
  return createSafeTestIdString(path)
}

/**
 * Creates a test ID for general UI components with optional prefix and suffix.
 * Provides a consistent way to generate test IDs across the application.
 * 
 * @param base - The base identifier
 * @param prefix - Optional prefix
 * @param suffix - Optional suffix
 * @returns Formatted test ID string
 * 
 * @example
 * createTestId('user-profile', 'modal', 'close-btn')
 * // Returns: 'modal-user-profile-close-btn'
 */
export const createTestId = (base: string, prefix?: string, suffix?: string): string => {
  const safeBase = createSafeTestIdString(base)
  const parts = [prefix, safeBase, suffix].filter(Boolean).map(createSafeTestIdString)
  return parts.join('-')
}
