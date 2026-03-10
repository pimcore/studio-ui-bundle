/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Form } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import { Modal } from '@Pimcore/components/modal/modal'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface CreateUnitModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  createUnit: (id: string) => Promise<{ success: boolean }>
}

interface CreateUnitFormValues {
  id: string
}

export const CreateUnitModal = ({ open, setOpen, createUnit }: CreateUnitModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onFinish = async (values: CreateUnitFormValues): Promise<void> => {
    setIsLoading(true)

    const { success } = await createUnit(values.id)

    if (success) {
      setOpen(false)
      form.resetFields()
    }

    setIsLoading(false)
  }

  const onCancel = (): void => {
    setOpen(false)
    form.resetFields()
  }

  return (
    <Modal
      cancelButtonProps={ { style: { display: 'none' } } }
      okButtonProps={ { loading: isLoading } }
      okText={ t('quantity-values.create-modal.create') }
      onCancel={ onCancel }
      onOk={ () => { form.submit() } }
      open={ open }
      size="M"
      title={ (
        <ModalTitle iconName="new">
          {t('quantity-values.create-modal.title')}
        </ModalTitle>
      ) }
    >
      <Form
        form={ form }
        layout="vertical"
        onFinish={ onFinish }
      >
        <Form.Item
          label={ t('quantity-values.create-modal.id-label') }
          name="id"
          rules={ [{ required: true, message: t('quantity-values.create-modal.id-required') }] }
        >
          <Input placeholder={ t('quantity-values.create-modal.id-placeholder') } />
        </Form.Item>
      </Form>
    </Modal>
  )
}
