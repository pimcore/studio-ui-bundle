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
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { useMaintenanceModeDeactivateMutation, useMaintenanceModeGetQuery } from '../../maintenance-mode-api-slice-enhanced'

export const MaintenanceModeIndicator = (): React.JSX.Element => {
  const { t } = useTranslation()
  const modal = useFormModal()
  const { isAdmin } = useUser()
  const { data } = useMaintenanceModeGetQuery(undefined, { skip: !isAdmin })
  const [deactivate] = useMaintenanceModeDeactivateMutation()

  if (data?.active !== true) {
    return <></>
  }

  const deactivateWithConfirmation = (): void => {
    modal.confirm({
      title: t('maintenance-mode.deactivate.title'),
      content: t('maintenance-mode.deactivate.text'),
      okText: t('maintenance-mode.deactivate.ok'),
      cancelText: t('cancel'),
      onOk: async () => {
        const response = await deactivate()

        if (!isUndefined(response.error)) {
          trackError(new ApiError(response.error))
        }
      }
    })
  }

  return (
    <IconButton
      aria-label={ t('maintenance-mode.indicator.tooltip') }
      danger
      data-testid="maintenance-mode-indicator"
      icon={ { value: 'tool' } }
      onClick={ deactivateWithConfirmation }
      tooltip={ { title: t('maintenance-mode.indicator.tooltip'), placement: 'right' } }
      type="text"
    />
  )
}
