import { useEffect, useState } from "react"
import { AboutDialog } from "./about-dialog"
import React from "react"
import { useTranslation } from "react-i18next"
import { useModalHolder } from "@Pimcore/modules/app/modal-holder/use-modal-holder"

export const AboutDialogContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { addModal, removeModal } = useModalHolder()
  const modalId = 'about-dialog-modal'

  const closeModal = (): void => {
    if (isOpen === true) {
      setIsOpen(false)
      removeModal(modalId)
    }
  }

  const openModal = (): void => {
    if (isOpen === false) {
      setIsOpen(true)
    }
  }

  useEffect(() => {
    if (isOpen === true) {
      addModal(
        modalId,
        <AboutDialog
          open={isOpen}
          onClose={closeModal}
          onCancel={closeModal}
          onOk={closeModal}
        />
      )
    }
  }, [isOpen])

  return (
    <>
      <button
        className={'main-nav__list-btn'}
        onClick={() => openModal()}
      >
        {t('navigation.about')}
      </button>
    </>
  )
}