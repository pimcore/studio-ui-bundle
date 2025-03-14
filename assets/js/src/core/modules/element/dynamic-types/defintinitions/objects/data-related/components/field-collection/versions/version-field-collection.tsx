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

import React, { useEffect, useState } from 'react'
import { filter, isEmpty } from 'lodash'
import { Content } from '@Pimcore/components/content/content'
import { CollapseItem } from '@Pimcore/components/collapse/item/collapse-item'
import { DataComponent } from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/components/data-component/data-component'
import { type AbstractObjectDataDefinition } from '../../../dynamic-type-object-data-abstract'
import { type AbstractObjectLayoutDefinition } from '../../../../layout-related/dynamic-type-object-layout-abstract'
import { useFieldCollection } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/field-collection/providers/use-field-collection'
import { DATATYPE_LIST } from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/types'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { getBreadcrumbTitle } from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/details-functions'
import { Space } from '@Pimcore/components/space/space'
import { type FieldCollectionLayoutDefinition } from '@Pimcore/modules/class-definition/class-definition-slice.gen'

export interface VersionFieldCollectionProps extends AbstractObjectDataDefinition {
  children?: AbstractObjectLayoutDefinition | AbstractObjectDataDefinition
  fieldBreadcrumbTitle: string
}

interface IList {
  key: string
  breadcrumbTitle: string
  renderList: React.JSX.Element[]
}

export const VersionFieldCollection = ({ value, fieldBreadcrumbTitle }: VersionFieldCollectionProps): React.JSX.Element => {
  const fieldCollection = useFieldCollection()
  const [fieldCollectionGroups, setFieldCollectionGroups] = useState<IList[]>([])

  const layoutDefinition: FieldCollectionLayoutDefinition[] = fieldCollection?.data?.items
  let currentFieldCollectionSection: string = ''

  const handleFieldCollectionData = ({ data, breadcrumbTitle = fieldBreadcrumbTitle }: { data: FieldCollectionLayoutDefinition[], breadcrumbTitle?: string }): IList[] => {
    const tempFieldCollectionGroups: IList[] = []

    const checkExistingGroupByKey = (key: string): IList | undefined => tempFieldCollectionGroups.find(group => group.key === key)

    const processData = (data: any, breadcrumbTitle: string): void => {
      data?.forEach((dataItem: any, dataIndex: number) => {
        if (!isEmptyValue(dataItem.key)) currentFieldCollectionSection = dataItem.key ?? ''

        const breadcrumbTitleValue = getBreadcrumbTitle(breadcrumbTitle, dataItem.title as string)

        if (dataItem.datatype === DATATYPE_LIST.LAYOUT) {
          processData(dataItem.children, breadcrumbTitleValue)
        }

        if (dataItem.datatype === DATATYPE_LIST.DATA) {
          const filteredObject = filter(value, { type: currentFieldCollectionSection })
          const fieldValue = filteredObject[0]?.data?.[dataItem?.name]
          const existingGroup = checkExistingGroupByKey(currentFieldCollectionSection)

          const element = (
            <DataComponent
              key={ `${dataIndex}-${dataItem.name}-${currentFieldCollectionSection}` }
              value={ fieldValue }
              { ...dataItem }
            />
          )

          if (isEmpty(existingGroup)) {
            tempFieldCollectionGroups.push({
              key: currentFieldCollectionSection,
              breadcrumbTitle,
              renderList: [element]
            })
          } else {
            existingGroup.renderList.push(element)
          }
        }
      })
    }

    processData(data, breadcrumbTitle)

    return tempFieldCollectionGroups
  }

  useEffect(() => {
    if (!isEmpty(fieldCollection) && !isEmpty(value)) {
      const groups: IList[] = handleFieldCollectionData({ data: layoutDefinition })

      setFieldCollectionGroups(groups)
    }
  }, [fieldCollection, value])

  if (value === null || fieldCollection === null) {
    return <></>
  }

  if (fieldCollection?.isLoading === true) {
    return <Content loading />
  }

  return (
    <Space
      className="w-full"
      direction="vertical"
      size="mini"
    >
      {fieldCollectionGroups?.map((groupItem: IList, groupIndex: number) => (
        <CollapseItem
          defaultActive
          key={ `${groupItem.key}-${groupIndex}` }
          label={ `${groupItem.breadcrumbTitle} / Inner Section ${groupIndex + 1}: ${groupItem.key}` }
        >
          {groupItem.renderList?.map(item => item)}
        </CollapseItem>
      ))}
    </Space>
  )
}
