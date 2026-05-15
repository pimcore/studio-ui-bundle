/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { forwardRef, useImperativeHandle, useMemo } from 'react'
import { ConfigProvider } from 'antd'
import { Form, type formInstanceType } from '@Pimcore/components/form/form'
import { Space } from '@Pimcore/components/space/space'
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
  PermissionBasedLanguageSelectionControl
} from '@Pimcore/modules/element/components/language-selection/permission-based-language-selection-control'
import { type LayoutNode } from './helpers/process-layout-data'
import { useStyles } from './language-comparison-modal.styles'

export interface LanguageComparisonColumnHandle {
  getValues: () => Record<string, unknown>
}

interface LanguageComparisonColumnProps {
  locale: string | null
  onLocaleChange: (locale: string | null) => void
  localizedFieldNodes: LayoutNode[]
  data: Record<string, unknown> | undefined
}

export const LanguageComparisonColumn = forwardRef<LanguageComparisonColumnHandle, LanguageComparisonColumnProps>(
  function LanguageComparisonColumn ({ locale, onLocaleChange, localizedFieldNodes, data }, ref) {
    const { styles } = useStyles()
    const [form] = Form.useForm()

    useImperativeHandle(ref, () => ({
      getValues: () => form.getFieldsValue(true)
    }), [form])

    const initialValues = useMemo(() => ({
      localizedfields: data?.localizedfields ?? {}
    }), [data])

    const renderedColumnContent = useMemo(() => {
      if (locale === null || locale === '') {
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
                {localizedFieldNodes.map((node, nodeIndex) => (
                  <React.Fragment key={ `${node.name ?? 'lf'}-${nodeIndex}` }>
                    {(node.children ?? []).map((child, childIndex) => (
                      <ObjectComponent
                        key={ `${child.name ?? 'child'}-${childIndex}` }
                        { ...(child as unknown as ObjectComponentProps) }
                      />
                    ))}
                  </React.Fragment>
                ))}
              </Space>
            </Form.Group>
          </CombinedFieldNameProvider>
        </LocalizedFieldsProvider>
      )
    }, [locale, localizedFieldNodes])

    return (
      <ConfigProvider theme={ { components: { Form: { itemMarginBottom: 8 } } } }>
        <FieldWidthProvider>
          <Form
            form={ form as formInstanceType }
            initialValues={ initialValues }
            layout='vertical'
            preserve
          >
            <div className={ styles.headerItem }>
              <PermissionBasedLanguageSelectionControl
                onChange={ onLocaleChange }
                value={ locale }
              />
            </div>

            <div style={ { paddingTop: 12 } }>
              {renderedColumnContent}
            </div>
          </Form>
        </FieldWidthProvider>
      </ConfigProvider>
    )
  }
)
