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
import { api } from '@Pimcore/modules/auth/user/user-api-slice.gen'
import { api as settingsApi } from '@Pimcore/modules/app/settings/settings-slice.gen'
import { useAppDispatch } from '@Pimcore/app/store'
import { useTranslationGetCollectionMutation } from '@Pimcore/modules/app/translations/translations-api-slice.gen'
import { useTranslation } from 'react-i18next'
import { setUser } from '@Pimcore/modules/auth/user/user-slice'
import { setSettings } from '@Pimcore/modules/app/settings/settings-slice'
import { useMercureCreateCookieMutation } from '../asset/editor/types/folder/tab-manager/tabs/list/toolbar/tools/mercure-api-slice.gen'
import { Content } from '@Pimcore/components/content/content'

export interface IAppLoaderProps {
  children: React.ReactNode
}

export const AppLoader = (props: IAppLoaderProps): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const [translations] = useTranslationGetCollectionMutation()
  const { i18n } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)
  const [fetchMercureCookie] = useMercureCreateCookieMutation()

  async function initLoadUser (): Promise<any> {
    const userFetcher = dispatch(api.endpoints.userGetCurrentInformation.initiate())
    await fetchMercureCookie()

    userFetcher
      .then(({ data, isSuccess }) => {
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
      .then(({ data, isSuccess }) => {
        if (isSuccess && data !== undefined) {
          dispatch(setSettings(data))
        }
      })
      .catch(() => {})

    return await settingsFetcher
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
      loadTranslations()
    ]).then(() => {
      setIsLoading(false)
    }).catch(() => {})
  }, [])

  if (isLoading) {
    return (
      <Content loading />
    )
  }

  return (
    <>
      {props.children}
    </>
  )
}
