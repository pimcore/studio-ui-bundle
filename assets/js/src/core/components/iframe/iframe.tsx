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
import { isNull, isNil } from 'lodash'

export interface IframeRef {
  reload: () => void
  setReloading: (loading: boolean) => void
  setReady: (ready: boolean) => void
  getIframeElement: () => HTMLIFrameElement | null
  getElementRef: () => React.RefObject<HTMLIFrameElement>
}

interface IframeProps {
  src: string
  title: string
  loadingTip?: string
  reloadingTip?: string
  onLoad?: () => void
  onReloadStart?: () => void
  onReloadEnd?: () => void
  onReady?: () => void
  useExternalReadyState?: boolean
  preserveScrollOnReload?: boolean
}

export const Iframe = forwardRef<IframeRef, IframeProps>(
  ({ src, title, loadingTip, reloadingTip, onLoad, onReloadStart, onReloadEnd, onReady, useExternalReadyState = false, preserveScrollOnReload }, ref): React.JSX.Element => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isReady, setIsReady] = useState(false)
    const [isReloading, setIsReloading] = useState(false)
    const [isActuallyLoading, setIsActuallyLoading] = useState(true) // Track actual iframe loading state
    const [iframeElement, setIframeElement] = useState<HTMLIFrameElement | null>(null)
    const [savedScrollPosition, setSavedScrollPosition] = useState<{ x: number, y: number } | null>(null)
    const { styles } = useStyle({
      isLoaded: useExternalReadyState ? isReady : isLoaded,
      isReloading,
      isActuallyLoading,
      useExternalReadyState
    })
    const { t } = useTranslation()

    // Capture scroll position from iframe
    const captureScrollPosition = (): { x: number, y: number } | null => {
      if (isNil(iframeElement) || preserveScrollOnReload !== true) return null

      try {
        const iframeDocument = iframeElement.contentDocument ?? iframeElement.contentWindow?.document
        if (!isNil(iframeDocument)) {
          return {
            x: iframeDocument.documentElement.scrollLeft !== 0 ? iframeDocument.documentElement.scrollLeft : iframeDocument.body.scrollLeft,
            y: iframeDocument.documentElement.scrollTop !== 0 ? iframeDocument.documentElement.scrollTop : iframeDocument.body.scrollTop
          }
        }
      } catch (error) {
        console.warn('Could not capture iframe scroll position:', error)
      }
      return null
    }

    // Restore scroll position in iframe
    const restoreScrollPosition = (position: { x: number, y: number }): void => {
      if (isNull(iframeElement) || preserveScrollOnReload !== true) return

      try {
        const iframeDocument = iframeElement.contentDocument ?? iframeElement.contentWindow?.document
        if (!isNil(iframeDocument)) {
          iframeDocument.documentElement.scrollLeft = position.x
          iframeDocument.documentElement.scrollTop = position.y
          iframeDocument.body.scrollLeft = position.x
          iframeDocument.body.scrollTop = position.y
        }
      } catch (error) {
        console.warn('Could not restore iframe scroll position:', error)
      }
    }

    useImperativeHandle(ref, () => ({
      reload: () => {
        if (!isNull(iframeElement)) {
          // Capture scroll position before reload
          if (preserveScrollOnReload === true) {
            const scrollPos = captureScrollPosition()
            setSavedScrollPosition(scrollPos)
          }

          setIsReloading(true)
          if (useExternalReadyState) {
            setIsReady(false)
          }
          onReloadStart?.()

          // Set actually loading state when we change the src
          setIsActuallyLoading(true)
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
      setReady: (ready: boolean) => {
        setIsReady(ready)
        if (ready) {
          setIsActuallyLoading(false) // Not actually loading anymore when ready
          onReady?.()

          // Restore scroll position after iframe is ready
          if (isReloading && !isNull(savedScrollPosition) && preserveScrollOnReload === true) {
            // Use setTimeout to ensure DOM is fully rendered
            setTimeout(() => {
              if (!isNull(savedScrollPosition)) {
                restoreScrollPosition(savedScrollPosition)
                setSavedScrollPosition(null)
              }
            }, 0)
          }

          if (isReloading) {
            setIsReloading(false)
            onReloadEnd?.()
          }
        }
      },
      getIframeElement: () => iframeElement,
      getElementRef: () => ({
        current: iframeElement
      })
    }), [iframeElement, onReloadStart, onReloadEnd, onReady, isReloading, useExternalReadyState, savedScrollPosition, preserveScrollOnReload])

    const handleIframeLoad = (): void => {
      onLoad?.()
      setIsActuallyLoading(false) // Not actually loading anymore when loaded
      if (!useExternalReadyState) {
        setIsLoaded(true)
        if (isReloading) {
          setIsReloading(false)
          onReloadEnd?.()
        }
      }
    }

    const handleIframeRef = (element: HTMLIFrameElement | null): void => {
      setIframeElement(element)
    }

    const showLoadingOverlay = useExternalReadyState
      ? (!isReady || isReloading)
      : (!isLoaded || isReloading)
    const loadingMessage = loadingTip ?? reloadingTip ?? t('please-wait')

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
