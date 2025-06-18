import { SaveTaskType, useSave } from '@Pimcore/modules/document/actions/save/use-save'
import React, { useContext, useEffect, useMemo, useRef } from 'react'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { useTranslation } from 'react-i18next'
import { debounce } from 'lodash'
import { useDocumentDraft } from '@Pimcore/modules/document/hooks/use-document-draft'
import { DocumentContext } from '@Pimcore/modules/document/document-provider'

export interface DocumentEditorContextProps {
  updateValue: (key: string, value: any) => void
  getValues: () => Record<string, any>
  getValue: (key: string) => any
  initializeData: (data: Record<string, any>) => void
}

export const DocumentEditorContext = React.createContext<DocumentEditorContextProps | undefined>(undefined)

export interface DocumentEditorProviderProps {
  children: React.ReactNode
}

type ValueType = { type: string, data: any }

export const DocumentEditorProvider = ({ children }: DocumentEditorProviderProps): React.JSX.Element => {
  const valuesRef = useRef<Record<string, ValueType>>({})
  const initializedRef = useRef<boolean>(false)
  const { save, isError } = useSave()
  const {id} = useContext(DocumentContext)
  const {markDocumentEditablesAsModified}= useDocumentDraft(id)

  const messageApi = useMessage()
  const { t } = useTranslation()

  useEffect(() => {
    if (isError) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      messageApi.error(t('auto-save-failed'))
    }
  }, [isError])

  const autoSave = debounce(async () => {
    await save(valuesRef.current, SaveTaskType.AutoSave)
  }, 800)

  const updateDraft = async (): Promise<void> => {
    markDocumentEditablesAsModified()

    await autoSave()
  }

  const contextValue = useMemo(() => ({
    updateValue: (key: string, value: any): void => {
      valuesRef.current[key]['data'] = value
      updateDraft().catch((error) => {
        console.error('Error updating document draft:', error)
      })
    },
    getValues: (): Record<string, ValueType> => valuesRef.current,
    getValue: (key: string): any => {
      return valuesRef.current[key]?.data
    },
    initializeData: (data: Record<string, ValueType>): void => {
      if (!initializedRef.current) {
        valuesRef.current = { ...data }
        initializedRef.current = true
      }
    }
  }), [])

  return (
    <DocumentEditorContext.Provider value={contextValue}>
      {children}
    </DocumentEditorContext.Provider>
  )
}
