/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { isNil } from 'lodash'
import { store } from '@Pimcore/app/store'
import { appIntro } from '@Pimcore/components/background/background.styles'
import { componentConfig, ComponentRenderer } from '@Pimcore/modules/app/component-registry/component-registry'
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
import { AppLoadingContext, type AppLoadingContextValue } from './context/app-loading-context'

export interface IAppLoaderProps {
  children: React.ReactNode
}

export type LoadPhase = 'loading' | 'outro' | 'idle'

export const AppLoader = (props: IAppLoaderProps): React.JSX.Element => {
  const [phase, setPhase] = useState<LoadPhase>('loading')
  const isLoading = phase === 'loading' || phase === 'outro'

  const [pendingLoaders, setPendingLoaders] = useState<Set<string>>(new Set())
  const registerLoader = useCallback((id: string) => {
    setPendingLoaders(prev => new Set(prev).add(id))
  }, [])
  const unregisterLoader = useCallback((id: string) => {
    setPendingLoaders(prev => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }, [])
  const loading = isLoading || pendingLoaders.size > 0

  const appLoadingContextValue: AppLoadingContextValue = useMemo(
    () => ({ registerLoader, unregisterLoader, isAppLoading: loading }),
    [registerLoader, unregisterLoader, loading]
  )

  const outroTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const finishLoading = useCallback(() => {
    setPhase('outro')
    outroTimerRef.current = setTimeout(() => {
      setPhase('idle')
    }, 1000)
  }, [])

  useEffect(() => {
    return () => {
      if (outroTimerRef.current !== null) {
        clearTimeout(outroTimerRef.current)
      }
    }
  }, [])

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
      setPhase('loading')

      if (isAuthenticated === undefined) {
        return
      }

      if (!isAuthenticated) {
        await Promise.all([
          loadPublicTranslations(),
          loadBrandThumbnailUrls()
        ]).then(() => {
          finishLoading()
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

        finishLoading()
      }
    })()
  }, [isAuthenticated])

  return (
    <>
      <GlobalStyles />

      <AppLoadingContext.Provider value={ appLoadingContextValue }>
        <ComponentRenderer
          component={ componentConfig.app.background.name }
          props={ { phase } }
        />
        {phase === 'idle' && (
          <div style={ {
            position: 'absolute',
            inset: 0,
            animation: `${appIntro} 600ms ease 200ms both`
          } }
          >            {props.children}
          </div>
        )}
      </AppLoadingContext.Provider>
    </>
  )
}
