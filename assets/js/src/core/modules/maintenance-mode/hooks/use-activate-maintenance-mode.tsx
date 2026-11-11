/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback } from 'react'
import { isUndefined } from 'lodash'
import { useTranslation } from 'react-i18next'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useMaintenanceModeActivateMutation } from '../maintenance-mode-api-slice-enhanced'

export const DISABLE_COMMAND = 'bin/console pimcore:maintenance-mode --disable'

interface UseActivateMaintenanceModeReturn {
  activateWithConfirmation: () => void
}

export const useActivateMaintenanceMode = (): UseActivateMaintenanceModeReturn => {
  const { t } = useTranslation()
  const modal = useFormModal()
  const [activate] = useMaintenanceModeActivateMutation()

  const activateWithConfirmation = useCallback((): void => {
    modal.confirm({
      title: t('maintenance-mode.activate.title'),
      content: (
        <Flex
          gap="small"
          vertical
        >
          <Text>{t('maintenance-mode.activate.text')}</Text>
          <Text>{t('maintenance-mode.activate.lock-out')}</Text>
          <Text>
            {t('maintenance-mode.activate.disable-command')} <Text code>{DISABLE_COMMAND}</Text>
          </Text>
          <Text>{t('maintenance-mode.activate.background-jobs')}</Text>
        </Flex>
      ),
      okText: t('maintenance-mode.activate.ok'),
      okButtonProps: { danger: true },
      cancelText: t('cancel'),
      onOk: async () => {
        const response = await activate()

        if (!isUndefined(response.error)) {
          trackError(new ApiError(response.error))
        }
      }
    })
  }, [modal, activate, t])

  return { activateWithConfirmation }
}
