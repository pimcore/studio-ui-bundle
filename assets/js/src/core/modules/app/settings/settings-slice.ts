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
  api
} from '@Pimcore/modules/app/settings/settings-slice.gen'

interface SettingsState {
  settings?: SystemSettingsGetApiResponse
  adminSettings?: AdminSettings
  thumbnails?: AdminSettingsThumbnailPath
}

// ---------------------------------------------------------------------------
// Synchronously read branding + logo from the Twig preloader's data- attributes
// before React mounts so the very first render already has the correct values.
// ---------------------------------------------------------------------------
const readPreloaderState = (): Pick<SettingsState, 'adminSettings' | 'thumbnails'> => {
  const el = document.getElementById('app-preloader')
  if (el === null) return {}

  const brandColor = el.dataset.brandColor ?? ''
  const backgroundShade = el.dataset.brandBackgroundColor ?? ''
  const logoUrl = el.dataset.logoUrl ?? ''

  return {
    adminSettings: (brandColor !== '' || backgroundShade !== '')
      ? {
          branding: {
            brandColor,
            backgroundShade,
            loginScreenCustomBackgroundImage: null
          },
          assets: { hide_edit_image: false, disable_tree_preview: false },
          writeable: false
        }
      : undefined,
    thumbnails: logoUrl !== ''
      ? {
          customLogo: logoUrl,
          customLogoSmall: logoUrl,
          loginScreenCustomBackgroundImage: null
        }
      : undefined
  }
}

const initialState: SettingsState = readPreloaderState()

const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (
      state,
      { payload }: PayloadAction<SystemSettingsGetApiResponse>
    ) => {
      state.settings = payload
    },

    setAdminSettings: (
      state,
      { payload }: PayloadAction<AdminSettings>
    ) => {
      state.adminSettings = payload
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

export const { setSettings, setAdminSettings, setThumbnails } = slice.actions

export const getSettings = (state: RootState): SystemSettingsGetApiResponse => state.settings.settings
export const getAdminSettings = (state: RootState): AdminSettings => state.settings.adminSettings
export const getThumbnails = (state: RootState): AdminSettingsThumbnailPath => state.settings.thumbnails

