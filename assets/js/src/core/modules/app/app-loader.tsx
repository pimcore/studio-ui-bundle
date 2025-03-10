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

import React, { useEffect, useState, useRef } from 'react'
import { api } from '@Pimcore/modules/auth/user/user-api-slice.gen'
import { api as settingsApi } from '@Pimcore/modules/app/settings/settings-slice.gen'
import { api as perspectivesApi } from '@Pimcore/modules/perspectives/perspectives-slice.gen'
import { useAppDispatch } from '@Pimcore/app/store'
import { useTranslationGetCollectionMutation } from '@Pimcore/modules/app/translations/translations-api-slice.gen'
import { useTranslation } from 'react-i18next'
import { setUser } from '@Pimcore/modules/auth/user/user-slice'
import { setSettings } from '@Pimcore/modules/app/settings/settings-slice'
import { Content } from '@Pimcore/components/content/content'
import { GlobalStyles } from '@Pimcore/styles/global.styles'
import { useAlertModal } from '@Pimcore/components/modal/alert-modal/hooks/use-alert-modal'
import { ErrorModalService } from '@Pimcore/modules/app/error-handler/services/error-modal-service'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useMercureCreateCookieMutation } from './mercure-api-slice.gen'
import { setActivePerspective } from '../perspectives/active-perspective-slice'
import { updateOuterModel } from '../widget-manager/widget-manager-slice'
import { getInitialModelJson } from '../widget-manager/utils/widget-manager-outer-model'
import { isPlainObject } from 'lodash'

export interface IAppLoaderProps {
  children: React.ReactNode
}

export const AppLoader = (props: IAppLoaderProps): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()

  const [isLoading, setIsLoading] = useState(true)
  const initializedPerspective = useRef<string | undefined>(undefined)

  const [translations] = useTranslationGetCollectionMutation()
  const [fetchMercureCookie] = useMercureCreateCookieMutation()

  const modal = useAlertModal()

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
    const perspectiveId = 'studio_default_perspective'
    if (perspectiveId !== initializedPerspective.current) {
      initializedPerspective.current = perspectiveId
      const perspectiveFetcher = dispatch(perspectivesApi.endpoints.perspectiveGetConfigById.initiate({ perspectiveId }))

      perspectiveFetcher
        .then(({ data, isSuccess, isError, error }) => {
          isError && trackError(new ApiError(error))

          if (isSuccess && isPlainObject(data)) {
            dispatch(setActivePerspective(data))
            dispatch(updateOuterModel(getInitialModelJson()))
          }
        })
        .catch(() => {})

      return await perspectiveFetcher
    }
  }

  async function loadTranslations (): Promise<any> {
    await translations({ translation: { locale: 'en', keys: [] } })
      .unwrap()
      .then(response => {
        i18n.addResourceBundle('en', 'translation', response.keys ?? [], true, true)
      })
      .catch((error) => {
        console.error('rejected', error)
      })
  }

  useEffect(() => {
    Promise.all([
      initLoadUser(),
      initSettings(),
      initActivePerspective(),
      loadTranslations()
    ]).then(() => {
      setIsLoading(false)
    }).catch(() => {})
  }, [])

  return (
    <>
      <GlobalStyles />

      {isLoading && <Content loading />}
      {!isLoading && props.children}
    </>
  )
}
