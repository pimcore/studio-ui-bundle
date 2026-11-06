/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { isUndefined } from 'lodash'
import { useTranslation } from 'react-i18next'
import { Button } from '@Pimcore/components/button/button'
import { Flex } from '@Pimcore/components/flex/flex'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'
import { useMaintenanceModeDeactivateMutation, useMaintenanceModeGetQuery } from '../maintenance-mode-api-slice-enhanced'

/**
 * Logging out ends the only session maintenance mode lets in, so while it is active the user is
 * asked to deactivate it first. Otherwise `logout` runs right away.
 */
export const useLogoutCheck = (): ((logout: () => void) => void) => {
  const { t } = useTranslation()
  const modal = useFormModal()
  const { data } = useMaintenanceModeGetQuery(undefined, { skip: !isAllowed(UserPermission.MaintenanceMode) })
  const [deactivate] = useMaintenanceModeDeactivateMutation()

  return (logout: () => void): void => {
    if (data?.active !== true) {
      logout()
      return
    }

    const deactivateAndLogOut = async (): Promise<void> => {
      const response = await deactivate()

      if (!isUndefined(response.error)) {
        trackError(new ApiError(response.error))
        return
      }

      logout()
    }

    const dialog = modal.confirm({
      title: t('maintenance-mode.logout.title'),
      content: t('maintenance-mode.logout.text'),
      footer: () => (
        <Flex
          gap="small"
          justify="flex-end"
        >
          <Button onClick={ () => { dialog.destroy() } }>
            {t('cancel')}
          </Button>
          <Button onClick={ () => { dialog.destroy(); logout() } }>
            {t('maintenance-mode.logout.log-out-anyway')}
          </Button>
          <Button
            onClick={ () => { dialog.destroy(); void deactivateAndLogOut() } }
            type="primary"
          >
            {t('maintenance-mode.logout.deactivate-and-log-out')}
          </Button>
        </Flex>
      )
    })
  }
}
