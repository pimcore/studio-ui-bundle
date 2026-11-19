/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from '@Pimcore/components/modal/modal'
import { Form } from 'antd'
import { type ClassDefinitionListItem } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { type ManyToManyRelationValueItem } from '../../hooks/use-value'
import { CreateObjectForm } from './create-object-form'
import { useCreateObject } from './use-create-object'

export interface CreateObjectModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  /** Relation-allowed classes the current user may create; the toolbar resolves them. */
  classes: ClassDefinitionListItem[]
  isLoading: boolean
  onCreated: (item: ManyToManyRelationValueItem) => void
}

export const CreateObjectModal = ({ open, setOpen, classes, isLoading, onCreated }: CreateObjectModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const close = (): void => {
    setOpen(false)
    form.resetFields()
  }

  const { createObject, isCreating } = useCreateObject({ classes, onCreated, onSuccess: close })

  // While the request is pending the modal cannot be dismissed: the response appends to the
  // relation value captured at submit time, so editing the relation meanwhile would be overwritten.
  const cancel = (): void => {
    if (!isCreating) {
      close()
    }
  }

  // With a single allowed class the form hides the picker, so seed the value it still submits.
  useEffect(() => {
    if (open && classes.length === 1) {
      form.setFieldValue('classId', classes[0].id)
    }
  }, [open, classes])

  return (
    <Modal
      cancelButtonProps={ { disabled: isCreating } }
      closable={ !isCreating }
      keyboard={ !isCreating }
      maskClosable={ !isCreating }
      okButtonProps={ { loading: isCreating } }
      okText={ t('relations.create-object.submit') }
      onCancel={ cancel }
      onOk={ () => { form.submit() } }
      open={ open }
      title={ t('relations.create-object.title') }
    >
      <CreateObjectForm
        classes={ classes }
        disabled={ isCreating }
        form={ form }
        isLoading={ isLoading }
        onFinish={ createObject }
      />
    </Modal>
  )
}
