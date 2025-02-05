/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React, { createContext, useContext, useMemo, useRef, useCallback } from 'react'
import { type FormInstance } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { debounce } from 'lodash'

interface EditFormContextProps {
  form: FormInstance
  updateModifiedDataObjectAttributes: (changedValues: Record<string, any>) => void
  commitToDraft: (useDebounce?: boolean) => void
  getModifiedDataObjectAttributes: () => Record<string, any>
}

const EditFormContext = createContext<EditFormContextProps | undefined>(undefined)

export const useEditFormContext = (): EditFormContextProps => {
  const context = useContext(EditFormContext)
  if (context === undefined) {
    throw new Error('useEditFormContext must be used within a FormProvider')
  }
  return context
}

export const EditFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [form] = useForm()
  const modifiedDataObjectAttributesRef = useRef<Record<string, any>>({})
  const { id } = useElementContext()
  const { trackModifiedObjectData, getCurrentDraftState } = useDataObjectDraft(id)

  const updateModifiedDataObjectAttributes = (changedValues: Record<string, any>): void => {
    modifiedDataObjectAttributesRef.current = { ...modifiedDataObjectAttributesRef.current, ...changedValues }
  }

  const resetModifiedDataObjectAttributes = (): void => {
    modifiedDataObjectAttributesRef.current = {}
  }

  const commitToDraft = useCallback(
    (useDebounce: boolean = false): void => {
      const commit = (): void => {
        if (Object.keys(modifiedDataObjectAttributesRef.current).length !== 0) {
          trackModifiedObjectData({ ...modifiedDataObjectAttributesRef.current })
          resetModifiedDataObjectAttributes()
        }
      }

      if (useDebounce) {
        debounce(commit, 300)()
      } else {
        commit()
      }
    },
    [trackModifiedObjectData]
  )

  const getModifiedDataObjectAttributes = (): Record<string, any> => {
    commitToDraft()
    const draftState = getCurrentDraftState()
    return draftState === undefined ? {} : draftState.modifiedObjectData
  }

  const value = useMemo(() => ({
    form,
    updateModifiedDataObjectAttributes,
    commitToDraft,
    getModifiedDataObjectAttributes
  }), [form, commitToDraft])

  return (
    <EditFormContext.Provider value={ value }>
      {children}
    </EditFormContext.Provider>
  )
}
