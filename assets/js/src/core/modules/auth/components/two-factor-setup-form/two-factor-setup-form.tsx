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
import { isUndefined } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type TwoFactorSetupData } from '../../hooks/use-two-factor-authentication'
import { TwoFactorCodeField, type TwoFactorCodeFormValues } from '../two-factor-code-field/two-factor-code-field'
import { useStyles } from './two-factor-setup-form.styles'

export interface TwoFactorSetupFormProps {
  loadSetup: () => Promise<TwoFactorSetupData>
  onConfirm: (code: string) => Promise<void>
  onGetBack: () => void
}

export const TwoFactorSetupForm = ({ loadSetup, onConfirm, onGetBack }: TwoFactorSetupFormProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const [form] = Form.useForm<TwoFactorCodeFormValues>()
  const [setup, setSetup] = useState<TwoFactorSetupData | undefined>(undefined)
  const [hasLoadError, setHasLoadError] = useState<boolean>(false)
  const [hasCodeError, setHasCodeError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    loadSetup()
      .then(setSetup)
      .catch(() => { setHasLoadError(true) })
  }, [])

  const handleFinish = async (values: TwoFactorCodeFormValues): Promise<void> => {
    setIsLoading(true)
    setHasCodeError(false)

    try {
      await onConfirm(values.code)
    } catch {
      form.resetFields()
      setHasCodeError(true)
      setIsLoading(false)
    }
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

        {hasCodeError && (
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
      <Text>{t('two-factor-setup-form.description')}</Text>

      {renderSetup()}

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
