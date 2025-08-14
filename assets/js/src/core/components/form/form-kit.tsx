/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { Form, type FormProps } from './form'
import { Panel } from '../panel'
import { ConfigProvider } from 'antd'
import { Tabpanel } from '../tabpanel/tabpanel'
import { Region } from '../region/region'
import { FieldWidthProvider } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/field-width-provider'

export interface FormKitProps {
  formProps?: Omit<FormProps, 'children'>
  children?: React.ReactNode
}

const FormKit = (props: FormKitProps): React.JSX.Element => {
  const finalProps: FormKitProps = {
    ...props,
    formProps: {
      layout: 'vertical',
      ...props.formProps
    }
  }

  return (
    <FieldWidthProvider fieldWidthValues={ { small: 200, medium: 300, large: 900 } }>
      <ConfigProvider theme={ { components: { Form: { itemMarginBottom: 0 } } } }>
        <Form { ...finalProps.formProps }>
          <Panel>
            {props.children}
          </Panel>
        </Form>
      </ConfigProvider>
    </FieldWidthProvider>
  )
}

const TypedFormKit = FormKit as typeof FormKit & {
  Panel: typeof Panel
  TabPanel: typeof Tabpanel
  Region: typeof Region
}

TypedFormKit.Panel = Panel
TypedFormKit.TabPanel = Tabpanel
TypedFormKit.Region = Region

export { TypedFormKit as FormKit }
