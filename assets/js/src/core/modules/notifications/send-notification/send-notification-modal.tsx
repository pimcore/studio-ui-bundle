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
import { FieldWidthProvider } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/field-width-provider'
import { Button, Flex, Icon, ModalFooter, useMessage } from '@sdk/components'
import { GeneralError, trackError } from '@sdk/modules/app'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNotification } from '../hooks/use-send-notification'
import { NotificationForm } from './components/notification-form/notification-form'
import { type ManyToOneRelationValue } from '@Pimcore/components/many-to-one-relation/many-to-one-relation'

interface SendNotificationModalProps {
  open: boolean
  onClose: () => void
  initialAttachment?: ManyToOneRelationValue
}

export const SendNotificationModal = ({ open, initialAttachment, ...props }: SendNotificationModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const { sendNotification, isLoading } = useNotification()
  const { success } = useMessage()

  useEffect(() => {
    if (open && initialAttachment !== undefined) {
      form.setFieldValue('attachment', initialAttachment)
    }
  }, [open, initialAttachment])

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
      }, async () => {
        onClose()
        await success(t('user-menu.notification.modal.success-notification-has-been-sent'))
      })
    }).catch(() => {
      trackError(new GeneralError('Validation of notification form failed'))
    })
  }

  return (
    <WindowModal
      footer={ (<ModalFooter>
        <Button
          onClick={ onClose }
          type='default'
        >
          {t('user-menu.notification.cancel')}
        </Button>
        <Button
          loading={ isLoading }
          onClick={ handleSend }
          type='primary'
        >
          {t('user-menu.notification.send')}
        </Button>
      </ModalFooter>) }
      onCancel={ onClose }
      open={ open }
      size="M"
      title={ <Flex
        align='center'
        gap={ 'extra-small' }
              ><Icon value={ 'notes-events' } /><>{t('user-menu.notification.modal.send-a-notification')}</></Flex> }
      zIndex={ 1000 }
    >
      <FieldWidthProvider>
        <NotificationForm form={ form } />
      </FieldWidthProvider>
    </WindowModal>
  )
}
