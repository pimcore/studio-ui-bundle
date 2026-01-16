/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { useModalHolder } from '@Pimcore/modules/app/modal-holder/use-modal-holder'
import { AboutDialog } from './../about-dialog'
import { isUndefined } from 'lodash'

interface IAboutDialogContext {
  open: () => void
}

const AboutDialogContext = createContext<IAboutDialogContext | undefined>(undefined)

export const AboutDialogProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const { addModal, removeModal } = useModalHolder()
  const modalId = 'about-dialog-modal'

  const close = (): void => {
    if (isOpen) {
      setIsOpen(false)
      removeModal(modalId)
    }
  }

  const open = (): void => {
    if (!isOpen) {
      setIsOpen(true)
    }
  }

  useEffect(() => {
    if (isOpen) {
      addModal(
        modalId,
        <AboutDialog
          onCancel={ close }
          onClose={ close }
          onOk={ close }
          open={ isOpen }
        />
      )
    }
  }, [isOpen])

  const value = useMemo(() => ({ open }),
    [open]
  )

  return (
    <AboutDialogContext.Provider value={ value }>
      {children}
    </AboutDialogContext.Provider>
  )
}

export const useAboutDialogContext = (): IAboutDialogContext => {
  const context = useContext(AboutDialogContext)

  if (isUndefined(context)) {
    throw new Error('useAboutDialogContext must be used within a AboutDialogProvider')
  }

  return context
}
