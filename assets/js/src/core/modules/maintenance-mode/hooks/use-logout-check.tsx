/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isUndefined } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { useMaintenanceModeDeactivateMutation, useMaintenanceModeGetQuery } from '../maintenance-mode-api-slice-enhanced'

/**
 * Logging out ends the only session maintenance mode lets in, so while it is active the user is
 * asked to deactivate it first. Otherwise `logout` runs right away.
 */
export const useLogoutCheck = (): ((logout: () => void) => void) => {
  const { t } = useTranslation()
  const modal = useFormModal()
  const { isAdmin } = useUser()
  const { data } = useMaintenanceModeGetQuery(undefined, { skip: !isAdmin })
  const [deactivate] = useMaintenanceModeDeactivateMutation()

  return (logout: () => void): void => {
    if (data?.active !== true) {
      logout()
      return
    }

    modal.confirm({
      title: t('maintenance-mode.logout.title'),
      content: t('maintenance-mode.logout.text'),
      okText: t('maintenance-mode.logout.deactivate-and-log-out'),
      cancelText: t('cancel'),
      onOk: async () => {
        const response = await deactivate()

        if (!isUndefined(response.error)) {
          trackError(new ApiError(response.error))
          return
        }

        logout()
      }
    })
  }
}
