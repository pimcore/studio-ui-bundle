/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { ConfigProvider } from 'antd'
import cn from 'classnames'
import { isEmpty, isNil, isUndefined } from 'lodash'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { Form } from '@Pimcore/components/form/form'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { LocalizedFieldsProvider } from '@Pimcore/components/form/localisation/localized-fields/provider/localized-fields-provider/localized-fields-provider'
import { ObjectComponent } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'
import { CombinedFieldNameProvider } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/combined-field-name-provider/combined-field-name-provider'
import { FieldWidthProvider } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/field-width-provider'
import { type ILocalizedFieldDescriptor } from './helpers/process-layout-data'
import { CLASSIFICATION_STORE_LANGUAGE_COMPARISON_DYNAMIC_LOCALE } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-classification-store'
import { useStyles } from './language-comparison-modal.styles'

interface ILanguageComparisonColumnProps {
  locales: string[]
  layoutData: ILocalizedFieldDescriptor[]
  isAllowedToEdit: boolean
}

interface ILocalizedSection {
  breadcrumbTitle: string
  fields: ILocalizedFieldDescriptor[]
}

/** Group the flat layoutData list into sections keyed by fieldBreadcrumbTitle, preserving order */
const groupIntoSections = (items: ILocalizedFieldDescriptor[]): ILocalizedSection[] => {
  const sections: ILocalizedSection[] = []

  for (const item of items) {
    const title = item.fieldBreadcrumbTitle ?? ''
    const existing = sections.find(section => section.breadcrumbTitle === title)

    if (!isUndefined(existing)) {
      existing.fields.push(item)
    } else {
      sections.push({ breadcrumbTitle: title, fields: [item] })
    }
  }
  return sections
}

export const LanguageComparisonContent = ({ layoutData, locales, isAllowedToEdit }: ILanguageComparisonColumnProps): React.JSX.Element => {
  const { styles } = useStyles()

  const renderSectionTitle = ({ breadcrumbTitle, hideSectionTitle }: { breadcrumbTitle: string, hideSectionTitle: boolean }): React.JSX.Element | null => {
    if (isEmptyValue(breadcrumbTitle)) return null

    const titleParts = breadcrumbTitle.split('/')
    const [firstTitlePart, ...remainingTitleParts] = titleParts
    const secondTitlePart = remainingTitleParts.length > 0 ? ` | ${remainingTitleParts.join(' | ')}` : ''

    return (
      <Text
        className={ cn(styles.sectionTitle, { [styles.sectionTitleHidden]: hideSectionTitle }) }
        strong
      >
        {firstTitlePart}
        {!isEmptyValue(secondTitlePart) && <span className={ styles.subSectionText }>{secondTitlePart}</span>}
      </Text>
    )
  }
  const renderField = ({ item, fieldIndex, locale }: { item: ILocalizedFieldDescriptor, fieldIndex: number, locale: string | null }): React.JSX.Element | null => {
    if (isNil(locale) || isEmpty(locale)) {
      return null
    }

    const resolvedGroupPath = item.formPath
      .slice(0, -1)
      .map(pathPart => pathPart === CLASSIFICATION_STORE_LANGUAGE_COMPARISON_DYNAMIC_LOCALE ? locale : pathPart)

    const combinedFieldNameParent = resolvedGroupPath.map(String)
    const shouldWrapLocalizedProvider = item.localeInFormPath !== true
    const fieldKey = `${item.formPath.join('.')}-${fieldIndex}-${locale}`

    const fieldNode = (
      <CombinedFieldNameProvider
        combinedFieldNameParent={ combinedFieldNameParent }
        key={ fieldKey }
      >
        <Form.Group name={ resolvedGroupPath }>
          <ObjectComponent
            { ...item.fieldData }
            noteditable={ !isAllowedToEdit }
          />
        </Form.Group>
      </CombinedFieldNameProvider>
    )

    if (!shouldWrapLocalizedProvider) {
      return fieldNode
    }

    return (
      <LocalizedFieldsProvider
        key={ `${fieldKey}-localized` }
        locales={ [locale] }
      >
        {fieldNode}
      </LocalizedFieldsProvider>
    )
  }

  const sections = useMemo(() => groupIntoSections(layoutData), [layoutData])
  const renderedContent = useMemo(() => {
    if (locales.length === 0) {
      return null
    }

    return (
      <Flex
        className={ styles.comparisonSections }
        gap="extra-small"
        vertical
      >
        {sections.map((section, sectionIndex) => (
          <Flex
            className={ styles.sectionBlock }
            gap="mini"
            key={ `section-${sectionIndex}-${section.breadcrumbTitle}` }
            vertical
          >
            <Flex
              className={ styles.sectionHeaderRow }
              gap="extra-small"
            >
              {locales.map((locale, localeIndex) => (
                <div
                  className={ styles.sectionHeaderCell }
                  key={ `${section.breadcrumbTitle}-${locale}-${localeIndex}` }
                >
                  {renderSectionTitle({
                    breadcrumbTitle: section.breadcrumbTitle,
                    hideSectionTitle: localeIndex > 0
                  })}
                </div>
              ))}
            </Flex>
            <Flex
              className={ styles.sectionFields }
              gap="mini"
              vertical
            >
              {section.fields.map((item, fieldIndex) => (
                <Flex
                  align="stretch"
                  className={ styles.fieldRow }
                  gap="extra-small"
                  key={ `${item.formPath.join('.')}-${fieldIndex}` }
                >
                  {locales.map((locale, localeIndex) => (
                    <div
                      className={ styles.fieldCell }
                      key={ `${item.formPath.join('.')}-${fieldIndex}-${locale}-${localeIndex}` }
                    >
                      {renderField({ item, fieldIndex, locale })}
                    </div>
                  ))}
                </Flex>
              ))}
            </Flex>
          </Flex>
        ))}
      </Flex>
    )
  }, [locales, sections])

  return (
    <ConfigProvider theme={ { components: { Form: { itemMarginBottom: 8 } } } }>
      <FieldWidthProvider>
        {renderedContent}
      </FieldWidthProvider>
    </ConfigProvider>
  )
}
