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
import { Alert, Button, Flex, FormKit, Spin, Text } from '@sdk/components'
import { QRCode } from 'antd'
import { isNil, isUndefined } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TwoFactorCodeError, type TwoFactorSetupData } from '../../hooks/use-two-factor-authentication'
import { TwoFactorCodeField, type TwoFactorCodeFormValues } from '../two-factor-code-field/two-factor-code-field'
import { useStyles } from './two-factor-setup-form.styles'

export interface TwoFactorSetupFormProps {
  loadSetup: () => Promise<TwoFactorSetupData>
  onConfirm: (code: string) => Promise<void>
  onGetBack?: () => void
  description?: string
}

export const TwoFactorSetupForm = ({ loadSetup, onConfirm, onGetBack, description }: TwoFactorSetupFormProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const [form] = Form.useForm<TwoFactorCodeFormValues>()
  const [setup, setSetup] = useState<TwoFactorSetupData | undefined>(undefined)
  const [hasLoadError, setHasLoadError] = useState<boolean>(false)
  const [codeError, setCodeError] = useState<TwoFactorCodeError | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [setupRequest, setSetupRequest] = useState<number>(0)

  useEffect(() => {
    // Each request replaces the pending secret, so only the newest answer may be shown
    let isCurrent = true

    loadSetup()
      .then((data) => { if (isCurrent) setSetup(data) })
      .catch(() => { if (isCurrent) setHasLoadError(true) })

    return () => { isCurrent = false }
  }, [setupRequest])

  const handleFinish = async (values: TwoFactorCodeFormValues): Promise<void> => {
    setIsLoading(true)
    setCodeError(undefined)

    try {
      await onConfirm(values.code)
    } catch (error) {
      form.resetFields()
      setCodeError(error instanceof TwoFactorCodeError ? error : undefined)
      setIsLoading(false)

      if (error instanceof TwoFactorCodeError && error.reason === 'setup-expired') {
        setSetup(undefined)
        setSetupRequest((request) => request + 1)
      }
    }
  }

  const codeErrorMessages: Record<TwoFactorCodeError['reason'], string> = {
    'invalid-code': t('two-factor-form.error'),
    'too-many-attempts': t('two-factor-form.too-many-attempts'),
    'setup-expired': t('two-factor-setup-form.expired')
  }

  const renderSetup = (): React.JSX.Element => {
    if (hasLoadError) {
      return (
        <Alert
          description={ t('two-factor-setup-form.load-error') }
          showIcon
          type="error"
        />
      )
    }

    if (isUndefined(setup)) {
      return (
        <Flex justify="center">
          <Spin />
        </Flex>
      )
    }

    return (
      <>
        <Flex
          align="center"
          gap={ 'small' }
          vertical
        >
          <QRCode
            bgColor="#ffffff"
            size={ 180 }
            value={ setup.otpauthUri }
          />
          <Text type="secondary">{t('two-factor-setup-form.manual-entry')}</Text>
          <Text
            className={ styles.secret }
            code
            copyable
          >
            {setup.secret}
          </Text>
        </Flex>

        {codeError !== undefined && (
          <Alert
            description={ codeErrorMessages[codeError.reason] }
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
            {t('two-factor-setup-form.confirm')}
          </Button>
        </FormKit>
      </>
    )
  }

  return (
    <Flex
      gap={ 'normal' }
      vertical
    >
      <Text>{description ?? t('two-factor-setup-form.description')}</Text>

      {renderSetup()}

      {!isNil(onGetBack) && (
        <Flex justify="center">
          <Button
            onClick={ onGetBack }
            type="link"
          >
            {t('two-factor-form.back')}
          </Button>
        </Flex>
      )}
    </Flex>
  )
}
