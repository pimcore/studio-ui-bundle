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

import React, { useMemo } from 'react'
import { ObjectComponent } from './object-component'
import { Form } from '@Pimcore/components/form/form'
import { Button, ConfigProvider } from 'antd'
import { type DataObjectGetLayoutByIdApiResponse } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { useEditFormContext } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider'
import {
  useInheritanceState
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/use-inheritance-state'
import {
  DraftAlert
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/root-component/draft-alert'
import { FieldWidthProvider } from '../providers/field-width/field-width-provider'

interface RootComponentProps {
  layout: DataObjectGetLayoutByIdApiResponse
  data: any
  className?: string
}

export const RootComponent = ({ layout, data, className }: RootComponentProps): React.JSX.Element => {
  const { form, updateModifiedDataObjectAttributes, updateDraft, getChangedFieldName, disabled } = useEditFormContext()
  const inheritanceState = useInheritanceState()

  const handleValuesChange = (changedValues: Record<string, any>, allValues: any): void => {
    if (disabled) {
      return
    }

    updateModifiedDataObjectAttributes(changedValues)

    const fieldName = getChangedFieldName(changedValues)
    if (fieldName !== null && inheritanceState?.getInheritanceState(fieldName)?.inherited === true) {
      inheritanceState?.breakInheritance(fieldName)
    }

    updateDraft().catch((error) => { console.error(error) })
  }

  const handleSubmit = (values: any): void => {
    console.log(values)
  }

  return useMemo(() => (
    <ConfigProvider theme={ { components: { Form: { itemMarginBottom: 0 } } } }>
      <FieldWidthProvider>
        <Form
          className={ className }
          form={ form }
          initialValues={ data }
          layout='vertical'
          onFinish={ handleSubmit }
          onValuesChange={ handleValuesChange }
          preserve
        >
          <DraftAlert />
          <ObjectComponent { ...layout } />
          <Form.Item style={ { margin: 12 } }>
            <Button
              htmlType="submit"
              type="primary"
            >Test submission</Button>
          </Form.Item>
        </Form>
      </FieldWidthProvider>
    </ConfigProvider>
  ), [layout, data, className])
}
