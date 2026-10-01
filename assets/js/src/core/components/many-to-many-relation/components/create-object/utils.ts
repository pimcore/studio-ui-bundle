/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ManyToManyRelationValueItem } from '../../hooks/use-value'

interface CreatedObject {
  id: number
  key: string
  className: string
  parentPath: string
}

/**
 * Row for an object that was just created from the relation toolbar.
 *
 * The add endpoint returns only the new id, so the remaining columns are composed from what
 * the form already knows. A newly added object is always unpublished. The path is the parent
 * path plus the key the user typed; if the backend sanitises that key the row shows the
 * pre-sanitised path until the editor is reloaded.
 */
export const buildCreatedRelationItem = ({ id, key, className, parentPath }: CreatedObject): ManyToManyRelationValueItem => {
  const basePath = parentPath.endsWith('/') ? parentPath : `${parentPath}/`

  return {
    id,
    type: 'object',
    subtype: className,
    fullPath: `${basePath}${key}`,
    isPublished: false
  }
}
