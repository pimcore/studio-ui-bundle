/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type WidgetConfig } from '@Pimcore/modules/perspectives/perspectives-slice.enhanced'
import { Form, Modal } from '@sdk/components'
import React, { createContext, type Dispatch, type SetStateAction, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useWidgetEditor } from '../hooks/use-widget-editor'
import { type InputRef } from 'antd'
import { CreateWidgetForm, WidgetForm } from '../components/widget-create-form/widget-create-form'

interface WidgetEditorProviderProps {
  children?: React.ReactNode
}

export interface WidgetEditorContextProps {
  activeTabId: string | undefined
  setActiveTabId: (id: string | undefined) => void
  widgets: WidgetConfig[]
  setWidgets: Dispatch<SetStateAction<WidgetConfig[]>>
  openWidget: (id: string, type: string) => Promise<void>
  closeWidget: (id: string) => void
  createWidget: () => Promise<void>
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export const WidgetEditorContext = createContext<WidgetEditorContextProps | undefined>(undefined)

export const WidgetEditorProvider = ({ children }: WidgetEditorProviderProps): React.JSX.Element => {
  const [activeTabId, setActiveTabId] = useState<string | undefined>(undefined)
  const [widgets, setWidgets] = useState<WidgetConfig[]>([])
  const { getWidgetById } = useWidgetEditor()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { createWidget: createWidgetHook } = useWidgetEditor()
  const { t } = useTranslation()
  const [tmpForm] = Form.useForm()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const inputRef = React.useRef<InputRef>(null)

  useEffect(() => {
    if (isModalOpen) {
      inputRef.current?.focus()
    }
  }, [isModalOpen])

  const openWidget = async (id: string, type: string): Promise<void> => {
    const widget = await getWidgetById(id, type)

    if (widget !== undefined) {
      setWidgets((prev) => {
        const existingIndex = prev.findIndex(p => p.id === widget.id)
        if (existingIndex >= 0) {
          // Widget already exists, just activate it
          setActiveTabId(widget.id)
          return prev
        } else {
          // Add new widget and activate it
          setActiveTabId(widget.id)
          return [
            ...prev,
            widget
          ]
        }
      })
    }
  }

  const closeWidget = (id: string): void => {
    const updatedWidgets = widgets.filter(widget => widget.id !== id)
    setWidgets(updatedWidgets)

    if (activeTabId === id) {
      const remainingWidgets = updatedWidgets
      if (remainingWidgets.length > 0) {
        setActiveTabId(remainingWidgets[0].id)
      } else {
        setActiveTabId(undefined)
      }
    }
  }

  const createWidget = async (): Promise<void> => {
    setIsModalOpen(true)
  }

  const submit = async (): Promise<any> => {
    await tmpForm.validateFields()
      .then(async () => {
        setIsLoading(true)
        const values = tmpForm.getFieldsValue()
        const { name, widgetType } = values as WidgetForm

        await createWidgetHook(name, widgetType, () => {
          setIsModalOpen(false)

          tmpForm.resetFields()
        })

        setIsLoading(false)
      })
  }

  const contextValue: WidgetEditorContextProps = useMemo(() => ({
    activeTabId,
    setActiveTabId,
    widgets,
    setWidgets,
    openWidget,
    closeWidget,
    createWidget,
    isLoading,
    setIsLoading
  }), [activeTabId, widgets, isLoading])

  return (
    <WidgetEditorContext.Provider value={contextValue}>
      {children}

      <Modal
        okText={t('widget-editor.create-modal.create')}
        onCancel={() => {
          setIsModalOpen(false)
        }}
        onOk={async () => {
          await submit()
        }}
        okButtonProps={{
          loading: isLoading
        }}
        open={isModalOpen}
        size='M'
      >
        <CreateWidgetForm
          form={tmpForm}
          inputRef={inputRef}
        />
      </Modal>
    </WidgetEditorContext.Provider>
  )
}
