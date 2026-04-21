/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { injectSliceWithState, type RootState } from '@sdk/app'
import {
  type SystemSettingsGetApiResponse,
  type AdminSettings,
  type AdminSettingsThumbnailPath,
  type Branding,
  api
} from '@Pimcore/modules/app/settings/settings-slice.gen'

interface SettingsState {
  settings?: SystemSettingsGetApiResponse
  adminSettings?: AdminSettings
  thumbnails?: AdminSettingsThumbnailPath
}

const initialState: SettingsState = {}

const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (
      state,
      {
        payload
      }: PayloadAction<SystemSettingsGetApiResponse>
    ) => {
      state.settings = payload
    },

    setAdminSettings: (
      state,
      { payload }: PayloadAction<AdminSettings>
    ) => {
      state.adminSettings = payload
    },

    // Pre-populate logo URL from the Twig preloader's data-logo-url attribute so
    // the Background component shows the correct logo before thumbnails load.
    setPreloaderThumbnails: (
      state,
      { payload }: PayloadAction<string>
    ) => {
      if (state.thumbnails === undefined) {
        state.thumbnails = {
          customLogo: payload,
          customLogoSmall: payload,
          loginScreenCustomBackgroundImage: null
        }
      }
    },
    // Background component uses the correct brand color before adminSettings loads.
    setPreloaderBranding: (
      state,
      { payload }: PayloadAction<Pick<Branding, 'brandColor' | 'backgroundShade'>>
    ) => {
      if (state.adminSettings === undefined) {
        state.adminSettings = {
          branding: {
            brandColor: payload.brandColor,
            backgroundShade: payload.backgroundShade,
            loginScreenCustomBackgroundImage: null
          },
          assets: { hide_edit_image: false, disable_tree_preview: false },
          writeable: false
        }
      }
    },

    setThumbnails: (
      state,
      { payload }: PayloadAction<AdminSettingsThumbnailPath>
    ) => {
      state.thumbnails = payload
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.settingAdminThumbnail.matchFulfilled,
      (state, { payload }) => {
        state.thumbnails = payload
      }
    )
  }
})

injectSliceWithState(slice)

export const { setSettings, setAdminSettings, setPreloaderBranding, setPreloaderThumbnails, setThumbnails } = slice.actions

export const getSettings = (state: RootState): SystemSettingsGetApiResponse => state.settings.settings
export const getAdminSettings = (state: RootState): AdminSettings => state.settings.adminSettings
export const getThumbnails = (state: RootState): AdminSettingsThumbnailPath => state.settings.thumbnails
