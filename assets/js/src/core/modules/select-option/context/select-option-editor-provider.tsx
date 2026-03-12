/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type SelectOptionDetail } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { isNil } from 'lodash'
import React, { createContext, useMemo, useState, type Dispatch, type SetStateAction } from 'react'
import { useSelectOptionEditor } from '../hooks/use-select-option-editor'

interface SelectOptionEditorProviderProps {
  children?: React.ReactNode
}

export interface SelectOptionEditorContextProps {
  activeTabId: string | undefined
  setActiveTabId: (id: string | undefined) => void
  selectOptions: SelectOptionDetail[]
  setSelectOptions: Dispatch<SetStateAction<SelectOptionDetail[]>>
  openSelectOption: (id: string) => Promise<void>
  closeSelectOption: (id: string) => void
}

export const SelectOptionEditorContext = createContext<SelectOptionEditorContextProps | undefined>(undefined)

export const SelectOptionEditorProvider = ({ children }: SelectOptionEditorProviderProps): React.JSX.Element => {
  const [activeTabId, setActiveTabId] = useState<string | undefined>(undefined)
  const [selectOptions, setSelectOptions] = useState<SelectOptionDetail[]>([])
  const { getSelectOptionById } = useSelectOptionEditor()

  const openSelectOption = async (id: string): Promise<void> => {
    const selectOption = await getSelectOptionById(id)
    if (!isNil(selectOption)) {
      setSelectOptions((prev) => {
        const existingIndex = prev.findIndex(s => s.id === selectOption.id)
        if (existingIndex >= 0) {
          setActiveTabId(selectOption.id)
          return prev
        } else {
          setActiveTabId(selectOption.id)
          return [
            ...prev,
            selectOption
          ]
        }
      })
    }
  }

  const closeSelectOption = (id: string): void => {
    const updatedSelectOptions = selectOptions.filter(s => s.id !== id)
    setSelectOptions(updatedSelectOptions)

    if (activeTabId === id) {
      if (updatedSelectOptions.length > 0) {
        setActiveTabId(updatedSelectOptions[0].id)
      } else {
        setActiveTabId(undefined)
      }
    }
  }

  const contextValue: SelectOptionEditorContextProps = useMemo(() => ({
    activeTabId,
    setActiveTabId,
    selectOptions,
    setSelectOptions,
    openSelectOption,
    closeSelectOption
  }), [activeTabId, selectOptions])

  return (
    <SelectOptionEditorContext.Provider value={ contextValue }>
      {children}
    </SelectOptionEditorContext.Provider>
  )
}
