/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type IRelationAllowedTypesClassDefinition } from './allowed-types'

/**
 * Inline search offers its options through a search on a single data object class,
 * so it can only represent a relation that is restricted to exactly that: objects of
 * one class, and nothing else. Any additional target — assets, documents or object
 * folders — would become unselectable, so those configurations keep the path
 * reference input, which can address every element type.
 *
 * Shared with the class definition editor, which disables the display mode for the
 * configurations rejected here instead of storing a setting that does nothing.
 *
 * The class definition editor watches values that are still `undefined` until their
 * switch is touched, hence the explicit boolean comparisons.
 */
export const supportsInlineSearch = (config: Partial<IRelationAllowedTypesClassDefinition>): boolean => {
  const classes = config.classes ?? []

  return config.objectsAllowed === true &&
    config.assetsAllowed !== true &&
    config.documentsAllowed !== true &&
    classes.length === 1 &&
    classes[0].classes !== 'folder'
}
