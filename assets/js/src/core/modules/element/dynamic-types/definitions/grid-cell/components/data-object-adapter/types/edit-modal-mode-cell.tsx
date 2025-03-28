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
import { type AbstractObjectDataDefinition, type WithEditModalGridCellDefinition } from '../../../../objects/data-related/dynamic-type-object-data-abstract'
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { useEditMode } from '@Pimcore/components/grid/edit-mode/use-edit-mode'
import { Form } from '@Pimcore/components/form/form'
import { FieldWidthProvider } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/field-width/field-width-provider'
import { WindowModal } from '@Pimcore/components/modal/window-modal/window-modal'
import { isUndefined } from 'lodash'
import { FieldCollectionProvider } from '../../../../objects/data-related/components/field-collection/providers/field-collection-provider'

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
  props.objectCellDefinition.handleDefaultValue?.(props.objectCellDefinition.editComponent.props as AbstractObjectDataDefinition, form, ['value'])

  return (
    <>
      {props.objectCellDefinition.previewComponent}

      { isInEditMode && !isUndefined(props.objectCellDefinition.editModalSettings) && (
        <WindowModal
          cancelText='Discard'
          okText='Apply Changes'
          onCancel={ onCancel }
          onOk={ () => { form.submit() } }
          open={ isInEditMode }
          size={ props.objectCellDefinition.editModalSettings.modalSize }
          title={ 'Inline edit' }
        >
          <FieldWidthProvider>
            <FieldCollectionProvider id={ props.cellProps.row.original.id }>
              <Form
                form={ form }
                initialValues={ { value: props.cellProps.getValue() } }
                layout={ props.objectCellDefinition.editModalSettings.formLayout }
                onFinish={ onFormFinish }
              >
                <Form.Item
                  { ...props.objectCellDefinition.formItemProps }
                  name={ 'value' }
                >
                  {props.objectCellDefinition.editComponent}
                </Form.Item>
              </Form>
            </FieldCollectionProvider>
          </FieldWidthProvider>
        </WindowModal>
      ) }
    </>
  )
}
