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
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import { isEmpty } from 'lodash'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { DataComponent } from '../data-component/data-component'
import { VersionCategoryName } from '@Pimcore/constants/versionConstants'
import { type CategoriesList, type IObjectVersionsFieldsList, type VersionKeysList } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-fields-list/types'
import { useStyles } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-fields-list/styles/common-versions-fields-view.styles'

interface IObjectVersionsFieldsViewProps {
  breadcrumbsList?: CategoriesList
  versionViewData: IObjectVersionsFieldsList['data']
  versionKeysList: VersionKeysList
}

const SECTIONS_WITH_TRANSLATION: string[] = [VersionCategoryName.SYSTEM_DATA]

export const ObjectVersionsFieldsView = ({ breadcrumbsList, versionViewData, versionKeysList }: IObjectVersionsFieldsViewProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()

  const renderSectionTitle = ({ key, isCommonSection }: { key: string, isCommonSection: boolean }): React.JSX.Element => {
    const isShowValueWithTranslation = SECTIONS_WITH_TRANSLATION.includes(key)
    const textValue = isShowValueWithTranslation ? t(`version.category.title.${key}`) : key

    const titleParts = textValue.split('/')
    const [firstTitlePart, ...remainingTitleParts] = titleParts

    const secondTitlePart = remainingTitleParts.length > 0 ? ` | ${remainingTitleParts.join(' | ')}` : ''

    return (
      <Text
        className={ cn(styles.sectionTitle, { [styles.subSectionTitle]: !isCommonSection }) }
        strong
      >
        {firstTitlePart}
        {!isEmptyValue(secondTitlePart) && <span className={ styles.subSectionText }>{secondTitlePart}</span>}
      </Text>
    )
  }

  const renderFieldTitle = ({ key, locale, isCommonSection }: { key: string, locale: string, isCommonSection: boolean }): React.JSX.Element => {
    if (isEmptyValue(key)) return <></>

    const textValue = isCommonSection ? t(`version.${key}`) : key

    return (
      <Text className={ styles.fieldTitle }>
        {textValue} {!isEmpty(locale) && <Text type="secondary">| {locale.toUpperCase()}</Text>}
      </Text>
    )
  }

  return (
    <>
      {breadcrumbsList?.map((breadcrumb, index) => {
        const isCommonSection = breadcrumb.key === VersionCategoryName.SYSTEM_DATA

        return (
          <div key={ `${index}-${breadcrumb.key}` }>
            {renderSectionTitle({ key: breadcrumb.key, isCommonSection })}
            <Flex
              className={ cn(styles.sectionFields, { [styles.sectionFieldsWithoutBorder]: !isCommonSection }) }
              gap="extra-small"
              vertical
            >
              {versionViewData.map((fieldItem, fieldIndex) => {
                const isBreadcrumbKeyMatch = breadcrumb.key === fieldItem.Field.fieldBreadcrumbTitle
                const isFieldInBreadcrumbList = breadcrumb.fieldKeys.includes(fieldItem.Field.name as string)

                return (
                  isBreadcrumbKeyMatch && isFieldInBreadcrumbList && (
                    <div key={ `${fieldIndex}-${fieldItem.Field.name}` }>
                      {renderFieldTitle({ key: fieldItem.Field.title, locale: fieldItem.Field?.locale, isCommonSection })}
                      <Flex gap="mini">
                        {versionKeysList.map((key, index) => {
                          const isModifiedField = fieldItem?.isModifiedValue === true
                          const isSecondItem = index === 1

                          return (
                            <div
                              className={ styles.objectSectionFieldItemWrapper }
                              key={ `${index}-${key}` }
                            >
                              <DataComponent
                                className={ cn(styles.objectSectionFieldItem, 'versionFieldItem', {
                                  [styles.objectSectionFieldItemHighlight]: isModifiedField && isSecondItem,
                                  versionFieldItemHighlight: isModifiedField && isSecondItem
                                }) }
                                datatype={ 'data' }
                                fieldType={ fieldItem.Field.fieldtype }
                                key={ `${index}-${key}` }
                                name={ fieldItem.Field.name }
                                value={ fieldItem[key] }
                                { ...fieldItem.Field }
                              />
                            </div>
                          )
                        })}
                      </Flex>
                    </div>
                  )
                )
              })}
            </Flex>
          </div>
        )
      })}
    </>
  )
}
