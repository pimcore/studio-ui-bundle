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
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useBundleSeoRedirectListTypesQuery, type BundleSeoRedirectAdd } from '../seo-api-slice-enhanced'
import { useRedirectTargetTypeOptions } from '../hooks/use-redirect-options'

interface BeginnerRedirectModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  createRedirect: (redirectData?: Partial<BundleSeoRedirectAdd>) => Promise<boolean>
}

interface BeginnerRedirectFormValues {
  type: string
  path: string
  target: string
  targetType: BundleSeoRedirectAdd['targetType']
}

export const BeginnerRedirectModal = ({ open, setOpen, createRedirect }: BeginnerRedirectModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { data: typesData } = useBundleSeoRedirectListTypesQuery()
  const { options: targetTypeOptions } = useRedirectTargetTypeOptions()

  const typeOptions = typesData?.types?.map(type => ({ label: t(type), value: type })) ?? []

  const onFinish = async (values: BeginnerRedirectFormValues): Promise<void> => {
    setIsLoading(true)

    const success = await createRedirect({
      type: values.type,
      source: values.path,
      target: values.target,
      targetType: values.targetType ?? 'document'
    })

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
      okText={ t('redirects.beginner-modal.create') }
      onCancel={ onCancel }
      onOk={ () => { form.submit() } }
      open={ open }
      size="M"
      title={ (
        <ModalTitle iconName="new">
          {t('redirects.beginner-modal.title')}
        </ModalTitle>
      ) }
    >
      <Form
        form={ form }
        initialValues={ { targetType: 'document' } }
        layout="vertical"
        onFinish={ onFinish }
      >
        <Form.Item
          label={ t('redirects.beginner-modal.type') }
          name="type"
          rules={ [{ required: true, message: t('redirects.beginner-modal.type.required') }] }
        >
          <Select
            data-testid="redirects-type-select"
            options={ typeOptions }
            placeholder={ t('redirects.beginner-modal.type') }
          />
        </Form.Item>

        <Form.Item
          label={ t('redirects.beginner-modal.path') }
          name="path"
          rules={ [{ required: true, message: t('redirects.beginner-modal.path.required') }] }
        >
          <Input placeholder={ t('redirects.beginner-modal.path') } />
        </Form.Item>

        <Form.Item
          label={ t('redirects.beginner-modal.target') }
          name="target"
          rules={ [{ required: true, message: t('redirects.beginner-modal.target.required') }] }
        >
          <Input placeholder={ t('redirects.beginner-modal.target') } />
        </Form.Item>

        <Form.Item
          label={ t('redirects.beginner-modal.target-type') }
          name="targetType"
        >
          <Select
            data-testid="redirects-target-type-select"
            options={ targetTypeOptions }
            placeholder={ t('redirects.beginner-modal.target-type') }
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
