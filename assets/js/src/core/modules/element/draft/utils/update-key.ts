/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

interface UpdatableEntity {
  path?: string
  fullPath?: string
  [key: string]: any
}

/**
 * Updates the key or filename of an entity and adjusts its path and fullPath accordingly.
 * @param entity - The entity to update (data object, asset, or document).
 * @param newValue - The new key or filename value.
 * @param keyField - The field name to update ('key' or 'filename').
 */
export function updateKeyOrFilename (entity: UpdatableEntity, newValue: string, keyField: 'key' | 'filename'): void {
  entity[keyField] = newValue

  if (entity.fullPath !== undefined) {
    const fullPathAsArray = entity.fullPath.split('/')
    fullPathAsArray[fullPathAsArray.length - 1] = newValue
    entity.fullPath = fullPathAsArray.join('/')
  }

  if (entity.path !== undefined) {
    const pathAsArray = entity.path.split('/')
    pathAsArray[pathAsArray.length - 1] = newValue
    entity.path = pathAsArray.join('/')
  }
}
