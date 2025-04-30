/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export interface AdvancedManyToManyRelationValueItem {
  element: {
    id: number
    type: string
    subtype: string | null
    fullPath: string
    isPublished: boolean | null
  }
  fieldName: string
  columns: string[] | null
  data: Record<string, any> | null
}

export type AdvancedManyToManyRelationValue = AdvancedManyToManyRelationValueItem[]
