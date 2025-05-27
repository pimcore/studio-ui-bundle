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
import { WindowModal } from '@Pimcore/components/modal/window-modal/window-modal'
import { ManyToOneRelation } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/many-to-one-relation'
import { FieldWidthProvider } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/field-width-provider'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNotification } from '../hooks/use-notification'
import { UserSelect } from '../../user/components/user-select/user-select'
import { Input } from '@Pimcore/components/input/input'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import { GeneralError, trackError } from '@sdk/modules/app'
import { Button, Icon, ModalFooter, Flex } from '@sdk/components'

interface SendNotificationModalProps {
  open: boolean
  onClose: () => void
}

export const SendNotificationModal = ({ open, ...props }: SendNotificationModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const { sendNotification, isLoading } = useNotification()

  const onClose = (): void => {
    form.resetFields()
    props.onClose()
  }

  const handleSend = (): void => {
    form.validateFields().then(() => {
      const values = form.getFieldsValue()

      void sendNotification({
        recipientId: values.to,
        title: values.title,
        message: values.message,
        attachmentType: values.attachment?.type,
        attachmentId: values.attachment?.id
      }, () => {
        onClose()
      })
    }).catch((error) => {
      trackError(new GeneralError("Validation of notification form failed"))
    })
  }

  return (
    <WindowModal
      okText={ t('user-menu.notification.send') }
      onCancel={ onClose }
      open={ open }
      size="M"
      title={ <Flex align='center' gap={'extra-small'}><Icon value={'notes-events'}/><>{t('user-menu.notification.modal.send-a-notification')}</></Flex> }
      zIndex={ 1000 }
      footer={(<ModalFooter>
        <Button
        type='default'
        onClick={ onClose }
        >
          {t('user-menu.notification.cancel')}
          </Button>
          <Button
          type='primary'
          onClick={handleSend}
          loading={isLoading}>
          {t('user-menu.notification.send')}
          </Button>
          </ModalFooter>)}>
      <FieldWidthProvider>
        <Form
          form={ form }
          layout="vertical"
        >
          <Form.Item
            label={ t('user-menu.notification.modal.to') }
            name={ 'to' }
            rules={ [{ required: true, message: t('user-menu.notification.modal.form.validation.provide-recipient') }] }
          >
            <UserSelect
              onChange={ (value) => {
                form.setFieldValue('to', value)
              } }
            />
          </Form.Item>
          <Form.Item
            label={ t('user-menu.notification.modal.title') }
            name={ 'title' }
            rules={ [{ required: true, message: t('user-menu.notification.modal.form.validation.provide-title') }] }
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={ t('user-menu.notification.modal.message') }
            name={ 'message' }
            rules={ [{ required: true, message: t('user-menu.notification.modal.form.validation.provide-message') }] }
          >
            <TextArea />
          </Form.Item>

          <Form.Item
            label={ t('user-menu.notification.modal.add-an-attachment') }
            name={ 'attachment' }
          >
            <ManyToOneRelation
              allowToClearRelation
              assetsAllowed
              dataObjectsAllowed
              documentsAllowed
            />
          </Form.Item>
        </Form>
      </FieldWidthProvider>
    </WindowModal>
  )
}
