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
import React, { createContext, type Dispatch, type SetStateAction, useCallback, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useWidgetEditor } from '../hooks/use-widget-editor'
import { type InputRef } from 'antd'
import { CreateWidgetForm, type WidgetForm } from '../components/widget-create-form/widget-create-form'

interface WidgetEditorProviderProps {
  children?: React.ReactNode
}

export interface ActiveTabContextProps {
  activeTabId: string | undefined
  setActiveTabId: (id: string | undefined) => void
}

/** Data context: changes when `widgets` array changes (add/remove/update) */
export interface WidgetEditorDataContextProps {
  widgets: WidgetConfig[]
}

/** Actions context: contains only stable function references that never change */
export interface WidgetEditorActionsContextProps {
  setWidgets: Dispatch<SetStateAction<WidgetConfig[]>>
  openWidget: (id: string, type: string) => Promise<void>
  closeWidget: (id: string) => void
  createWidget: () => void
}

export const ActiveTabContext = createContext<ActiveTabContextProps | undefined>(undefined)
export const WidgetEditorDataContext = createContext<WidgetEditorDataContextProps | undefined>(undefined)
export const WidgetEditorActionsContext = createContext<WidgetEditorActionsContextProps | undefined>(undefined)

export const WidgetEditorProvider = ({ children }: WidgetEditorProviderProps): React.JSX.Element => {
  const [activeTabId, setActiveTabId] = useState<string | undefined>(undefined)
  const [widgets, setWidgets] = useState<WidgetConfig[]>([])
  const { getWidgetById, createWidget: createWidgetHook, isLoading } = useWidgetEditor()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { t } = useTranslation()
  const [tmpForm] = Form.useForm()
  const inputRef = React.useRef<InputRef>(null)
  const createWidgetHookRef = useRef(createWidgetHook)
  createWidgetHookRef.current = createWidgetHook

  const openWidget = useCallback(async (id: string, type: string): Promise<void> => {
    const widget = await getWidgetById(id, type)

    if (widget !== undefined) {
      setWidgets((prev) => {
        const existingIndex = prev.findIndex(p => p.id === widget.id)
        if (existingIndex >= 0) {
          setActiveTabId(widget.id)
          return prev
        } else {
          setActiveTabId(widget.id)
          return [
            ...prev,
            widget
          ]
        }
      })
    }
  }, [getWidgetById])

  const closeWidget = useCallback((id: string): void => {
    setWidgets((prev) => {
      const updatedWidgets = prev.filter(widget => widget.id !== id)

      setActiveTabId((currentActiveTabId) => {
        if (currentActiveTabId === id) {
          return updatedWidgets.length > 0 ? updatedWidgets[0].id : undefined
        }
        return currentActiveTabId
      })

      return updatedWidgets
    })
  }, [])

  const createWidget = useCallback((): void => {
    setIsModalOpen(true)
  }, [])

  const submit = async (): Promise<any> => {
    await tmpForm.validateFields()
      .then(async () => {
        const values = tmpForm.getFieldsValue()
        const { name, widgetType } = values as WidgetForm

        await createWidgetHookRef.current(name, widgetType, (id: string) => {
          setIsModalOpen(false)
          tmpForm.resetFields()
          void openWidget(id, widgetType)
        })
      })
  }

  const activeTabValue: ActiveTabContextProps = useMemo(() => ({
    activeTabId,
    setActiveTabId
  }), [activeTabId])

  const dataValue: WidgetEditorDataContextProps = useMemo(() => ({
    widgets
  }), [widgets])

  const actionsValue: WidgetEditorActionsContextProps = useMemo(() => ({
    setWidgets,
    openWidget,
    closeWidget,
    createWidget
  }), [openWidget, closeWidget, createWidget])

  return (
    <WidgetEditorActionsContext.Provider value={ actionsValue }>
      <WidgetEditorDataContext.Provider value={ dataValue }>
        <ActiveTabContext.Provider value={ activeTabValue }>
          {children}

          <Modal
            afterOpenChange={ (open) => {
              if (open) {
                inputRef.current?.focus()
              }
            } }
            okButtonProps={ {
              loading: isLoading
            } }
            okText={ t('widget-editor.create-modal.create') }
            onCancel={ () => {
              setIsModalOpen(false)
            } }
            onOk={ async () => {
              await submit()
            } }
            open={ isModalOpen }
            size='M'
          >
            <CreateWidgetForm
              form={ tmpForm }
              inputRef={ inputRef }
              onPressEnter={ () => { void submit() } }
            />
          </Modal>
        </ActiveTabContext.Provider>
      </WidgetEditorDataContext.Provider>
    </WidgetEditorActionsContext.Provider>
  )
}
