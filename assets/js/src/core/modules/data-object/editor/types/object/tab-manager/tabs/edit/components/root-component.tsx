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

import React, { useCallback, useRef } from 'react'
import { ObjectComponent } from './object-component'
import { Form } from '@Pimcore/components/form/form'
import { Button, ConfigProvider } from 'antd'
import { type DataObjectGetLayoutByIdApiResponse } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { debounce } from 'lodash'
import {
  useEditFormContext
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider'

interface RootComponentProps {
  layout: DataObjectGetLayoutByIdApiResponse
  data: any
  className?: string
}

export const RootComponent = ({ layout, data, className }: RootComponentProps): React.JSX.Element => {
  const { id } = useElementContext()
  const { trackModifiedObjectData } = useDataObjectDraft(id)
  const modifiedDataObjectAttributesRef = useRef({})
  const { form } = useEditFormContext()

  const debouncedTrackModifiedDataObjectAttribute = useCallback(
    debounce((currentAttributes: Record<string, any>) => {
      commitToDraft(currentAttributes)
    }, 300),
    [trackModifiedObjectData]
  )

  const handleValuesChange = (changedValues: Record<string, any>): void => {
    modifiedDataObjectAttributesRef.current = { ...modifiedDataObjectAttributesRef.current, ...changedValues }
    debouncedTrackModifiedDataObjectAttribute({ ...modifiedDataObjectAttributesRef.current })
  }

  const handleSubmit = (values: any): void => {
    commitToDraft(modifiedDataObjectAttributesRef.current)
    console.log(values)
  }

  const commitToDraft = (changedValues: Record<string, any>): void => {
    trackModifiedObjectData({ ...changedValues })
    modifiedDataObjectAttributesRef.current = {}
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
