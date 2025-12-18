/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { currentDomain } from '@Pimcore/app/config/app-config'
import { routes } from '@Pimcore/app/router/router'
import { Button } from '@Pimcore/components/button/button'
import { useModalHolder } from '@Pimcore/modules/app/modal-holder/use-modal-holder'
import { useUserManagementContext } from '@Pimcore/modules/user/hooks/use-user-management-context'
import { useLazyUserTokenLinkGetQuery } from '@Pimcore/modules/user/user-api-slice-enhanced'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath } from 'react-router-dom'
import { LoginTokenModal } from './login-token-modal'

interface LoginTokenModalContainerProps {
  disabled?: boolean
}

export const LoginTokenModalContainer = ({ disabled }: LoginTokenModalContainerProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { addModal, removeModal } = useModalHolder()
  const modalId = 'login-as-different-user-modal'
  const { id } = useUserManagementContext()
  const [trigger, { data, isLoading, isFetching }] = useLazyUserTokenLinkGetQuery()

  const closeModal = (): void => {
    if (isOpen) {
      setIsOpen(false)
      removeModal(modalId)
    }
  }

  const openModal = async (): Promise<void> => {
    if (!isOpen) {
      await trigger({
        id,
        tokenLink: {
          tokenLoginUrl: `${currentDomain}${generatePath(routes.login)}`
        }
      })
      setIsOpen(true)
    }
  }

  useEffect(() => {
    if (isOpen) {
      addModal(
        modalId,
        <LoginTokenModal
          isLoading={ isLoading || isFetching }
          onCancel={ closeModal }
          onClose={ closeModal }
          onOk={ closeModal }
          open={ isOpen }
          tokenUrl={ data?.link ?? '' }
        />
      )
    }
  }, [isOpen, data, isLoading])

  return (
    <Button
      disabled={ disabled }
      loading={ isLoading || isFetching }
      onClick={ openModal }
      type="default"
    >
      {t('user-management.admin.login')}
    </Button>
  )
}
