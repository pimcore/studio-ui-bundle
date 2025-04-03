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

import { addAppMiddleware, injectSliceWithState, type RootState } from '@Pimcore/app/store'
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
    }
  }
})

export const { addMissingTranslation } = slice.actions

export const missingTranslationsSliceName = slice.name

injectSliceWithState(slice)

export const selectMissingTranslations = (state: RootState): string[] => state.missingTranslations

const debouncedSendTranslations = debounce(async (listenerApi) => {
  const state = listenerApi.getState() as RootState
  const translations = selectMissingTranslations(state)
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
