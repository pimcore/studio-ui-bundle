/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Form } from '@Pimcore/components/form/form'
import React, { createContext, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type SiteFormValues } from '../site-form'
import { App, type FormInstance } from 'antd'
import { isNull } from 'lodash'
import { SiteModal } from './site-modal'

interface SiteModalProviderProps {
  children: React.ReactNode
}

export interface SiteModalContextProps {
  openModal: (config: SiteModalConfig) => string
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
  form: FormInstance<SiteFormValues>
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
    setCurrentModal(prev => !isNull(prev) ? { ...prev, hasUnsavedChanges: true } : null)
  }

  const markFormAsClean = (): void => {
    setCurrentModal(prev => !isNull(prev) ? { ...prev, hasUnsavedChanges: false } : null)
  }

  const openModal = (config: SiteModalConfig): string => {
    const modalId = `site-modal-${config.documentId}`

    if (currentModal !== null) {
      if (currentModal.config.documentId === config.documentId) {
        setCurrentModal(prev => prev !== null ? { ...prev, config } : null)
        return modalId
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
        return modalId
      }
    }

    openNewModal(config)
    return modalId
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
    if (!isNull(currentModal) && hasUnsavedChanges(currentModal)) {
      void modal.confirm({
        title: t('unsaved-changes.title'),
        content: t('unsaved-changes.close-message'),
        okText: t('discard-changes'),
        cancelText: t('cancel'),
        onOk: () => {
          setCurrentModal(null)
        }
      })
    } else {
      setCurrentModal(null)
    }
  }

  const updateModalLoading = (isLoading: boolean): void => {
    setCurrentModal(prev => !isNull(prev) ? { ...prev, isLoading } : null)
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
      {!isNull(currentModal) && (
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
