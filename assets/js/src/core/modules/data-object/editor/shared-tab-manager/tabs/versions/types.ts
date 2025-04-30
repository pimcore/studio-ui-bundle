/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { Layout } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import type { DataObjectVersion } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice.gen'
import { type DynamicTypeObjectDataRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-registry'

export enum DATATYPE_LIST {
  LAYOUT = 'layout',
  DATA = 'data'
}

export interface ILayoutItem {
  type: string
  data: any
}

export interface IGetFormattedDataStructureProps {
  objectId: number
  layout: Layout['children']
  versionData: DataObjectVersion
  versionId: number
  versionCount: number
  objectDataRegistry: DynamicTypeObjectDataRegistry
  layoutsList: ILayoutItem[]
  setLayoutsList: (layout: ILayoutItem[]) => void
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
  layoutsList: ILayoutItem[]
  setLayoutsList: (layout: ILayoutItem[]) => void
}

export interface IFieldCollectionValue {
  type: string
  data: object
}
