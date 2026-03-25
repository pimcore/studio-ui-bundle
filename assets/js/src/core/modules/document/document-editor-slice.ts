/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectSliceWithState } from '@sdk/app'
import { createSlice, createSelector, type PayloadAction } from '@reduxjs/toolkit'
import { isNil, mergeWith, isArray } from 'lodash'

export interface AreablockTypeEntry {
  name: string
  type: string
  areablockName: string
  description?: string
  icon?: string
}

export type AreablockGroupedTypes = Record<string, AreablockTypeEntry[]>

export interface DocumentEditorState {
  documentAreablocks: Record<number, Record<string, AreablockGroupedTypes>>
  timeSliderVisible: Record<number, boolean>
}

const initialState: DocumentEditorState = {
  documentAreablocks: {},
  timeSliderVisible: {}
}

const documentEditorSlice = createSlice({
  name: 'document-editor',
  initialState,
  reducers: {
    setDocumentAreablockTypes: (state, action: PayloadAction<{ documentId: number, editableTypeId: string, areablockTypes: AreablockGroupedTypes }>) => {
      if (isNil(state.documentAreablocks[action.payload.documentId])) {
        state.documentAreablocks[action.payload.documentId] = {}
      }
      state.documentAreablocks[action.payload.documentId][action.payload.editableTypeId] = action.payload.areablockTypes
    },
    mergeDocumentAreablockTypes: (state, action: PayloadAction<{ documentId: number, editableTypeId: string, areablockTypes: AreablockGroupedTypes }>) => {
      if (isNil(state.documentAreablocks[action.payload.documentId])) {
        state.documentAreablocks[action.payload.documentId] = {}
      }

      const existing = state.documentAreablocks[action.payload.documentId][action.payload.editableTypeId] ?? {}
      const incoming = action.payload.areablockTypes

      // Merge-only: add new groups/entries, never remove existing ones.
      const merged: AreablockGroupedTypes = { ...existing }
      for (const [groupName, incomingEntries] of Object.entries(incoming)) {
        const existingEntries = merged[groupName] ?? []
        const existingKeys = new Set(existingEntries.map(e => `${e.areablockName}:${e.type}`))
        const newEntries = incomingEntries.filter(e => !existingKeys.has(`${e.areablockName}:${e.type}`))
        merged[groupName] = [...existingEntries, ...newEntries]
      }

      state.documentAreablocks[action.payload.documentId][action.payload.editableTypeId] = merged
    },
    setDocumentTimeSliderVisible: (state, action: PayloadAction<{ documentId: number, visible: boolean }>) => {
      state.timeSliderVisible[action.payload.documentId] = action.payload.visible
    },
    removeDocument: (state, action: PayloadAction<number>) => {
      const documentId = action.payload
      if (state.documentAreablocks[documentId] !== undefined) {
        const { [documentId]: removed, ...remainingAreablocks } = state.documentAreablocks
        state.documentAreablocks = remainingAreablocks
      }
      if (state.timeSliderVisible[documentId] !== undefined) {
        const { [documentId]: removed, ...remainingTimeSliderVisible } = state.timeSliderVisible
        state.timeSliderVisible = remainingTimeSliderVisible
      }
    },
    clearAllDocuments: (state) => {
      state.documentAreablocks = {}
      state.timeSliderVisible = {}
    }
  }
})

export const { setDocumentAreablockTypes, mergeDocumentAreablockTypes, setDocumentTimeSliderVisible, removeDocument, clearAllDocuments } = documentEditorSlice.actions

export const selectDocumentEditorState = (state: any): DocumentEditorState => state['document-editor']

export const selectDocumentAreablockGroupedTypes = createSelector(
  [selectDocumentEditorState, (_state: any, documentId: number) => documentId],
  (documentEditorState, documentId) => {
    const editableTypeCollections = documentEditorState.documentAreablocks[documentId] ?? {}

    return mergeWith({}, ...Object.values(editableTypeCollections), (objValue, srcValue) => {
      if (isArray(objValue)) {
        return objValue.concat(srcValue)
      }
    }) as AreablockGroupedTypes
  }
)

export const selectDocumentTimeSliderVisible = createSelector(
  [selectDocumentEditorState, (_state: any, documentId: number) => documentId],
  (documentEditorState, documentId) => {
    return documentEditorState.timeSliderVisible[documentId] ?? false
  }
)

export const selectDocumentHasAreablocks = createSelector(
  [selectDocumentAreablockGroupedTypes],
  (areablockGroupedTypes) => {
    return Object.keys(areablockGroupedTypes).length > 0
  }
)

export const selectDocumentAreablockTypes = createSelector(
  [selectDocumentAreablockGroupedTypes],
  (areablockGroupedTypes) => {
    return Object.values(areablockGroupedTypes).flat()
  }
)

export default documentEditorSlice.reducer

injectSliceWithState(documentEditorSlice)
