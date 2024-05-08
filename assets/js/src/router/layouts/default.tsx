import React, { useEffect } from 'react'
import { Background } from '@Pimcore/components/background/background'
import { TranslationsLoaderContainer } from '@Pimcore/modules/app/translations/translations-loader-container'
import { BaseLayoutView } from '@Pimcore/modules/app/base-layout/base-layout-view'
import { useNavigate } from 'react-router-dom'
import { useIsAuthenticated } from '@Pimcore/components/login-form/hooks/use-is-authenticated'

export default function DefaultLayout (): React.JSX.Element {
  const isAuthenticated = useIsAuthenticated()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/studio/login')
    }
  }, [])

  return (
    <>
      <Background />
      <TranslationsLoaderContainer>
        <BaseLayoutView />
      </TranslationsLoaderContainer>
    </>
  )
}
