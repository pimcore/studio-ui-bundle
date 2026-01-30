/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Form, type formInstanceType } from '@Pimcore/components/form/form'
import React, { createContext, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type SiteFormValues } from '../site-form'
import { App } from 'antd'
import { isNull } from 'lodash'
import { SiteModal } from './site-modal'

interface SiteModalProviderProps {
  children: React.ReactNode
}

export interface SiteModalContextProps {
  openModal: (config: SiteModalConfig) => void
  closeModal: () => void
  isOpen: boolean
  currentDocumentId: number | null
}

export interface SiteModalConfig {
  title: string
  documentId: number
  documentPath?: string
  initialValues: SiteFormValues
  onSubmit: (values: SiteFormValues) => Promise<void>
}

interface CurrentModal {
  config: SiteModalConfig
  form: formInstanceType<SiteFormValues>
  isLoading: boolean
  hasUnsavedChanges: boolean
}

export const SiteModalContext = createContext<SiteModalContextProps | undefined>(undefined)

export const SiteModalProvider = ({ children }: SiteModalProviderProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { modal } = App.useApp()
  const [currentModal, setCurrentModal] = useState<CurrentModal | null>(null)
  const [form] = Form.useForm<SiteFormValues>()

  const hasUnsavedChanges = (modal: CurrentModal): boolean => {
    return modal.hasUnsavedChanges
  }

  const markFormAsChanged = (): void => {
    setCurrentModal(prev => isNull(prev) ? null : { ...prev, hasUnsavedChanges: true })
  }

  const markFormAsClean = (): void => {
    setCurrentModal(prev => isNull(prev) ? null : { ...prev, hasUnsavedChanges: false })
  }

  const openModal = (config: SiteModalConfig): void => {
    if (!isNull(currentModal)) {
      if (currentModal.config.documentId === config.documentId) {
        setCurrentModal(prev => isNull(prev) ? null : { ...prev, config })
        return
      }

      if (hasUnsavedChanges(currentModal)) {
        void modal.confirm({
          title: t('unsaved-changes.title'),
          content: t('unsaved-changes.message'),
          okText: t('save-and-continue'),
          cancelText: t('discard-and-continue'),
          onOk: () => {
            void (async () => {
              try {
                const values = currentModal.form.getFieldsValue()
                await currentModal.config.onSubmit(values)
                openNewModal(config)
              } catch (error) {
                console.error('Failed to save current changes:', error)
              }
            })()
          },
          onCancel: () => {
            openNewModal(config)
          }
        })
        return
      }
    }

    openNewModal(config)
  }

  const openNewModal = (config: SiteModalConfig): void => {
    form.resetFields()
    form.setFieldsValue(config.initialValues)

    const newModal: CurrentModal = {
      config,
      form,
      isLoading: false,
      hasUnsavedChanges: false
    }

    setCurrentModal(newModal)
  }

  const closeModal = (): void => {
    if (isNull(currentModal) || !hasUnsavedChanges(currentModal)) {
      setCurrentModal(null)
    } else {
      void modal.confirm({
        title: t('unsaved-changes.title'),
        content: t('unsaved-changes.close-message'),
        okText: t('discard-changes'),
        cancelText: t('cancel'),
        onOk: () => {
          setCurrentModal(null)
        }
      })
    }
  }

  const updateModalLoading = (isLoading: boolean): void => {
    setCurrentModal(prev => isNull(prev) ? null : { ...prev, isLoading })
  }

  const handleModalSubmit = async (values: SiteFormValues): Promise<void> => {
    if (isNull(currentModal)) return

    updateModalLoading(true)

    try {
      await currentModal.config.onSubmit(values)
      markFormAsClean()
      setCurrentModal(null)
    } catch (error) {
      console.error('Site modal submission failed:', error)
    } finally {
      updateModalLoading(false)
    }
  }

  const contextValue = useMemo(() => ({
    openModal,
    closeModal,
    isOpen: currentModal !== null,
    currentDocumentId: currentModal?.config.documentId ?? null
  }), [currentModal])

  return (
    <SiteModalContext.Provider value={ contextValue }>
      {isNull(currentModal)
        ? null
        : (
          <SiteModal
            modal={ currentModal }
            onClose={ closeModal }
            onFormChange={ markFormAsChanged }
            onSubmit={ handleModalSubmit }
          />
          )}

      {children}
    </SiteModalContext.Provider>
  )
}
