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
import { Alert, Button, Flex, FormKit, Text } from '@sdk/components'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TwoFactorCodeField, type TwoFactorCodeFormValues } from '../two-factor-code-field/two-factor-code-field'

export interface TwoFactorFormProps {
  onVerify: (code: string) => Promise<void>
  onGetBack: () => void
}

export const TwoFactorForm = ({ onVerify, onGetBack }: TwoFactorFormProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm<TwoFactorCodeFormValues>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasError, setHasError] = useState<boolean>(false)

  const handleFinish = async (values: TwoFactorCodeFormValues): Promise<void> => {
    setIsLoading(true)
    setHasError(false)

    try {
      await onVerify(values.code)
    } catch {
      form.resetFields()
      setHasError(true)
      setIsLoading(false)
    }
  }

  return (
    <Flex
      gap={ 'normal' }
      vertical
    >
      <Text>{t('two-factor-form.description')}</Text>

      {hasError && (
        <Alert
          description={ t('two-factor-form.error') }
          showIcon
          type="error"
        />
      )}

      <FormKit
        formProps={ {
          form,
          onFinish: handleFinish
        } }
      >
        <TwoFactorCodeField />

        <Button
          className="w-full"
          htmlType="submit"
          loading={ isLoading }
          type="primary"
        >
          {t('two-factor-form.verify')}
        </Button>
      </FormKit>

      <Flex justify="center">
        <Button
          onClick={ onGetBack }
          type="link"
        >
          {t('two-factor-form.back')}
        </Button>
      </Flex>
    </Flex>
  )
}
