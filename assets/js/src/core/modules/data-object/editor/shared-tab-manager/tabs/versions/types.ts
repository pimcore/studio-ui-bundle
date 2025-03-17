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

import type { Layout } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import type { DataObjectVersion } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice.gen'
import type { DynamicTypeObjectDataRegistry } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/dynamic-type-object-data-registry'

export enum DATATYPE_LIST {
  LAYOUT = 'layout',
  DATA = 'data'
}

export interface IGetFormattedDataStructureProps {
  objectId: number
  layout: Layout['children']
  versionData: DataObjectVersion
  versionId: number
  versionCount: number
  objectDataRegistry: DynamicTypeObjectDataRegistry
}

export interface IFormattedDataStructureData {
  fieldBreadcrumbTitle: string
  fieldData: Layout
  fieldValue: any
  versionCount: number
  versionId: number
}

export interface IProcessVersionFieldDataProps {
  objectId: number
  item: any
  fieldBreadcrumbTitle: string
  fieldValueByName: any[]
  versionId: number
  versionCount: number
}

export interface IFieldCollectionValue {
  type: string
  data: object
}
