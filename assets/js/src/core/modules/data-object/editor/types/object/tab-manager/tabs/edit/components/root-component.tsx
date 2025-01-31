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
import { ObjectComponent } from './object-component'
import { Form } from '@Pimcore/components/form/form'
import { Button, ConfigProvider } from 'antd'
import { type DataObjectGetLayoutByIdApiResponse } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { useEditFormContext } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider'
import _ from 'lodash'
import {
  useInheritanceState
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/use-inheritance-state'

interface RootComponentProps {
  layout: DataObjectGetLayoutByIdApiResponse
  data: any
  className?: string
}

export const RootComponent = ({ layout, data, className }: RootComponentProps): React.JSX.Element => {
  const { form, updateModifiedDataObjectAttributes, markDraftAsModified } = useEditFormContext()
  const inheritanceState = useInheritanceState()

  const getFieldName = (
    changedValues: Record<string, unknown>, // Ensures only valid objects are passed
    parentKey: string = ''
  ): string | null => {
    const keys = Object.keys(changedValues)
    if (keys.length === 0) return null // If no keys exist
    const key = keys[0] // Get the first key

    const fullKey = parentKey !== '' ? `${parentKey}.${key}` : key // Combine with parent if needed
    const value = changedValues[key]
    console.log('am here', fullKey, !_.isEmpty(form.getFieldInstance(fullKey)))
    // If the current key is a valid field, return it
    if (!_.isEmpty(form.getFieldInstance(fullKey))) {
      return fullKey
    }

    // If the value is an object, recurse deeper
    if (_.isPlainObject(value)) {
      return getFieldName(value as Record<string, unknown>, fullKey)
    }

    return fullKey // Stop recursion if value is not an object
  }

  const handleValuesChange = (changedValues: Record<string, any>, allValues: any): void => {
    updateModifiedDataObjectAttributes(changedValues)

    const fieldName = getFieldName(changedValues)
    console.log('changed', fieldName, changedValues)
    if (fieldName !== null && inheritanceState?.getInheritanceState(fieldName)?.inherited === true) {
      inheritanceState?.breakInheritance(fieldName)
    }

    markDraftAsModified()
  }

  const handleSubmit = (values: any): void => {
    console.log(values)
  }

  return (
    <ConfigProvider theme={ { components: { Form: { itemMarginBottom: 0 } } } }>
      <Form
        className={ className }
        form={ form }
        initialValues={ data }
        layout='vertical'
        onFinish={ handleSubmit }
        onValuesChange={ handleValuesChange }
        preserve
      >
        <ObjectComponent { ...layout } />
        <Form.Item style={ { margin: 12 } }>
          <Button
            htmlType="submit"
            type="primary"
          >Test submission</Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  )
}
