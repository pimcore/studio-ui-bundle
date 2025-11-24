import { useState } from "react"
import { AboutDialog } from "./about-dialog"
import React from "react"
import { useTranslation } from "react-i18next"

export const AboutDialogContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <button
        className={'main-nav__list-btn'}
        onClick={() => setIsOpen(true)}
      >
        {t('navigation.about')}
      </button>

      <AboutDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}