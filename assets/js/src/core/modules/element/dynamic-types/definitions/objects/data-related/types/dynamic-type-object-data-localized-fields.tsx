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
import { get, isEmpty } from 'lodash'
import { DynamicTypeObjectDataAbstract, type AbstractObjectDataDefinition } from '../dynamic-type-object-data-abstract'
import { ObjectLocalizedFields } from '../../../../defintinitions/objects/data-related/components/localized-fields/object-localized-fields'
import { DynamicTypesList } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/constants/typesList'
import {
  type IFormattedDataStructureData,
  type IProcessVersionFieldDataProps
} from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/types'
import { VersionObjectLocalizedFields } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/localized-fields/versions/version-object-localized-fields'

export class DynamicTypeObjectDataLocalizedFields extends DynamicTypeObjectDataAbstract {
  id: string = DynamicTypesList.LOCALIZED_FIELDS
  isCollectionType: boolean = true

  getObjectDataComponent (props: AbstractObjectDataDefinition & { children?: any[] }): React.ReactElement<AbstractObjectDataDefinition> {
    return <ObjectLocalizedFields { ...props } />
  }

  getVersionObjectDataComponent (props: AbstractObjectDataDefinition & { children?: any[] }): React.ReactElement<AbstractObjectDataDefinition> {
    return <VersionObjectLocalizedFields { ...props } />
  }

  async processVersionFieldData (props: IProcessVersionFieldDataProps): Promise<IFormattedDataStructureData[]> {
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
