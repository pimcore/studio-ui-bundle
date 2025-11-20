/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { baseUrl } from '@Pimcore/app/router/router'
import { Form } from '@Pimcore/components/form/form'
import { Icon } from '@Pimcore/components/icon/icon'
import { Alert, Button, Flex, FormKit } from '@sdk/components'
import { Input } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuthentication } from '../../hooks/use-authentication'

interface ForgetPasswordForm {
  username: string
}

interface ForgotPasswordFormProps {
  onGetBack: () => void
}

export const ForgotPasswordForm = ({ onGetBack }: ForgotPasswordFormProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm<ForgetPasswordForm>()
  const { resetPassword } = useAuthentication()
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <Flex
      gap={ 16 }
      vertical
    >
      {showSuccessMessage && (
        <Alert
          description={ t('forgot-password-form.success-message') }
          showIcon
          type="success"
        />
      )}

      {
        !showSuccessMessage && (
          <FormKit
            formProps={ {
              form,
              onFinish: async (values: ForgetPasswordForm) => {
                setIsLoading(true)
                void resetPassword(
                  values.username,
                  `${baseUrl}${getPrefix()}/reset-password`,
                  () => {
                    setIsLoading(false)
                  },
                  () => {
                    form.resetFields()
                    setShowSuccessMessage(true)
                  }
                )
              }
            } }
          >
            <Form.Item
              label={ t('forgot-password-form.username') }
              name="username"
            >
              <Input
                autoComplete="username"
                name={ 'username' }
                placeholder={ t('forgot-password-form.username.placeholder') }
                prefix={ <Icon value="user" /> }
              />
            </Form.Item>

            <Button
              className="w-full"
              htmlType='submit'
              loading={ isLoading }
              type='primary'
            >
              {t('forgot-password-form.reset-password')}
            </Button>
          </FormKit>
        )
      }

      <Flex justify="center">
        <Button
          onClick={ onGetBack }
          type="link"
        >
          {t('forgot-password-form.back')}
        </Button>
      </Flex>
    </Flex >
  )
}
