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

import React from 'react'
import { type AbstractObjectDataDefinition } from '../../dynamic-type-object-data-abstract'
import { type AbstractObjectLayoutDefinition } from '../../../layout-related/dynamic-type-object-layout-abstract'
import {
  useFieldCollection
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/field-collection/providers/use-field-collection'
import { Content } from '@Pimcore/components/content/content'
import { DATATYPE_LIST } from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/types'
import {
  DataComponent
} from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/components/data-component/data-component'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { filter } from 'lodash'

export interface FieldCollectionProps extends AbstractObjectDataDefinition {
  children?: AbstractObjectLayoutDefinition | AbstractObjectDataDefinition
  allowedTypes: string[]
  border?: boolean
  collapsed?: boolean
  disallowReorder?: boolean
  disallowAddRemove?: boolean
  maxItems?: number
}

export const VersionFieldCollection = ({ border = false, disallowAddRemove, value, ...props }: FieldCollectionProps): React.JSX.Element => {
  const fieldCollection = useFieldCollection()

  if (value === null || fieldCollection === null) {
    return <></>
  }

  const { data, isLoading } = fieldCollection

  if (isLoading === true) {
    return <Content loading />
  }

  const layoutDefinition = data.items
  let currentFieldCollectionSection: null | string = null

  const processFieldCollectionData = ({ data }: { data: any }): React.JSX.Element => {
    return data?.map((dataItem: any, dataIndex: number) => {
      if (!isEmptyValue(dataItem.key)) currentFieldCollectionSection = dataItem.key

      if (dataItem.datatype === DATATYPE_LIST.LAYOUT) {
        return processFieldCollectionData({ data: dataItem.children })
      }

      if (dataItem.datatype === DATATYPE_LIST.DATA) {
        const filteredObject = filter(value, { type: currentFieldCollectionSection })
        const fieldValue = filteredObject[0]?.data?.[dataItem?.name]

        return (
          <DataComponent
            key={ dataIndex }
            value={ fieldValue }
            { ...dataItem }
          />
        )
      }

      return <></>
    })
  }

  return (
    <div>{processFieldCollectionData({ data: layoutDefinition })}</div>
  )
}
