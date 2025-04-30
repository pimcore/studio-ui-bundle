/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type VersionCategoryName } from '@Pimcore/constants/versionConstants'

export type VersionKeysList = string[]

export type CategoriesList = Array<{ key: VersionCategoryName, fieldKeys: string[] }>

export interface IAssetVersionField {
  Field: {
    field: string
    key: string
    name: string
    language?: string
  }
  [key: string]: any
}

export interface IAssetVersionsFieldsList {
  data: IAssetVersionField[]
}

export interface IObjectVersionField {
  Field: {
    fieldBreadcrumbTitle: string
    [key: string]: any
  }
  [key: string]: any
}

export interface IObjectVersionsFieldsList {
  data: IObjectVersionField[]
}

export interface IVersionsFieldsList {
  data: IAssetVersionField[] | IObjectVersionField[]
}
