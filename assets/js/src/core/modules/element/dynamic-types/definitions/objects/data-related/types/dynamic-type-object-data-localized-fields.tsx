/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { get, isEmpty, isPlainObject } from 'lodash'
import { DynamicTypeObjectDataAbstract, type AbstractObjectDataDefinition } from '../dynamic-type-object-data-abstract'
import { ObjectLocalizedFields } from '../../../../defintinitions/objects/data-related/components/localized-fields/object-localized-fields'
import { DynamicTypesList } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/constants/typesList'
import {
  type IFormattedDataStructureData,
  type IProcessVersionFieldDataProps
} from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/types'
import { VersionObjectLocalizedFields } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/localized-fields/versions/version-object-localized-fields'
import { isEmptyValue } from '@Pimcore/utils/type-utils'

export class DynamicTypeObjectDataLocalizedFields extends DynamicTypeObjectDataAbstract {
  id: string = DynamicTypesList.LOCALIZED_FIELDS
  isCollectionType: boolean = true

  getObjectDataComponent (props: AbstractObjectDataDefinition & { children?: any[] }): React.ReactElement<AbstractObjectDataDefinition> {
    return <ObjectLocalizedFields { ...props } />
  }

  getVersionObjectDataComponent (props: AbstractObjectDataDefinition & { children?: any[] }): React.ReactElement<AbstractObjectDataDefinition> {
    return <VersionObjectLocalizedFields { ...props } />
  }

  /**
   * The localizedfields payload has a fixed three-level structure:
   *   { [fieldName]: { [locale]: value } }
   *
   * Two merges are needed to avoid losing tracked changes:
   *   1. Field-name level  — so editing "name" does not drop a previously tracked "title"
   *   2. Locale level      — so editing "name.en" does not drop a previously tracked "name.de"
   *
   * The actual field values (level 3) are always scalars or arrays and must replace,
   * never merge — so recursion stops there.
   */
  mergeChangedValues = (current: any, incoming: any): any => {
    const currentRecord = isPlainObject(current) ? current : {}

    if (!isPlainObject(incoming)) {
      console.error('localizedfields mergeChangedValues received invalid payload:', incoming)
      return currentRecord
    }

    const incomingRecord = incoming as Record<string, any>
    const result: Record<string, any> = { ...currentRecord }

    for (const [fieldName, incomingLocales] of Object.entries(incomingRecord)) {
      const currentLocales = currentRecord[fieldName]
      if (isPlainObject(incomingLocales) && isPlainObject(currentLocales)) {
        // Merge locale keys; actual values (scalars/arrays) replace wholesale
        result[fieldName] = { ...currentLocales, ...incomingLocales }
      } else {
        result[fieldName] = incomingLocales
      }
    }
    return result
  }

  async processVersionFieldData (props: IProcessVersionFieldDataProps): Promise<IFormattedDataStructureData[]> {
    const { item, fieldValueByName, fieldPath, fieldBreadcrumbTitle, versionId, versionCount } = props

    const getFieldData = ({ fieldData, fieldValue, fieldPathValue }: { fieldData: any, fieldValue: any, fieldPathValue: string }): IFormattedDataStructureData => {
      return {
        fieldBreadcrumbTitle,
        versionId,
        versionCount,
        fieldData,
        fieldValue,
        fieldPath: fieldPathValue
      }
    }

    return item?.children?.flatMap((item: any) => {
      const fieldValue: object = get(fieldValueByName, item.name)

      if (isEmpty(fieldValue)) {
        const getFieldPathValue = isEmptyValue(fieldPath) ? item.name : `${fieldPath}.${item.name}`

        return getFieldData({ fieldData: { ...item }, fieldValue, fieldPathValue: getFieldPathValue })
      }

      return Object.entries(fieldValue).map(([key, value]) => {
        const getFieldPathValue = isEmptyValue(fieldPath) ? item.name : `${fieldPath}.${item.name}.${key}`

        return getFieldData({ fieldData: { ...item, locale: key }, fieldValue: value, fieldPathValue: getFieldPathValue })
      })
    })
  }
}
