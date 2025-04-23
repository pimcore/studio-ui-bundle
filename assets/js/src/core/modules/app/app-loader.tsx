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

import React, { useEffect, useState } from 'react'
import { api } from '@Pimcore/modules/auth/user/user-api-slice-enhanced'
import { api as settingsApi } from '@Pimcore/modules/app/settings/settings-slice.gen'
import { useAppDispatch, store } from '@Pimcore/app/store'
import { useTranslationGetCollectionMutation } from '@Pimcore/modules/app/translations/translations-api-slice.gen'
import { useTranslation } from 'react-i18next'
import { setUser, selectCurrentUser } from '@Pimcore/modules/auth/user/user-slice'
import { setSettings } from '@Pimcore/modules/app/settings/settings-slice'
import { Content } from '@Pimcore/components/content/content'
import { GlobalStyles } from '@Pimcore/styles/global.styles'
import { useAlertModal } from '@Pimcore/components/modal/alert-modal/hooks/use-alert-modal'
import { ErrorModalService } from '@Pimcore/modules/app/error-handler/services/error-modal-service'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { useMercureCreateCookieMutation } from './mercure-api-slice.gen'
import { useIsAuthenticated } from '@Pimcore/modules/auth/hooks/use-is-authenticated'
import { usePerspectives } from '../perspectives/hooks/use-perspectives'

export interface IAppLoaderProps {
  children: React.ReactNode
}

export const AppLoader = (props: IAppLoaderProps): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()

  const [isLoading, setIsLoading] = useState(true)

  const [translations] = useTranslationGetCollectionMutation()
  const [fetchMercureCookie] = useMercureCreateCookieMutation()

  const modal = useAlertModal()

  const { loadPerspective } = usePerspectives()

  const isAuthenticated = useIsAuthenticated()

  // Register the modal instance to allow centralized error message display throughout the project
  ErrorModalService.setModalInstance(modal)

  async function initLoadUser (): Promise<any> {
    const userFetcher = dispatch(api.endpoints.userGetCurrentInformation.initiate())
    await fetchMercureCookie()

    userFetcher
      .then(({ data, isSuccess, isError, error }) => {
        // @todo check handling of 401
        const _error = error as unknown as any
        if (_error?.status !== 401) {
          isError && trackError(new ApiError(error))
        }

        if (isSuccess && data !== undefined) {
          dispatch(setUser(data))
        }
      })
      .catch(() => {})

    return await userFetcher
  }

  async function initSettings (): Promise<any> {
    const settingsFetcher = dispatch(settingsApi.endpoints.systemSettingsGet.initiate())

    settingsFetcher
      .then(({ data, isSuccess, isError, error }) => {
        isError && trackError(new ApiError(error))

        if (isSuccess && data !== undefined) {
          dispatch(setSettings(data))
        }
      })
      .catch(() => {})

    return await settingsFetcher
  }

  async function initActivePerspective (): Promise<any> {
    const user = selectCurrentUser(store.getState())
    const perspectiveId = String(user?.activePerspective ?? 'studio_default_perspective')
    return await loadPerspective(perspectiveId)
  }

  async function loadTranslations (): Promise<any> {
    await translations({ translation: { locale: 'en', keys: [] } })
      .unwrap()
      .then(response => {
        i18n.addResourceBundle('en', 'translation', response.keys ?? [], true, true)
      })
      .catch(() => {
        trackError(new GeneralError('Error loading translations'))
      })
  }

  const loadUserData = async (): Promise<void> => {
    const { isSuccess: isSuccessInitSetting } = await initSettings()

    if (isSuccessInitSetting === true) {
      Promise.allSettled([
        initActivePerspective()
      ]).then(() => {
      }).catch(() => {})
    }
  }

  useEffect(() => {
    Promise.all([
      initLoadUser(),
      loadTranslations()
    ]).then(() => {
      setIsLoading(false)
    }).catch(() => {})
  }, [])

  useEffect(() => {
    const fetchUserData = async (): Promise<void> => {
      await loadUserData()
    }

    if (isAuthenticated) {
      void fetchUserData()
    }
  }, [isAuthenticated])

  return (
    <>
      <GlobalStyles />

      {isLoading && <Content loading />}
      {!isLoading && props.children}
    </>
  )
}
