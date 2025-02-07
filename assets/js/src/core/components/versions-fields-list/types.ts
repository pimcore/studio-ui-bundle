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

import { type VersionCategoryName } from '@Pimcore/constants/versionConstants'

export type VersionKeysList = string[]

export type CategoriesList = Array<{ key: VersionCategoryName, fieldKeys: string[] }>

export interface IAssetVersionField {
  Field: { field: string, key: string, name: string }
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
