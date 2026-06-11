/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useFormModal } from '@sdk/components'
import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export interface IUnsavedChangesContext {
  isModified: boolean
  setIsModified: (modified: boolean) => void
  /**
   * Save handler registered by the currently mounted detail view.
   * Resolves to false when saving was not possible (e.g. validation
   * failed); a guarded navigation is aborted in that case.
   */
  saveFnRef: React.MutableRefObject<(() => Promise<boolean>) | null>
  /**
   * Runs onProceed immediately when there are no unsaved changes;
   * otherwise asks the user to save or discard them first.
   */
  guard: (onProceed: () => void) => void
}

const UnsavedChangesContext = createContext<IUnsavedChangesContext | undefined>(undefined)

export interface UnsavedChangesProviderProps {
  children: React.ReactNode
}

export const UnsavedChangesProvider = (props: UnsavedChangesProviderProps): React.JSX.Element => {
  const { t } = useTranslation()
  const modal = useFormModal()
  const [isModified, setIsModified] = useState(false)
  const saveFnRef = useRef<(() => Promise<boolean>) | null>(null)

  const guard = useCallback((onProceed: () => void): void => {
    if (!isModified) {
      onProceed()
      return
    }

    modal.confirm({
      type: 'warning',
      title: t('unsaved-changes.title'),
      content: t('unsaved-changes.message'),
      okText: t('save'),
      cancelText: t('discard-changes'),
      onOk: async () => {
        if (saveFnRef.current !== null && !(await saveFnRef.current())) {
          return
        }

        setIsModified(false)
        onProceed()
      },
      onCancel: () => {
        setIsModified(false)
        onProceed()
      }
    })
  }, [isModified, modal, t])

  const value = useMemo<IUnsavedChangesContext>(() => ({
    isModified,
    setIsModified,
    saveFnRef,
    guard
  }), [isModified, guard])

  return (
    <UnsavedChangesContext.Provider value={ value }>
      {props.children}
    </UnsavedChangesContext.Provider>
  )
}

export const useUnsavedChanges = (): IUnsavedChangesContext => {
  const context = useContext(UnsavedChangesContext)

  if (context === undefined) {
    throw new Error('useUnsavedChanges must be used within an UnsavedChangesProvider')
  }

  return context
}

export const useOptionalUnsavedChanges = (): IUnsavedChangesContext | undefined => {
  return useContext(UnsavedChangesContext)
}
