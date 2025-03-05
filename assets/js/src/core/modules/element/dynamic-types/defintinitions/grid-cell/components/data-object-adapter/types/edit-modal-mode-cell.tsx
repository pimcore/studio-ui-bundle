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
import { type WithEditModalGridCellDefinition } from '../../../../objects/data-related/dynamic-type-object-data-abstract'
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { useEditMode } from '@Pimcore/components/grid/edit-mode/use-edit-mode'
import { Modal } from '@Pimcore/components/modal/modal'
import { Form } from '@Pimcore/components/form/form'

export interface EditModalModeCellProps {
  objectCellDefinition: WithEditModalGridCellDefinition
  cellProps: DefaultCellProps
}

export const EditModalCell = (props: EditModalModeCellProps): React.JSX.Element => {
  const { isInEditMode, fireOnUpdateCellDataEvent, disableEditMode } = useEditMode(props.cellProps)
  const [form] = Form.useForm()

  const onFormFinish = (values): void => {
    fireOnUpdateCellDataEvent(values.value)
    disableEditMode()
  }

  const onCancel = (): void => {
    form.resetFields()
    disableEditMode()
  }

  return (
    <div>
      {props.objectCellDefinition.previewComponent}

      <Modal
        cancelText='Discard'
        okText='Apply Changes'
        onCancel={ onCancel }
        onOk={ () => { form.submit() } }
        open={ isInEditMode }
        size='M'
        title={ 'Inline edit' }
      >
        <Form
          form={ form }
          initialValues={ { value: props.cellProps.getValue() } }
          onFinish={ onFormFinish }
        >
          <Form.Item name={ 'value' }>
            {props.objectCellDefinition.editComponent}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
