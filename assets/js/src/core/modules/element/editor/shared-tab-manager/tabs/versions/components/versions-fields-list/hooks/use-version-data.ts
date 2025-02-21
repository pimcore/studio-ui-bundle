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

import { useMemo } from 'react'
import { isEqual, isEmpty } from 'lodash'
import { getAssetCategoriesList } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-fields-list/helpers/assetCategoriesHelper'
import { getObjectBreadcrumbsList } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-fields-list/helpers/objectBreadcrumbsHelper'
import {
  type CategoriesList,
  type IAssetVersionField,
  type IAssetVersionsFieldsList,
  type IObjectVersionField,
  type IObjectVersionsFieldsList,
  type IVersionsFieldsList,
  type VersionKeysList
} from '../types'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { ElementTypeName } from '@Pimcore/constants/global'
import { COMPLEX_DATA_OBJECT_TYPES, type DynamicTypesList } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/constants/typesList'

interface IUseVersionDataReturn {
  versionKeysList: VersionKeysList
  comparisonModifiedData: IAssetVersionField[] | IObjectVersionField[]
  sectionsList?: CategoriesList
}

export const useVersionData = (data: IVersionsFieldsList['data'], elementType: ElementType): IUseVersionDataReturn => {
  const versionKeysList = Object.keys(data[0]).filter(key => key.startsWith('Version'))

  const compareComplexVersions = (v1: object, v2: object): {
    resultV1: object
    resultV2: object
  } => {
    const resultV1 = {}
    const resultV2 = {}

    const allFieldKeys = new Set([
      ...Object.keys(v1),
      ...(!isEmpty(v2) ? Object.keys(v2) : [])
    ])

    allFieldKeys.forEach(key => {
      if (JSON.stringify(v1?.[key]) !== JSON.stringify(v2?.[key])) {
        if (!isEmpty(v1?.[key])) resultV1[key] = v1[key]
        if (!isEmpty(v2?.[key])) resultV2[key] = v2[key]
      }
    })

    return { resultV1, resultV2 }
  }

  const comparisonModifiedData = data
    .filter(item => !isEqual(item[versionKeysList[0]], item[versionKeysList[1]]))
    .map((item: IObjectVersionField) => {
      const updatedItem = {
        isModifiedValue: true,
        ...item
      }

      if (COMPLEX_DATA_OBJECT_TYPES.includes(item.Field.fieldtype as DynamicTypesList)) {
        const v1: object = item[versionKeysList[0]]
        const v2: object = item[versionKeysList[1]]

        const { resultV1, resultV2 } = compareComplexVersions(v1, v2)

        return {
          ...updatedItem,
          [versionKeysList[0]]: resultV1,
          [versionKeysList[1]]: resultV2
        }
      }

      return {
        ...updatedItem
      }
    })

  const sectionsList = useMemo(() => {
    if (elementType === ElementTypeName.ASSET) {
      return getAssetCategoriesList(data as IAssetVersionsFieldsList['data'])
    }

    if (elementType === ElementTypeName.DATA_OBJECT) {
      return getObjectBreadcrumbsList(data as IObjectVersionsFieldsList['data'])
    }
  }, [data])

  return {
    versionKeysList,
    comparisonModifiedData: comparisonModifiedData as IUseVersionDataReturn['comparisonModifiedData'],
    sectionsList
  }
}
