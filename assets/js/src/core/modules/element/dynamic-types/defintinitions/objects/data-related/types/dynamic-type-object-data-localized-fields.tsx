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

import React from 'react'
import { get, isEmpty } from 'lodash'
import { DynamicTypeObjectDataAbstract } from '../dynamic-type-object-data-abstract'
import { LocalizedFields, type LocalizedFieldsProps } from '../components/localized-fields/localized-fields'
import { DynamicTypesList } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/constants/typesList'
import { type IFormattedDataStructureData } from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/details-functions'

export class DynamicTypeObjectDataLocalizedFields extends DynamicTypeObjectDataAbstract {
  id: string = DynamicTypesList.LOCALIZED_FIELDS
  isCollectionType: boolean = true

  getObjectDataComponent (props: LocalizedFieldsProps): React.ReactElement<LocalizedFieldsProps> {
    return <LocalizedFields { ...props } />
  }

  processVersionFieldData (props: {
    item: any
    fieldBreadcrumbTitle: string
    fieldValueByName: object
    versionId: number
    versionCount: number
  }): IFormattedDataStructureData[] {
    const { item, fieldValueByName, fieldBreadcrumbTitle, versionId, versionCount } = props

    const getFieldData = ({ fieldData, fieldValue }: { fieldData: any, fieldValue: any }): IFormattedDataStructureData => {
      return {
        fieldBreadcrumbTitle,
        versionId,
        versionCount,
        fieldData,
        fieldValue
      }
    }

    return item?.children?.flatMap((item: any) => {
      const fieldValue: object = get(fieldValueByName, item.name)

      if (isEmpty(fieldValue)) {
        return getFieldData({ fieldData: { ...item }, fieldValue })
      }

      return Object.entries(fieldValue).map(([key, value]) => {
        return getFieldData({ fieldData: { ...item, locale: key }, fieldValue: value })
      })
    })
  }
}
