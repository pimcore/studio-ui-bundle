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
import { getCategoriesList } from '@Pimcore/components/versions-fields-list/helpers/categoriesHelper'
import { getObjectCategoriesList } from '@Pimcore/components/versions-fields-list/helpers/objectsCategoriesHelper'
import { type CategoriesList, type IVersionsFieldsList, type VersionKeysList } from '../types'
import { type ElementType } from '../../../../../types/element-type.d'

interface IUseAssetVersionDataReturn {
  versionKeysList: VersionKeysList
  comparisonModifiedData: IVersionsFieldsList['data']
  categoriesList: CategoriesList
}

export const useAssetVersionData = (data: IVersionsFieldsList['data'], elementType: ElementType): IUseAssetVersionDataReturn => {
  const versionKeysList = Object.keys(data[0]).filter(key => key.startsWith('Version'))

  const comparisonModifiedData = data.filter((item) => {
    return !isEqual(item[versionKeysList[0]], item[versionKeysList[1]])
  })

  const categoriesList = useMemo(() => {
    return elementType === 'asset' ? getCategoriesList(data) : getObjectCategoriesList(data)
  }, [data])

  return {
    versionKeysList,
    comparisonModifiedData,
    categoriesList
  }
}
