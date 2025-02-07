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
import { isEqual } from 'lodash'
import { getAssetCategoriesList } from '@Pimcore/components/versions-fields-list/helpers/assetCategoriesHelper'
import { getObjectBreadcrumbsList } from '@Pimcore/components/versions-fields-list/helpers/objectBreadcrumbsHelper'
import {
  type CategoriesList,
  type IAssetVersionField,
  type IAssetVersionsFieldsList,
  type IObjectVersionField,
  type IObjectVersionsFieldsList,
  type IVersionsFieldsList,
  type VersionKeysList
} from '../types'
import { type ElementType } from '../../../../../types/element-type.d'
import { ElementTypeName } from '@Pimcore/constants/global'

interface IUseAssetVersionDataReturn {
  versionKeysList: VersionKeysList
  comparisonModifiedData: IAssetVersionField[] | IObjectVersionField[]
  sectionsList?: CategoriesList
}

export const useVersionData = (data: IVersionsFieldsList['data'], elementType: ElementType): IUseAssetVersionDataReturn => {
  const versionKeysList = Object.keys(data[0]).filter(key => key.startsWith('Version'))

  const comparisonModifiedData = data.filter((item) => {
    return !isEqual(item[versionKeysList[0]], item[versionKeysList[1]])
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
    comparisonModifiedData: comparisonModifiedData as IUseAssetVersionDataReturn['comparisonModifiedData'],
    sectionsList
  }
}
