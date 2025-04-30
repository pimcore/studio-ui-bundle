/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { map, filter, intersection, isEmpty, isUndefined } from 'lodash'
import { VersionCategoryName } from '@Pimcore/constants/versionConstants'
import { type CategoriesList, type IAssetVersionsFieldsList } from '../types'

export const getAssetCategoriesList = (data: IAssetVersionsFieldsList['data']): CategoriesList => {
  const categoryMap: Partial<Record<VersionCategoryName, Set<string>>> = {}

  const getCategoryName = (value: string): VersionCategoryName | undefined => {
    if (value.includes('.')) {
      return value.split('.')[0] as VersionCategoryName
    }
  }

  data.forEach(item => {
    const categoryNameValue = getCategoryName(item.Field.key)
    const categoryName: VersionCategoryName = categoryNameValue ?? VersionCategoryName.SYSTEM_DATA

    if (isUndefined(categoryMap[categoryName])) {
      categoryMap[categoryName] = new Set()
    }

    categoryMap[categoryName].add(item.Field.key)
  })

  return Object.entries(categoryMap).map(([key, fieldKeysSet]) => ({
    key: key as VersionCategoryName,
    fieldKeys: Array.from(fieldKeysSet)
  }))
}

export const getAssetCategoriesListWithFields = ({ versionViewData, categoriesList }: { versionViewData: IAssetVersionsFieldsList['data'], categoriesList?: CategoriesList }): CategoriesList => {
  // get all version field keys
  const versionFieldKeys = map(versionViewData, 'Field.key')

  if (isEmpty(categoriesList)) return []

  return filter(
    // map over list to update field with matching keys
    map(categoriesList, category => ({
      ...category, // keep initial category properties
      fieldKeys: intersection(category.fieldKeys, versionFieldKeys) // keep only matching keys
    })),
    category => !isEmpty(category.fieldKeys) // include only categories with non-empty fieldKeys
  )
}
