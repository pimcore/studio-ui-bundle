/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import {
  type AdvancedManyToManyRelationValue,
  type AdvancedManyToManyRelationValueItem
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/relations/types/advanced-many-to-many-relation'
import {
  type ManyToManyRelationValue,
  type ManyToManyRelationValueItem
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/many-to-many-relation/hooks/use-value'
import {
  EDITABLE_COLUMN_PREFIX
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/relations/hooks/use-convert-relation-editable-columns'

export const convertToManyToManyRelationValue = (value?: AdvancedManyToManyRelationValue | null): ManyToManyRelationValue | null => {
  if (value === undefined || value === null) {
    return null
  }
  return value.map((item) => {
    return convertToManyToManyRelationValueItem(item)
  })
}

export const convertToManyToManyRelationValueItem = (value: AdvancedManyToManyRelationValueItem): ManyToManyRelationValueItem & Record<string, any> => {
  const editableData: Record<string, any> = {}
  if (value.data !== undefined) {
    for (const key in value.data) {
      editableData[EDITABLE_COLUMN_PREFIX + key] = value.data[key]
    }
  }
  return {
    id: value.element.id,
    type: value.element.type,
    subtype: value.element.subtype,
    isPublished: value.element.isPublished,
    fullPath: value.element.fullPath,
    ...editableData
  }
}
