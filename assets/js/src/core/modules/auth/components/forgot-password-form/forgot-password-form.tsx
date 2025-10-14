import { Form } from "@Pimcore/components/form/form"
import { Icon } from "@Pimcore/components/icon/icon"
import { Alert, Button, Content, Flex, FormKit, IconButton } from "@sdk/components"
import { Input } from "antd"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useAuthentication } from "../../hooks/use-authentication"
import { getPrefix } from "@Pimcore/app/api/pimcore/route"
import { baseUrl } from "@Pimcore/app/router/router"
import { set } from "lodash"

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
    <Flex vertical>
      {showSuccessMessage && (
        <Alert
          type="success"
          showIcon
          description={t('forgot-password-form.success-message')}
        />
      )}

      {
        !showSuccessMessage && (
          <FormKit
            formProps={{
              form,
              onFinish: async (values: ForgetPasswordForm) => {
                setIsLoading(true)
                resetPassword(
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
            }}
          >
            <Form.Item
              label={t('forgot-password-form.username')}
              name="username"
            >
              <Input
                autoComplete="username"
                name={'username'}
                placeholder={t('forgot-password-form.username')}
                prefix={<Icon value="user" />}
              />
            </Form.Item>

            <Button
              className="w-full"
              htmlType='submit'
              type='primary'
              loading={isLoading}
            >
              {t('forgot-password-form.reset-password')}
            </Button>
          </FormKit>
        )
      }

      <Flex justify="flex-end">
        <Button
          onClick={onGetBack}
          type="link"
        >
          {t('forgot-password-form.back')}
        </Button>
      </Flex>
    </Flex >
  )
}