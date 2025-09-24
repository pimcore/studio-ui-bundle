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

export interface AreablockTypeEntry {
  name: string
  type: string
  areablockName: string
  description?: string
  icon?: string
}

export type AreablockGroupedTypes = Record<string, AreablockTypeEntry[]>

export interface DocumentEditorState {
  documentAreablocks: Record<number, AreablockGroupedTypes>
}

const initialState: DocumentEditorState = {
  documentAreablocks: {}
}

const documentEditorSlice = createSlice({
  name: 'document-editor',
  initialState,
  reducers: {
    setDocumentAreablockTypes: (state, action: PayloadAction<{ documentId: number, areablockTypes: AreablockGroupedTypes }>) => {
      state.documentAreablocks[action.payload.documentId] = action.payload.areablockTypes
    },
    removeDocument: (state, action: PayloadAction<number>) => {
      const documentId = action.payload
      if (state.documentAreablocks[documentId] !== undefined) {
        const { [documentId]: removed, ...remainingAreablocks } = state.documentAreablocks
        state.documentAreablocks = remainingAreablocks
      }
    },
    clearAllDocuments: (state) => {
      state.documentAreablocks = {}
    }
  }
})

export const { setDocumentAreablockTypes, removeDocument, clearAllDocuments } = documentEditorSlice.actions

export const selectDocumentEditorState = (state: any): DocumentEditorState => state['document-editor']

export const selectDocumentAreablockGroupedTypes = createSelector(
  [selectDocumentEditorState, (_state: any, documentId: number) => documentId],
  (documentEditorState, documentId) => {
    return documentEditorState.documentAreablocks[documentId] ?? {}
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
