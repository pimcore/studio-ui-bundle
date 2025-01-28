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

import { getModifiedItems, getVersionKeysList } from '../helpers/dataHelper'
import { type CategoriesList, type IVersionsFieldsListProps } from '../types'
import { useMemo } from 'react'
import { getCategoriesList } from '@Pimcore/components/versions-fields-list/helpers/categoriesHelper'

interface IUseAssetVersionDataReturn {
  versionKeysList: string[]
  comparisonModifiedData: IVersionsFieldsListProps['data']
  categoriesList: CategoriesList
}

export const useAssetVersionData = (data: IVersionsFieldsListProps['data']): IUseAssetVersionDataReturn => {
  const versionKeysList = getVersionKeysList(data)

  const comparisonModifiedData = getModifiedItems(data, versionKeysList[0], versionKeysList[1])

  const categoriesList = useMemo(() => getCategoriesList(data), [data])

  return {
    versionKeysList,
    comparisonModifiedData,
    categoriesList
  }
}
