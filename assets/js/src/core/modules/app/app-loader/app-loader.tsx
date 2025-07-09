/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { store } from '@Pimcore/app/store'
import { Content } from '@Pimcore/components/content/content'
import { GlobalStyles } from '@Pimcore/styles/global.styles'
import { useAlertModal } from '@Pimcore/components/modal/alert-modal/hooks/use-alert-modal'
import { ErrorModalService } from '@Pimcore/modules/app/error-handler/services/error-modal-service'
import { useIsAuthenticated } from '@Pimcore/modules/auth/hooks/use-is-authenticated'
import { useTranslationLoader } from './loader/translation/loader'
import { useUserLoader } from './loader/user/loader'
import { useMercureCreateCookieMutation } from '../mercure-api-slice.gen'
import { useSettingsLoader } from './loader/settings/loader'
import { selectCurrentUser } from '@Pimcore/modules/auth/user/user-slice'
import { usePerspectives } from '@Pimcore/modules/perspectives/hooks/use-perspectives'
import { App } from 'antd'
import { modalApi } from '@Pimcore/app/public-api/modal/modal-api'

export interface IAppLoaderProps {
  children: React.ReactNode
}

export const AppLoader = (props: IAppLoaderProps): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState(true)

  const modal = useAlertModal()
  const { modal: studioModal } = App.useApp()

  // Register the modal instance to allow centralized error message display throughout the project
  ErrorModalService.setModalInstance(modal)
  // Register the modal instance for iframe communication
  modalApi.setModalInstance(studioModal)

  const { isAuthenticated } = useIsAuthenticated()

  const { loadPublicTranslations, loadTranslations } = useTranslationLoader()
  const { loadUser } = useUserLoader()
  const [fetchMercureCookie] = useMercureCreateCookieMutation()
  const { loadSettings } = useSettingsLoader()
  const { loadPerspective } = usePerspectives()

  async function initActivePerspective (): Promise<any> {
    const user = selectCurrentUser(store.getState())
    const perspectiveId = String(user?.activePerspective ?? 'studio_default_perspective')
    return await loadPerspective(perspectiveId)
  }

  useEffect(() => {
    void (async () => {
      setIsLoading(() => true)

      if (isAuthenticated === undefined) {
        return
      }

      if (!isAuthenticated) {
        await Promise.all([
          loadPublicTranslations()
        ]).then(() => {
          setIsLoading(() => false)
        }).catch((error) => {
          console.error('Error during login preparation', error)
        })
      }

      if (isAuthenticated) {
        await Promise.all([
          loadUser()
        ])

        await Promise.all([
          fetchMercureCookie(),
          loadTranslations(),
          loadSettings(),
          initActivePerspective()
        ])

        setIsLoading(() => false)
      }
    })()
  }, [isAuthenticated])

  return (
    <>
      <GlobalStyles />

      {isLoading && <Content loading />}
      {!isLoading && props.children}
    </>
  )
}
