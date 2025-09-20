/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * List of property keys that should be hidden from the properties tab for document elements.
 * These properties are managed by other parts of the system and should not be directly
 * editable in the properties table.
 */
const DOCUMENT_DISALLOWED_PROPERTY_KEYS = [
  'language',
  'navigation_exclude',
  'navigation_name',
  'navigation_title',
  'navigation_relation',
  'navigation_parameters',
  'navigation_anchor',
  'navigation_target',
  'navigation_class',
  'navigation_tabindex',
  'navigation_accesskey'
] as const

type DocumentDisallowedPropertyKey = typeof DOCUMENT_DISALLOWED_PROPERTY_KEYS[number]

/**
 * Checks if a property key is disallowed for the given element type
 */
export const isDisallowedPropertyKey = (key: string, elementType: string): key is DocumentDisallowedPropertyKey => {
  if (elementType === 'document') {
    return DOCUMENT_DISALLOWED_PROPERTY_KEYS.includes(key as DocumentDisallowedPropertyKey)
  }
  return false
}
