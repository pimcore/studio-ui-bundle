/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useCallback, useContext, useMemo, useRef } from 'react'
import { ClassificationStoreModalProvider, useClassificationStoreModal } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider/classifcation-store-modal-provider'
import { TabId } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/types'

export interface ClassificationStoreFieldValue {
  groupId: number
  keyId: number
  keyName: string
}

export interface OpenClassificationStorePickerArgs {
  storeId: number
  fieldName: string
  classId?: string
  onPick: (value: ClassificationStoreFieldValue) => void
}

export interface ClassificationStoreFieldPickerContextValue {
  openPicker: (args: OpenClassificationStorePickerArgs) => void
}

const ClassificationStoreFieldPickerContext = createContext<ClassificationStoreFieldPickerContextValue | undefined>(undefined)

export const useClassificationStoreFieldPicker = (): ClassificationStoreFieldPickerContextValue => {
  const context = useContext(ClassificationStoreFieldPickerContext)

  if (context === undefined) {
    throw new Error('useClassificationStoreFieldPicker must be used within a ClassificationStoreFieldPickerProvider')
  }

  return context
}

const Coordinator = ({ defaultClassId, children }: { defaultClassId?: string, children: React.ReactNode }): React.JSX.Element => {
  const onPickRef = useRef<OpenClassificationStorePickerArgs['onPick'] | undefined>(undefined)

  const onUpdate = useCallback((data: { type: TabId, data: Array<Record<string, any>> }): void => {
    const item = data?.data?.[0]
    if (item === undefined) {
      return
    }

    onPickRef.current?.({
      groupId: item.groupId,
      keyId: item.id,
      keyName: item.name
    })
    onPickRef.current = undefined
  }, [])

  const { openModal } = useClassificationStoreModal({ onUpdate })

  const openPicker = useCallback((args: OpenClassificationStorePickerArgs): void => {
    onPickRef.current = args.onPick

    openModal({
      storeId: args.storeId,
      classId: args.classId ?? defaultClassId ?? '',
      fieldName: args.fieldName,
      name: args.fieldName,
      allowedTabs: [TabId.GroupByKey],
      singleSelection: true
    })
  }, [openModal, defaultClassId])

  const contextValue = useMemo(() => ({ openPicker }), [openPicker])

  return (
    <ClassificationStoreFieldPickerContext.Provider value={ contextValue }>
      {children}
    </ClassificationStoreFieldPickerContext.Provider>
  )
}

export interface ClassificationStoreFieldPickerProviderProps {
  /** Default class id picked group/key relations are scoped to (the listing class for simple fields). */
  defaultClassId?: string
  children: React.ReactNode
}

/**
 * Provides an isolated, single-select classification store modal for grid source-field configuration.
 *
 * The shared {@link ClassificationStoreModalProvider} only tracks a single update callback at a time,
 * so a dedicated (nested) provider is used here to avoid clashing with the modal that the regular
 * "add column" flow already drives. The coordinator restricts the modal to a single group/key
 * selection and routes the result back to the field that opened it.
 */
export const ClassificationStoreFieldPickerProvider = ({ defaultClassId, children }: ClassificationStoreFieldPickerProviderProps): React.JSX.Element => {
  return (
    <ClassificationStoreModalProvider>
      <Coordinator defaultClassId={ defaultClassId }>
        {children}
      </Coordinator>
    </ClassificationStoreModalProvider>
  )
}
