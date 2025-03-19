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
import { filter, isEmpty, isNull, isObject } from 'lodash'
import cn from 'classnames'
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
import { useStyles } from './version-field-collection.styles'
import { Text } from '@Pimcore/components/text/text'
import { Flex } from '@Pimcore/components/flex/flex'
import { DynamicTypesList } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/constants/typesList'

export interface VersionFieldCollectionProps extends AbstractObjectDataDefinition {
  children?: AbstractObjectLayoutDefinition | AbstractObjectDataDefinition
  fieldBreadcrumbTitle: string
  fieldCollectionModifiedList?: string[]
  isExpandedUnmodifiedFields: boolean
}

interface IList {
  key: string
  breadcrumbTitle: string
  renderList: React.JSX.Element[]
}

export const VersionFieldCollection = ({ value, fieldBreadcrumbTitle, className, fieldCollectionModifiedList, isExpandedUnmodifiedFields }: VersionFieldCollectionProps): React.JSX.Element => {
  const fieldCollection = useFieldCollection()
  const [fieldCollectionGroups, setFieldCollectionGroups] = useState<IList[]>([])

  const isComparisonMode = !isEmpty(fieldCollectionModifiedList)

  const { styles } = useStyles()

  const layoutDefinition: FieldCollectionLayoutDefinition[] = fieldCollection?.data?.items
  let currentFieldCollectionSection: string = ''

  const checkLocalizedFields = (value: object): boolean => {
    return Object.values(value).every(value =>
      !isEmpty(value) && isObject(value) ? checkLocalizedFields(value) : isNull(value)
    )
  }

  const shouldSkipProcessing = ({ dataItem, filteredObject, fieldValue }): boolean => {
    if (dataItem.fieldtype === DynamicTypesList.LOCALIZED_FIELDS) {
      const isAllFieldsNull = checkLocalizedFields(fieldValue as object)

      if (isAllFieldsNull) return true
    }

    if (isEmpty(filteredObject) && isEmpty(fieldValue)) {
      return true
    }

    return isComparisonMode && !isExpandedUnmodifiedFields && fieldCollectionModifiedList?.includes(currentFieldCollectionSection) === false
  }

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

          const isEmptyValue = shouldSkipProcessing({ dataItem, filteredObject, fieldValue })

          if (isEmptyValue) return

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

  const renderFieldTitle = (title: string): React.JSX.Element => {
    if (!isEmptyValue(title)) {
      return (
        <Text className={ styles.fieldTitle }>
          <strong>{title}</strong>
        </Text>
      )
    }

    return <></>
  }

  return (
    <Space
      className="w-full"
      direction="vertical"
      size="mini"
    >
      {fieldCollectionGroups?.map((groupItem: IList, groupIndex: number) => (
        <CollapseItem
          className={ cn(className, { [styles.section]: fieldCollectionModifiedList?.includes(groupItem.key) === true }) }
          defaultActive
          key={ `${groupItem.key}-${groupIndex}` }
          label={
            <div className={ styles.sectionLabel }>
              <span className={ styles.subSectionLabel }>{`${groupItem.breadcrumbTitle} / `}</span>{`Inner Section ${groupIndex + 1}: ${groupItem.key}`}
            </div>
          }
        >
          <Flex
            gap="small"
            vertical
          >
            {groupItem.renderList?.map((item, index) => {
              const fieldTitle: string = item?.props?.title

              return (
                <div key={ `${index}-${groupItem.key}` }>
                  {renderFieldTitle(fieldTitle)}
                  {item}
                </div>
              )
            })}
          </Flex>
        </CollapseItem>
      ))}
    </Space>
  )
}
