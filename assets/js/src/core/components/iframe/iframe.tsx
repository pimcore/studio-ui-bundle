/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { forwardRef, useState, useImperativeHandle } from 'react'
import { Spin } from '@Pimcore/components/spin/spin'
import { Flex } from '@Pimcore/components/flex/flex'
import { useStyle } from './iframe.styles'
import { useTranslation } from 'react-i18next'

export interface IframeRef {
  reload: () => void
  setReloading: (loading: boolean) => void
  getIframeElement: () => HTMLIFrameElement | null
}

interface IframeProps {
  src: string
  title: string
  loadingTip?: string
  reloadingTip?: string
  onLoad?: () => void
  onReloadStart?: () => void
  onReloadEnd?: () => void
}

export const Iframe = forwardRef<IframeRef, IframeProps>(
  ({ src, title, loadingTip, reloadingTip, onLoad, onReloadStart, onReloadEnd }, ref): React.JSX.Element => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isReloading, setIsReloading] = useState(false)
    const [iframeElement, setIframeElement] = useState<HTMLIFrameElement | null>(null)
    const { styles } = useStyle({ isLoaded, isReloading })
    const { t } = useTranslation()

    useImperativeHandle(ref, () => ({
      reload: () => {
        if (iframeElement) {
          setIsReloading(true)
          onReloadStart?.()
          const currentSrc = iframeElement.src
          iframeElement.src = currentSrc
        }
      },
      setReloading: (loading: boolean) => {
        setIsReloading(loading)
        if (loading) {
          onReloadStart?.()
        } else {
          onReloadEnd?.()
        }
      },
      getIframeElement: () => iframeElement
    }), [iframeElement, onReloadStart, onReloadEnd])

    const handleIframeLoad = (): void => {
      onLoad?.()
      setIsLoaded(true)
      if (isReloading) {
        setIsReloading(false)
        onReloadEnd?.()
      }
    }

    const handleIframeRef = (element: HTMLIFrameElement | null): void => {
      setIframeElement(element)
    }

    const showLoadingOverlay = !isLoaded || isReloading
    const loadingMessage = isReloading ? (reloadingTip ?? t('please-wait')) : (loadingTip ?? t('loading'))

    return (
      <Flex
        align="center"
        className={ styles.iframeContainer }
        justify="center"
      >
        {showLoadingOverlay && (
          <div className={ styles.loadingOverlay }>
            <Spin
              asContainer
              size="large"
              tip={ loadingMessage }
            />
          </div>
        )}
        <iframe
          className={ styles.iframe }
          onLoad={ handleIframeLoad }
          ref={ handleIframeRef }
          src={ src }
          title={ title }
        />
      </Flex>
    )
  }
)

Iframe.displayName = 'Iframe'
