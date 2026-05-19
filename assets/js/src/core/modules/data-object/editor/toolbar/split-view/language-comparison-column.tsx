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
  getFormValues: () => Record<string, unknown>
}

interface LanguageComparisonColumnProps {
  locale: string | null
  /** Flat list of localized field items grouped internally by breadcrumbTitle */
  layoutData: ILocalizedFieldDescriptor[]
  /** Live object form values from the main editor form. */
  allFormValues: Record<string, unknown>
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
  function LanguageComparisonColumn ({ locale, layoutData, allFormValues }, ref) {
    const { styles } = useStyles()
    const [form] = Form.useForm()

    const initialValues = useMemo(() => allFormValues, [])

    // Whenever live editor values change (modal re-open), sync the form.
    useEffect(() => {
      form.setFieldsValue(allFormValues)
    }, [allFormValues])

    useImperativeHandle(ref, () => ({
      getFormValues: (): Record<string, unknown> => form.getFieldsValue(true) as Record<string, unknown>
    }), [form])

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

    const renderField = (item: ILocalizedFieldDescriptor, fieldIndex: number): React.JSX.Element => {
      const groupPath = item.formPath.slice(0, -1)
      const combinedFieldNameParent = groupPath.map(pathPart => String(pathPart))
      const shouldWrapLocalizedProvider = item.localeInFormPath !== true

      const fieldNode = (
        <CombinedFieldNameProvider
          combinedFieldNameParent={ combinedFieldNameParent }
          key={ `${item.formPath.join('.')}-${fieldIndex}` }
        >
          <Form.Group name={ groupPath }>
            <ObjectComponent
              { ...(item.fieldData as unknown as ObjectComponentProps) }
            />
          </Form.Group>
        </CombinedFieldNameProvider>
      )

      if (!shouldWrapLocalizedProvider) {
        return fieldNode
      }

      return fieldNode
    }

    const renderedContent = useMemo(() => {
      if (isNil(locale) || isEmpty(locale)) {
        return null
      }

      return (
        <LocalizedFieldsProvider locales={ [locale] }>
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
                  {section.fields.map((item, fieldIndex) => renderField(item, fieldIndex))}
                </Flex>
              </div>
            ))}
          </Space>
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
