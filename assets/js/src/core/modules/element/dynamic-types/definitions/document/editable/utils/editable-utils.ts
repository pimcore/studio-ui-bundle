/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AbstractDocumentEditableDefinition } from '../dynamic-type-document-editable-abstract'

export interface EditableDefinition {
  name: string
  type: string
  data?: any
}

/**
 * Creates an object mapping editable names to their type and data for initialization
 * Works with both AbstractDocumentEditableDefinition and plain editable definition objects
 */
export const createEditableDataFromDefinitions = (
  editableDefinitions: AbstractDocumentEditableDefinition[] | EditableDefinition[]
): Record<string, { type: string; data: any }> => {
  return Object.fromEntries(
    editableDefinitions.map(editableDef => [
      editableDef.name,
      {
        type: editableDef.type,
        data: editableDef.data ?? null
      }
    ])
  )
}
