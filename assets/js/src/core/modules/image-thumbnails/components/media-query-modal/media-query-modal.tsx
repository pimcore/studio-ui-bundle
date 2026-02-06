/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from '@Pimcore/components/modal/modal'
import { Form } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import { Button } from '@Pimcore/components/button/button'

interface MediaQueryModalProps {
  open: boolean
  onOk: (query: string) => void
  onCancel: () => void
}

export const MediaQueryModal = ({ open, onOk, onCancel }: MediaQueryModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleOk = async (): Promise<void> => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      onOk(values.query)
      form.resetFields()
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = (): void => {
    form.resetFields()
    onCancel()
  }

  return (
    <Modal
      title={t('image-thumbnails.editor.media-query.modal.title')}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText={t('ok')}
      cancelText={t('cancel')}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={t('image-thumbnails.editor.media-query.modal.label')}
          name="query"
          rules={[
            { required: true, message: t('validation.required') },
            { min: 3, message: t('validation.min-length', { count: 3 }) }
          ]}
        >
          <Input
            placeholder={t('image-thumbnails.editor.media-query.modal.placeholder')}
            autoFocus
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}