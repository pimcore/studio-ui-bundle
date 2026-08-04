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
import React, { createContext, useCallback, useContext, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export interface UnsavedChangesHandler {
  isDirty: () => boolean
  /** Resolves to false when saving was not possible (e.g. validation failed). */
  save: () => Promise<boolean>
}

export interface IUnsavedChangesContext {
  /**
   * Registers the handler of the currently open detail view (the modal
   * shows one at a time). Returns an unregister function for effect cleanup.
   */
  register: (handler: UnsavedChangesHandler) => () => void
  /**
   * Runs onProceed immediately when there are no unsaved changes; otherwise
   * warns the user first, offering to save and continue (runs onProceed after
   * a successful save) or cancel (aborts, onProceed never runs). Used both when
   * switching custom layouts and when closing the custom layout modal.
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
  const handlerRef = useRef<UnsavedChangesHandler | null>(null)

  const register = useCallback((handler: UnsavedChangesHandler) => {
    handlerRef.current = handler

    return () => {
      if (handlerRef.current === handler) {
        handlerRef.current = null
      }
    }
  }, [])

  const guard = useCallback((onProceed: () => void): void => {
    if (handlerRef.current?.isDirty() !== true) {
      onProceed()
      return
    }

    modal.confirm({
      type: 'warning',
      title: t('unsaved-changes.title'),
      content: t('unsaved-changes.message'),
      okText: t('save-and-continue'),
      cancelText: t('cancel'),
      keyboard: false,
      onOk: async () => {
        if ((await handlerRef.current?.save()) ?? true) {
          onProceed()
        }
      }
    })
  }, [modal, t])

  const value = useMemo<IUnsavedChangesContext>(() => ({ register, guard }), [register, guard])

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
