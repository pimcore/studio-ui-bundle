/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@Pimcore/app/store'
import { Flex } from '@Pimcore/components/flex/flex'
import { Form } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import { Modal } from '@Pimcore/components/modal/modal'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { api } from '@Pimcore/modules/email/emails-api-slice-enhanced'
import { type EmailLog } from '@Pimcore/modules/email/emails-api-slice.gen'
import { useForm } from 'antd/es/form/Form'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useEmailLog } from '../../hooks/use-email-log'
import { EmailPreview } from '../email-preview/email-preview'

interface ForwardModalProps {
  email: EmailLog
  open: boolean
  setOpen: (open: boolean) => void
}

interface ForwardFormValues {
  to: string
}

export const ForwardModal = ({ email, ...props }: ForwardModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = useForm()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { forward } = useEmailLog()
  const dispatch = useAppDispatch()

  const onFinish = async (values: ForwardFormValues): Promise<void> => {
    setIsLoading(true)
    await forward(
      email.id,
      values.to,
      () => {
        dispatch(
          api.util.invalidateTags(
            invalidatingTags.EMAIL_LOG()
          )
        )
      }
    )
    props.setOpen(false)
    form.resetFields()
    setIsLoading(false)
  }

  return (
    <Modal
      okButtonProps={ { loading: isLoading } }
      okText={ t('email-log.send.label') }
      onCancel={ () => {
        props.setOpen(false)
        form.resetFields()
      } }
      onOk={ () => { form.submit() } }
      open={ props.open }
      size="L"
      title={ (
        <ModalTitle iconName='flip-forward'>
          {t('email-log.forward.label')}
        </ModalTitle>
      ) }
    >
      <Flex
        gap="small"
        vertical
      >
        <Form
          form={ form }
          layout="vertical"
          onFinish={ onFinish }
        >
          <Form.Item
            label={ t('email-log.subject') }
          >
            <Input
              disabled
              value={ email.subject! }
            />
          </Form.Item>

          <Form.Item
            label={ t('widget.email-log.from') }
          >
            <Input
              disabled
              value={ email.from! }
            />
          </Form.Item>

          <Form.Item
            label={ t('widget.email-log.to') }
            name="to"
            rules={ [{ type: 'email', required: true, message: t('email-blocklist.add.validation') }] }
          >
            <Input />
          </Form.Item>
        </Form>

        <EmailPreview
          email={ email }
          height={ 300 }
        />
      </Flex>
    </Modal>
  )
}
