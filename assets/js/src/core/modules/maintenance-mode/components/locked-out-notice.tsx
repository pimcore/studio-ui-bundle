/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { useAppDispatch, useAppSelector } from '@Pimcore/app/store'
import { Button } from '@Pimcore/components/button/button'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { Modal } from '@Pimcore/components/modal/modal'
import { Text } from '@Pimcore/components/text/text'
import { reloadPage } from '@Pimcore/modules/auth/util/session-end'
import { selectIsLockedOut, setLockedOut } from '../maintenance-mode-slice'

export const PING_INTERVAL = 30_000

const isAvailableAgain = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${getPrefix()}/settings/ping`, { credentials: 'same-origin' })

    return response.status !== 503
  } catch {
    return false
  }
}

/**
 * Shown while Studio's API answers this session with the maintenance page. It stays open until
 * the ping is answered again; the failed request is not sent again.
 */
export const LockedOutNotice = (): React.JSX.Element => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const isLockedOut = useAppSelector(selectIsLockedOut)

  useEffect(() => {
    if (!isLockedOut) {
      return
    }

    const interval = setInterval(() => {
      void isAvailableAgain().then(available => {
        if (available) {
          dispatch(setLockedOut(false))
        }
      })
    }, PING_INTERVAL)

    return () => { clearInterval(interval) }
  }, [isLockedOut])

  return (
    <Modal
      closable={ false }
      footer={
        <ModalFooter>
          <Button
            onClick={ reloadPage }
            type="primary"
          >
            {t('maintenance-mode.locked-out.reload')}
          </Button>
        </ModalFooter>
      }
      iconName="tool"
      keyboard={ false }
      maskClosable={ false }
      open={ isLockedOut }
      title={ t('maintenance-mode.locked-out.title') }
    >
      <Text data-testid="maintenance-mode-locked-out-notice">{t('maintenance-mode.locked-out.text')}</Text>
    </Modal>
  )
}
