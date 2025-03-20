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
import { type CategoriesList, type IObjectVersionsFieldsList } from '../types'

const IGNORED_FIELDS = ['reverseObjectRelation']

export const getObjectBreadcrumbsList = (data: IObjectVersionsFieldsList['data']): CategoriesList => {
  const breadcrumbMap: Partial<Record<VersionCategoryName, Set<string>>> = {}

  data.forEach(item => {
    const breadcrumbName = item.Field.fieldBreadcrumbTitle ?? VersionCategoryName.SYSTEM_DATA

    if (IGNORED_FIELDS.includes(item.Field.fieldtype as string)) {
      return
    }

    if (isUndefined(breadcrumbMap[breadcrumbName])) {
      breadcrumbMap[breadcrumbName] = new Set()
    }

    breadcrumbMap[breadcrumbName].add(item.Field.name)
  })

  return Object.entries(breadcrumbMap).map(([key, fieldKeysSet]) => ({
    key: key as VersionCategoryName,
    fieldKeys: Array.from(fieldKeysSet)
  }))
}

export const getObjectBreadcrumbsListWithFields = ({ versionViewData, breadcrumbsList }: { versionViewData: IObjectVersionsFieldsList['data'], breadcrumbsList?: CategoriesList }): CategoriesList => {
  // get all version field keys
  const versionFieldKeys = map(versionViewData, 'Field.name')
  const versionFieldBreadcrumbs = map(versionViewData, 'Field.fieldBreadcrumbTitle')

  if (isEmpty(breadcrumbsList)) return []

  return filter(
    // map over list to update field with matching keys
    map(breadcrumbsList, breadcrumb => ({
      ...breadcrumb, // keep initial category properties
      fieldKeys: intersection(breadcrumb.fieldKeys, versionFieldKeys) // keep only matching keys
    })),
    breadcrumb => !isEmpty(breadcrumb.fieldKeys) && versionFieldBreadcrumbs.includes(breadcrumb.key) // include only categories with non-empty fieldKeys
  )
}
