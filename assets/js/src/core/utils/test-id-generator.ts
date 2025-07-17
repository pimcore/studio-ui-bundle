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
    .filter(Boolean)
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
