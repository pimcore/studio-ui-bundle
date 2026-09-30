/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Accordion } from '@Pimcore/components/accordion/accordion'
import { Button } from '@Pimcore/components/button/button'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { Modal } from '@Pimcore/components/modal/modal'
import { TwoFactorSetupForm } from '@Pimcore/modules/auth/components/two-factor-setup-form/two-factor-setup-form'
import { useTwoFactorAuthentication } from '@Pimcore/modules/auth/hooks/use-two-factor-authentication'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { setUser } from '@Pimcore/modules/auth/user/user-slice'
import { useAppDispatch } from '@sdk/app'
import { Flex, Text } from '@sdk/components'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const TwoFactorAccordion = (): React.JSX.Element | null => {
  const { t } = useTranslation()
  const user = useUser()
  const dispatch = useAppDispatch()
  const modal = useFormModal()
  const messageApi = useMessage()
  const { isAvailable, loadSetup, confirmSetup, disableTwoFactor } = useTwoFactorAuthentication()
  const [isSetupOpen, setIsSetupOpen] = useState<boolean>(false)

  if (!isAvailable) {
    return null
  }

  const twoFactor = user.twoFactorAuthentication
  const isActive = twoFactor.active
  const isRequired = twoFactor.required

  const updateTwoFactorState = (changes: Partial<typeof twoFactor>): void => {
    dispatch(setUser({ ...user, twoFactorAuthentication: { ...twoFactor, ...changes } }))
  }

  const handleConfirmSetup = async (code: string): Promise<void> => {
    await confirmSetup(code)
    updateTwoFactorState({ enabled: true, active: true, type: 'google' })
    setIsSetupOpen(false)
    await messageApi.success(t('user-profile.two-factor-authentication.setup.success'))
  }

  const handleDisable = (): void => {
    modal.confirm({
      title: t('user-profile.two-factor-authentication.disable.confirmation.title'),
      content: t('user-profile.two-factor-authentication.disable.confirmation.text'),
      okText: t('user-profile.two-factor-authentication.disable'),
      onOk: async () => {
        try {
          await disableTwoFactor()
          updateTwoFactorState({ enabled: false, active: false, type: '' })
          await messageApi.success(t('user-profile.two-factor-authentication.disable.success'))
        } catch {
          await messageApi.error(t('user-profile.two-factor-authentication.disable.error'))
        }
      }
    })
  }

  return (
    <>
      <Accordion
        activeKey={ '1' }
        bordered
        items={ [
          {
            key: '1',
            title: <>{t('user-profile.two-factor-authentication')}</>,
            children: (
              <Flex
                gap={ 'small' }
                vertical
              >
                <Text>
                  {t(isActive
                    ? 'user-profile.two-factor-authentication.status.active'
                    : 'user-profile.two-factor-authentication.status.inactive')}
                </Text>

                {isRequired && (
                  <Text type="secondary">{t('user-profile.two-factor-authentication.required-hint')}</Text>
                )}

                <Flex gap={ 'small' }>
                  <Button
                    onClick={ () => { setIsSetupOpen(true) } }
                    type="default"
                  >
                    {t(isActive
                      ? 'user-profile.two-factor-authentication.renew'
                      : 'user-profile.two-factor-authentication.setup')}
                  </Button>

                  {isActive && !isRequired && (
                    <Button
                      onClick={ handleDisable }
                      type="default"
                    >
                      {t('user-profile.two-factor-authentication.disable')}
                    </Button>
                  )}
                </Flex>
              </Flex>
            )
          }
        ] }
        size={ 'small' }
      />

      <Modal
        destroyOnClose
        footer={ null }
        onCancel={ () => { setIsSetupOpen(false) } }
        open={ isSetupOpen }
        title={ t('user-profile.two-factor-authentication') }
      >
        <TwoFactorSetupForm
          description={ t('user-profile.two-factor-authentication.setup.description') }
          loadSetup={ loadSetup }
          onConfirm={ handleConfirmSetup }
        />
      </Modal>
    </>
  )
}
