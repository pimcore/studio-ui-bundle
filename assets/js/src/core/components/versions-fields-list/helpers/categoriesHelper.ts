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

import { isUndefined } from 'lodash'
import { type IVersionsFieldsList } from '../types'
import { VersionCategoryName } from '@Pimcore/constants/versionConstants'

export const getCategoriesList = (data: IVersionsFieldsList['data']): Array<{ key: string, fieldKeys: string[] }> => {
  const categoryMap: Record<string, Set<string>> = {}

  const getCategoryName = (value: string): string | undefined => {
    if (value.includes('.')) {
      return value.split('.')[0]
    }
  }

  data.forEach(item => {
    const categoryNameValue = getCategoryName(item.Field.key)
    const categoryName: string = categoryNameValue ?? VersionCategoryName.BASE_DATA

    if (isUndefined(categoryMap[categoryName])) {
      categoryMap[categoryName] = new Set()
    }

    categoryMap[categoryName].add(item.Field.key)
  })

  return Object.entries(categoryMap).map(([key, fieldKeysSet]) => ({
    key,
    fieldKeys: Array.from(fieldKeysSet)
  }))
}
