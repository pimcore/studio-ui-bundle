import { routes } from "@Pimcore/app/router/router"
import { Button } from "@Pimcore/components/button/button"
import { useModalHolder } from "@Pimcore/modules/app/modal-holder/use-modal-holder"
import { useUserManagementContext } from "@Pimcore/modules/user/hooks/use-user-management-context"
import { useUserTokenLinkGetQuery } from "@Pimcore/modules/user/user-api-slice-enhanced"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { generatePath } from "react-router-dom"
import { LoginTokenModal } from "./login-token-modal"
import { currentDomain } from "@Pimcore/app/config/app-config"

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
    }
  }

  const openModal = (): void => {
    if (!isOpen) {
      refetch()
      setIsOpen(true)
    }
  }

  useEffect(() => {
    if (isOpen) {
      addModal(
        modalId,
        <LoginTokenModal
          isLoading={isLoading}
          tokenUrl={data?.link ?? ''}
          onCancel={closeModal}
          onClose={closeModal}
          onOk={closeModal}
          open={isOpen}
        />
      )
    }
  }, [isOpen])

  return (
    <Button
      disabled={disabled}
      onClick={openModal}
      type="default"
    >
      {t('user-management.admin.login')}
    </Button>
  )
}