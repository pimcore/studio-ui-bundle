/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { routes } from '@Pimcore/app/router/router'
import { Button } from '@Pimcore/components/button/button'
import { useModalHolder } from '@Pimcore/modules/app/modal-holder/use-modal-holder'
import { useUserManagementContext } from '@Pimcore/modules/user/hooks/use-user-management-context'
import { useUserTokenLinkGetQuery } from '@Pimcore/modules/user/user-api-slice-enhanced'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath } from 'react-router-dom'
import { LoginTokenModal } from './login-token-modal'
import { currentDomain } from '@Pimcore/app/config/app-config'

interface LoginTokenModalContainerProps {
  disabled?: boolean
}

export const LoginTokenModalContainer = ({ disabled }: LoginTokenModalContainerProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { addModal, removeModal } = useModalHolder()
  const modalId = 'login-as-different-user-modal'
  const { id } = useUserManagementContext()
  const { data, isLoading, refetch } = useUserTokenLinkGetQuery({
    id,
    tokenLink: {
      tokenLoginUrl: `${currentDomain}${generatePath(routes.login)}`
    }
  })

  const closeModal = (): void => {
    if (isOpen) {
      setIsOpen(false)
      removeModal(modalId)
      void refetch()
    }
  }

  const openModal = (): void => {
    if (!isOpen) {
      setIsOpen(true)
    }
  }

  useEffect(() => {
    if (isOpen) {
      addModal(
        modalId,
        <LoginTokenModal
          isLoading={ isLoading }
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
      onClick={ openModal }
      type="default"
    >
      {t('user-management.admin.login')}
    </Button>
  )
}
