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
import { isNil } from 'lodash'
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
import { useLanguageLoader } from './loader/language/loader'
import { useBrandThumbnailUrlLoader } from './loader/brand-thumbnail-urls/loader'
import { useAdminSettingsLoader } from './loader/admin-settings/loader'
import { selectCurrentUser } from '@Pimcore/modules/auth/user/user-slice'
import { usePerspectives } from '@Pimcore/modules/perspectives/hooks/use-perspectives'
import { App } from 'antd'
import { modalApi } from '@Pimcore/app/public-api/modal/modal-api'
import { loadReportsMenuItems } from '@Pimcore/modules/reports/utils/reports-loader'
import { type AppLoaderRegistry } from './services/app-loader-registry'
import { container, serviceIds } from '@sdk/app'
import { useGlobalMessageBusLoader } from './loader/global-message-bus/loader'

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
  const { loadAvailableLocales } = useLanguageLoader()
  const { loadBrandThumbnailUrls } = useBrandThumbnailUrlLoader()
  const { loadAdminSettings } = useAdminSettingsLoader()
  const { loadPerspective } = usePerspectives()
  const { initGlobalMessageBus } = useGlobalMessageBusLoader()
  const appLoaderRegistry = container.get<AppLoaderRegistry>(serviceIds['AppLoader/Registry'])

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
          loadPublicTranslations(),
          loadBrandThumbnailUrls()
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

        const user = selectCurrentUser(store.getState())
        if (!isNil(user?.id)) {
          initGlobalMessageBus(user.id)
        }

        await Promise.all([
          fetchMercureCookie(),
          loadTranslations(),
          loadSettings(),
          loadAdminSettings(),
          loadBrandThumbnailUrls(),
          loadAvailableLocales(),
          initActivePerspective(),
          loadReportsMenuItems()
        ])

        await appLoaderRegistry.loadAll()

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
