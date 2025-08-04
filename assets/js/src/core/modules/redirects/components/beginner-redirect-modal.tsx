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
import { Select } from '@Pimcore/components/select/select'
import { useForm } from 'antd/es/form/Form'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useBundleSeoRedirectListTypesQuery } from '../seo-api-slice-enhanced'
import { useRedirectsContext } from '../hooks/redirects-provider'

interface BeginnerRedirectModalProps {
  createRedirect: (redirectData?: { type: string, source: string, target: string }) => Promise<boolean>
}

interface BeginnerRedirectFormValues {
  type: string
  path: string
  target: string
}

export const BeginnerRedirectModal = ({ createRedirect }: BeginnerRedirectModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = useForm()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { data: typesData } = useBundleSeoRedirectListTypesQuery()
  const { isBeginnerModalOpen, setIsBeginnerModalOpen } = useRedirectsContext()

  const typeOptions = typesData?.types?.map(type => ({ label: t(type), value: type })) ?? []

  const onFinish = async (values: BeginnerRedirectFormValues): Promise<void> => {
    setIsLoading(true)

    const success = await createRedirect({
      type: values.type,
      source: values.path,
      target: values.target
    })

    if (success) {
      setIsBeginnerModalOpen(false)
      form.resetFields()
    }

    setIsLoading(false)
  }

  const onCancel = (): void => {
    setIsBeginnerModalOpen(false)
    form.resetFields()
  }

  return (
    <Modal
      cancelButtonProps={ { style: { display: 'none' } } }
      okButtonProps={ { loading: isLoading } }
      okText={ t('redirects.beginner-modal.create') }
      onCancel={ onCancel }
      onOk={ () => { form.submit() } }
      open={ isBeginnerModalOpen }
      size="M"
      title={ (
        <ModalTitle iconName="new">
          {t('redirects.beginner-modal.title')}
        </ModalTitle>
      ) }
    >
      <Form
        form={ form }
        layout="vertical"
        onFinish={ onFinish }
      >
        <Form.Item
          label={ t('redirects.beginner-modal.type') }
          name="type"
          rules={ [{ required: true, message: t('redirects.beginner-modal.type') }] }
        >
          <Select
            options={ typeOptions }
            placeholder={ t('redirects.beginner-modal.type') }
          />
        </Form.Item>

        <Form.Item
          label={ t('redirects.beginner-modal.path') }
          name="path"
          rules={ [{ required: true, message: t('redirects.beginner-modal.path') }] }
        >
          <Input placeholder={ t('redirects.beginner-modal.path') } />
        </Form.Item>

        <Form.Item
          label={ t('redirects.beginner-modal.target') }
          name="target"
          rules={ [{ required: true, message: t('redirects.beginner-modal.target') }] }
        >
          <Input placeholder={ t('redirects.beginner-modal.target') } />
        </Form.Item>
      </Form>
    </Modal>
  )
}
