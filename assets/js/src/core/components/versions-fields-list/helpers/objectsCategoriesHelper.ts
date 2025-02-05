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

import { map, filter, intersection, isEmpty, isUndefined } from 'lodash'
import { VersionCategoryName } from '@Pimcore/constants/versionConstants'
import { type CategoriesList, type IVersionsFieldsList } from '../types'

export const getObjectCategoriesList = (data: IVersionsFieldsList['data']): CategoriesList => {
  const categoryMap: Partial<Record<VersionCategoryName, Set<string>>> = {}

  data.forEach(item => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const categoryName: VersionCategoryName = item.Field.categoryName ?? VersionCategoryName.BASE_DATA

    if (isUndefined(categoryMap[categoryName])) {
      categoryMap[categoryName] = new Set()
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    categoryMap[categoryName].add(item.Field.name)
  })

  return Object.entries(categoryMap).map(([key, fieldKeysSet]) => ({
    key: key as VersionCategoryName,
    fieldKeys: Array.from(fieldKeysSet)
  }))
}

export const getObjectCategoriesListWithFields = ({ versionViewData, categoriesList }: { versionViewData: IVersionsFieldsList['data'], categoriesList?: CategoriesList }): CategoriesList => {
  // get all version field keys
  const versionFieldKeys = map(versionViewData, 'Field.name')

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
