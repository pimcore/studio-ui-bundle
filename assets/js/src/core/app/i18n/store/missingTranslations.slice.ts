/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { addAppMiddleware, injectSliceWithState, type RootState } from '@sdk/app'
import { createListenerMiddleware, createSlice } from '@reduxjs/toolkit'
import { debounce } from 'lodash'
import { addNewTranslations } from '../helper/translation-helper'

const initialState: string[] = []

const slice = createSlice({
  name: 'missingTranslations',
  initialState,
  reducers: {
    addMissingTranslation: (state, { payload }) => {
      state.push(payload as string)
    },
    removeMissingTranslations: (state, { payload }) => {
      const translationsToRemove = Array.isArray(payload) ? payload : [payload]
      return state.filter((translation) => !translationsToRemove.includes(translation))
    }
  }
})

export const { addMissingTranslation, removeMissingTranslations } = slice.actions

export const missingTranslationsSliceName = slice.name

injectSliceWithState(slice)

export const selectMissingTranslations = (state: RootState): string[] => state.missingTranslations

const debouncedSendTranslations = debounce(async (listenerApi) => {
  const state = listenerApi.getState() as RootState
  const translations = selectMissingTranslations(state)

  listenerApi.dispatch(removeMissingTranslations(translations))
  void addNewTranslations(translations)
}, 3000) // Wait for 3 seconds of inactivity before sending

const listenerMiddleware = createListenerMiddleware()
listenerMiddleware.startListening({
  actionCreator: addMissingTranslation,
  effect: async (action, listenerApi) => {
    debouncedSendTranslations.cancel()
    void debouncedSendTranslations(listenerApi)
  }
})

addAppMiddleware(listenerMiddleware.middleware)
