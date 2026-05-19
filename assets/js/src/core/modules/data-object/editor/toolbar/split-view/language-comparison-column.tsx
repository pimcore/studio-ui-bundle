/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { forwardRef, useEffect, useImperativeHandle, useMemo } from 'react'
import { ConfigProvider } from 'antd'
import cn from 'classnames'
import { isEmpty, isNil } from 'lodash'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { Form, type formInstanceType } from '@Pimcore/components/form/form'
import { Space } from '@Pimcore/components/space/space'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import {
  LocalizedFieldsProvider
} from '@Pimcore/components/form/localisation/localized-fields/provider/localized-fields-provider/localized-fields-provider'
import {
  ObjectComponent,
  type ObjectComponentProps
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'
import {
  CombinedFieldNameProvider
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/combined-field-name-provider/combined-field-name-provider'
import {
  FieldWidthProvider
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/field-width-provider'
import {
  type ILocalizedFieldDescriptor
} from './helpers/process-layout-data'
import { useStyles } from './language-comparison-modal.styles'

export interface LanguageComparisonColumnHandle {
  /** Returns only the fields for the currently selected locale: { fieldName: value } */
  getLocaleValues: () => Record<string, unknown>
}

interface LanguageComparisonColumnProps {
  locale: string | null
  /** Flat list of localized field items grouped internally by breadcrumbTitle */
  layoutData: ILocalizedFieldDescriptor[]
  /** Live localized field values from the main editor form: { fieldName: { locale: value } } */
  localizedFieldValues: Record<string, Record<string, unknown>>
}

interface LocalizedSection {
  breadcrumbTitle: string
  fields: ILocalizedFieldDescriptor[]
}

/** Group the flat layoutData list into sections keyed by fieldBreadcrumbTitle, preserving order. */
const groupIntoSections = (items: ILocalizedFieldDescriptor[]): LocalizedSection[] => {
  const sections: LocalizedSection[] = []
  for (const item of items) {
    const title = item.fieldBreadcrumbTitle ?? ''
    const existing = sections.find(s => s.breadcrumbTitle === title)
    if (existing !== undefined) {
      existing.fields.push(item)
    } else {
      sections.push({ breadcrumbTitle: title, fields: [item] })
    }
  }
  return sections
}

export const LanguageComparisonColumn = forwardRef<LanguageComparisonColumnHandle, LanguageComparisonColumnProps>(
  function LanguageComparisonColumn ({ locale, layoutData, localizedFieldValues }, ref) {
    const { styles } = useStyles()
    const [form] = Form.useForm()

    // Build initial values seeded from the live main editor values.
    const initialValues = useMemo(() => ({
      localizedfields: localizedFieldValues
    }), [])

    // Whenever localizedFieldValues changes (modal re-open), sync the form.
    useEffect(() => {
      form.setFieldsValue({ localizedfields: localizedFieldValues })
    }, [localizedFieldValues])

    useImperativeHandle(ref, () => ({
      getLocaleValues: (): Record<string, unknown> => {
        if (isNil(locale) || isEmpty(locale)) {
          return {}
        }

        const all = form.getFieldsValue(true) as { localizedfields?: Record<string, Record<string, unknown>> }
        const localeMap = all.localizedfields ?? {}

        return Object.fromEntries(
          Object.entries(localeMap)
            .filter(([, localeValues]) => locale in localeValues)
            .map(([fieldName, localeValues]) => [fieldName, localeValues[locale]])
        )
      }
    }), [form, locale])

    const renderSectionTitle = (breadcrumbTitle: string): React.JSX.Element | null => {
      if (isEmptyValue(breadcrumbTitle)) return null

      const titleParts = breadcrumbTitle.split('/')
      const [firstTitlePart, ...remainingTitleParts] = titleParts
      const secondTitlePart = remainingTitleParts.length > 0 ? ` | ${remainingTitleParts.join(' | ')}` : ''
      const isSubSection = !isEmpty(secondTitlePart) || titleParts.length > 1

      return (
        <Text
          className={ cn(styles.sectionTitle, { [styles.subSectionTitle]: isSubSection }) }
          strong
        >
          {firstTitlePart}
          {!isEmptyValue(secondTitlePart) && <span className={ styles.subSectionText }>{secondTitlePart}</span>}
        </Text>
      )
    }

    const sections = useMemo(() => groupIntoSections(layoutData), [layoutData])

    const renderedContent = useMemo(() => {
      if (isNil(locale) || isEmpty(locale)) {
        return null
      }

      return (
        <LocalizedFieldsProvider locales={ [locale] }>
          <CombinedFieldNameProvider combinedFieldNameParent={ ['localizedfields'] }>
            <Form.Group name={ 'localizedfields' }>
              <Space
                className="w-full"
                direction='vertical'
                size='small'
              >
                {sections.map((section, sectionIndex) => (
                  <div key={ `section-${sectionIndex}-${section.breadcrumbTitle}` }>
                    {renderSectionTitle(section.breadcrumbTitle)}

                    <Flex
                      className={ cn(styles.sectionFields, { [styles.sectionFieldsWithoutBorder]: isEmptyValue(section.breadcrumbTitle) }) }
                      vertical
                    >
                      {section.fields.map((item, fieldIndex) => (
                        <ObjectComponent
                          key={ `${item.fieldData?.name ?? 'field'}-${fieldIndex}` }
                          { ...(item.fieldData as unknown as ObjectComponentProps) }
                        />
                      ))}
                    </Flex>
                  </div>
                ))}
              </Space>
            </Form.Group>
          </CombinedFieldNameProvider>
        </LocalizedFieldsProvider>
      )
    }, [locale, sections])

    return (
      <ConfigProvider theme={ { components: { Form: { itemMarginBottom: 8 } } } }>
        <FieldWidthProvider>
          <Form
            form={ form as formInstanceType }
            initialValues={ initialValues }
            layout='vertical'
            preserve
          >
            {renderedContent}
          </Form>
        </FieldWidthProvider>
      </ConfigProvider>
    )
  }
)

LanguageComparisonColumn.displayName = 'LanguageComparisonColumn'
