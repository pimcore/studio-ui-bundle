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
import { createListenerMiddleware, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { debounce } from 'lodash'
import { setSettings } from '@Pimcore/modules/app/settings/settings-slice'
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

  if (state.authentication?.isAuthenticated !== true) {
    return
  }

  const translations = selectMissingTranslations(state)

  if (translations.length === 0) {
    return
  }

  const settings = state.settings?.settings

  // Settings not loaded yet — the system settings request is still in flight
  // during app boot. Keep the collected keys queued instead of assuming a
  // value; the `setSettings` trigger below re-runs this flush once they land.
  if (settings === undefined) {
    return
  }

  // Auto-creation of missing translation keys can be disabled via the backend
  // config `pimcore_studio_backend.translations.auto_create_missing_keys`.
  // When disabled, discard the collected keys without persisting them. Manual
  // creation through the Translations UI is unaffected. Defaults to enabled:
  // loaded settings without the key mean an older backend without the toggle.
  if (settings.auto_create_translations === false) {
    listenerApi.dispatch(removeMissingTranslations(translations))
    return
  }

  listenerApi.dispatch(removeMissingTranslations(translations))
  void addNewTranslations(translations)
}, 3000) // Wait for 3 seconds of inactivity before sending

const listenerMiddleware = createListenerMiddleware()
listenerMiddleware.startListening({
  matcher: isAnyOf(addMissingTranslation, setSettings),
  effect: async (action, listenerApi) => {
    debouncedSendTranslations.cancel()
    void debouncedSendTranslations(listenerApi)
  }
})

addAppMiddleware(listenerMiddleware.middleware)
