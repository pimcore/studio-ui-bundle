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
import { Form } from '@Pimcore/components/form/form'
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

  // With a single allowed class the form hides the picker, so seed the value it still submits.
  useEffect(() => {
    if (open && classes.length === 1) {
      form.setFieldValue('classId', classes[0].id)
    }
  }, [open, classes])

  return (
    <Modal
      okButtonProps={ { loading: isCreating } }
      okText={ t('relations.create-object.submit') }
      onCancel={ close }
      onOk={ () => { form.submit() } }
      open={ open }
      title={ t('relations.create-object.title') }
    >
      <CreateObjectForm
        classes={ classes }
        form={ form }
        isLoading={ isLoading }
        onFinish={ createObject }
      />
    </Modal>
  )
}
