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
import { get, isEmpty, isNil } from 'lodash'
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
import { type LocalizedFieldSection } from './helpers/process-layout-data'
import { useStyles } from './language-comparison-modal.styles'

export interface LanguageComparisonColumnHandle {
  /** Returns all localized field values for the current locale, grouped by their form path context.
   *  Shape: Array of { formPath: string[], values: Record<fieldName, value> }
   *  formPath is the path ABOVE the localizedfields node (e.g. [] for top-level, ['objectbricks','BrickType'] for nested).
   */
  getLocaleValues: () => LocaleValueEntry[]
}

export interface LocaleValueEntry {
  /** Form path segments above the localizedfields group, e.g. [] or ['objectbricks', 'BrickType'] */
  formPath: string[]
  /** Field name → locale value map for the selected locale */
  values: Record<string, unknown>
}

interface LanguageComparisonColumnProps {
  locale: string | null
  sections: LocalizedFieldSection[]
  /** Live localized field values from the main editor form: { fieldName: { locale: value } } */
  localizedFieldValues: Record<string, unknown>
}

export const LanguageComparisonColumn = forwardRef<LanguageComparisonColumnHandle, LanguageComparisonColumnProps>(
  function LanguageComparisonColumn (props, ref) {
    const { locale, sections, localizedFieldValues } = props
    const { styles } = useStyles()
    const [form] = Form.useForm()

    // Build initial values for this column's form seeded from the live main editor values.
    const initialValues = useMemo(() => localizedFieldValues, [])

    // Whenever the modal re-opens (localizedFieldValues reference changes), reset the form
    // so the column always reflects the latest unsaved edits from the main editor.
    useEffect(() => {
      form.setFieldsValue(localizedFieldValues)
    }, [localizedFieldValues])

    useImperativeHandle(ref, () => ({
      getLocaleValues: (): LocaleValueEntry[] => {
        if (isNil(locale) || isEmpty(locale)) {
          return []
        }

        const all = form.getFieldsValue(true) as Record<string, unknown>

        // Collect unique formPaths across all sections
        const seen = new Set<string>()
        const result: LocaleValueEntry[] = []

        for (const section of sections) {
          const key = section.formPath.join('|')
          if (seen.has(key)) continue
          seen.add(key)

          // Navigate to the localizedfields map at this formPath level
          // Form structure: { ...formPath..., localizedfields: { fieldName: { locale: value } } }
          const container = isEmpty(section.formPath)
            ? all
            : get(all, section.formPath) as Record<string, unknown> | undefined

          if (isNil(container)) continue

          const localeMap = (container as Record<string, unknown>).localizedfields as
            Record<string, Record<string, unknown>> | undefined

          if (isNil(localeMap)) continue

          const values: Record<string, unknown> = {}
          for (const [fieldName, localeValues] of Object.entries(localeMap)) {
            if (!isNil(localeValues) && locale in localeValues) {
              values[fieldName] = localeValues[locale]
            }
          }

          if (!isEmpty(values)) {
            result.push({ formPath: section.formPath, values })
          }
        }

        return result
      }
    }), [form, locale, sections])

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

    /**
     * Wraps children in nested Form.Group elements for each formPath segment,
     * then wraps in a localizedfields Form.Group and CombinedFieldNameProvider.
     */
    const renderSectionContent = (section: LocalizedFieldSection, sectionIndex: number): React.JSX.Element => {
      const localizedContent = (
        <LocalizedFieldsProvider locales={ [locale ?? ''] }>
          <CombinedFieldNameProvider combinedFieldNameParent={ [...section.formPath, 'localizedfields'] }>
            <Form.Group name={ 'localizedfields' }>
              <Flex
                className={ cn(styles.sectionFields, { [styles.sectionFieldsWithoutBorder]: isEmptyValue(section.breadcrumbTitle) }) }
                vertical
              >
                {section.nodes.map((node, nodeIndex) => (
                  <React.Fragment key={ `${node.name ?? 'lf'}-${nodeIndex}` }>
                    {(node.children ?? []).map((child, childIndex) => (
                      <ObjectComponent
                        key={ `${child.name ?? 'child'}-${childIndex}` }
                        { ...(child as unknown as ObjectComponentProps) }
                      />
                    ))}
                  </React.Fragment>
                ))}
              </Flex>
            </Form.Group>
          </CombinedFieldNameProvider>
        </LocalizedFieldsProvider>
      )

      // Wrap in nested Form.Group elements for each formPath segment
      const wrapped = section.formPath.reduceRight<React.JSX.Element>(
        (inner, segment) => <Form.Group name={ segment }>{inner}</Form.Group>,
        localizedContent
      )

      return (
        <div key={ `section-${sectionIndex}-${section.formPath.join('-')}-${section.breadcrumbTitle}` }>
          {renderSectionTitle(section.breadcrumbTitle)}
          {wrapped}
        </div>
      )
    }

    const renderedContent = useMemo(() => {
      if (isNil(locale) || isEmpty(locale)) {
        return null
      }

      return (
        <Space
          className="w-full"
          direction='vertical'
          size='small'
        >
          {sections.map((section, sectionIndex) => renderSectionContent(section, sectionIndex))}
        </Space>
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
