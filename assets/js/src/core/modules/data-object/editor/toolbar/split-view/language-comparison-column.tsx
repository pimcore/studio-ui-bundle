/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import { ConfigProvider } from 'antd'
import { isEmpty, isNil } from 'lodash'
import { Form, type formInstanceType } from '@Pimcore/components/form/form'
import {
  FieldWidthProvider
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/field-width-provider'
import {
  type IFormattedDataStructureData
} from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/types'

export interface LanguageComparisonColumnHandle {
  getLocaleValues: () => Record<string, unknown>
}

interface LanguageComparisonColumnProps {
  locale: string | null
  layoutData: IFormattedDataStructureData[]
  /** Live localized field values from the main editor form */
  localizedFieldValues: Record<string, unknown>
}

export const LanguageComparisonColumn = forwardRef<LanguageComparisonColumnHandle, LanguageComparisonColumnProps>(
  function LanguageComparisonColumn (props, ref) {
    const { locale, localizedFieldValues } = props
    const [form] = Form.useForm()

    useEffect(() => {
      form.setFieldsValue(localizedFieldValues)
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

    return (
      <ConfigProvider theme={ { components: { Form: { itemMarginBottom: 8 } } } }>
        <FieldWidthProvider>
          <Form
            form={ form as formInstanceType }
            initialValues={ localizedFieldValues }
            layout='vertical'
            preserve
          >
            {null}
          </Form>
        </FieldWidthProvider>
      </ConfigProvider>
    )
  }
)

LanguageComparisonColumn.displayName = 'LanguageComparisonColumn'
