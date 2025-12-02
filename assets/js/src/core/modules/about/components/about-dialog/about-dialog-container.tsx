/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { AboutDialog } from './about-dialog'
import { useTranslation } from 'react-i18next'
import { useModalHolder } from '@Pimcore/modules/app/modal-holder/use-modal-holder'

export const AboutDialogContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { addModal, removeModal } = useModalHolder()
  const modalId = 'about-dialog-modal'

  const closeModal = (): void => {
    if (isOpen) {
      setIsOpen(false)
      removeModal(modalId)
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
        <AboutDialog
          onCancel={ closeModal }
          onClose={ closeModal }
          onOk={ closeModal }
          open={ isOpen }
        />
      )
    }
  }, [isOpen])

  return (
    <button
      className={ 'main-nav__list-btn' }
      onClick={ () => { openModal() } }
    >
      {t('navigation.about')}
    </button>
  )
}
