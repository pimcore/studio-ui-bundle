/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState, useEffect, useRef } from 'react'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { EditableEmptyPlaceholder } from '@Pimcore/components/editable-empty-placeholder'
import { Spin } from '@Pimcore/components/spin/spin'
import { useTranslation } from 'react-i18next'
import { isNull, isNil, isEmpty } from 'lodash'
import { useStyles } from './video-editable.styles'
import ReactDOM from 'react-dom'
import cn from 'classnames'
import { type VideoValue, type VideoType } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/video/video'
import { useVideoModal } from '@Pimcore/modules/element/components/video-modal/hooks/use-video-modal'
import { InheritanceOverlay } from '../inheritance-overlay/inheritance-overlay'
import { toCssDimension } from '@Pimcore/utils/css'
import { useDocumentEditor } from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/edit/hooks/use-document-editor'
import { useAssetVideoThumbnailStatusQuery } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { skipToken } from '@reduxjs/toolkit/query'

const VIDEO_THUMBNAIL_POLL_INTERVAL_MS = 5000

const MARKER_CLASS = {
  empty: '.pimcore_editable_video_empty',
  progress: '.pimcore_editable_video_progress',
  error: '.pimcore_editable_video_error'
} as const

export interface VideoEditableProps {
  value?: VideoValue | null
  onChange?: (value: VideoValue | null) => void
  disabled?: boolean
  inherited?: boolean
  className?: string
  containerRef?: React.RefObject<HTMLDivElement>
  allowedVideoTypes?: VideoType[]
  width?: number | string
  height?: number | string
  thumbnailName?: string
}

export const VideoEditable = ({
  value,
  onChange,
  disabled,
  inherited = false,
  className,
  containerRef,
  allowedVideoTypes,
  width = '100%',
  height = 380,
  thumbnailName
}: VideoEditableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { triggerSaveAndReload } = useDocumentEditor()
  const [wrapperElement, setWrapperElement] = useState<HTMLDivElement | null>(null)
  const [emptyElement, setEmptyElement] = useState<HTMLDivElement | null>(null)
  const [progressElement, setProgressElement] = useState<HTMLDivElement | null>(null)
  const [errorElement, setErrorElement] = useState<HTMLDivElement | null>(null)
  const reloadTriggeredRef = useRef(false)

  const videoValue = value ?? null

  const hasVideo = (() => {
    if (isNil(videoValue)) return false

    switch (videoValue.type) {
      case 'asset':
        return !isNil(videoValue.data?.id) && videoValue.data.id > 0

      case 'youtube':
      case 'vimeo':
      case 'dailymotion':
        return !isNil(videoValue.data) && !isEmpty(videoValue.data?.toString().trim())

      default:
        return false
    }
  })()

  const { openModal } = useVideoModal({
    disabled,
    allowedVideoTypes,
    onChange
  })

  const handleOverwrite = (): void => {
    onChange?.(value ?? null)
  }

  useEffect(() => {
    const container = containerRef?.current
    if (isNil(container)) {
      return
    }

    const captureMarker = (
      selector: string,
      current: HTMLDivElement | null,
      onFound: (element: HTMLDivElement) => void
    ): void => {
      const element = container.querySelector<HTMLDivElement>(selector)
      if (!isNull(element) && isNull(current)) {
        onFound(element)
      }
    }

    captureMarker(MARKER_CLASS.empty, emptyElement, (element) => {
      element.className = cn(element.className, 'studio-required-field-target')
      setEmptyElement(element)
    })

    captureMarker(MARKER_CLASS.progress, progressElement, (element) => {
      element.style.position = 'relative'
      setProgressElement(element)
    })

    captureMarker(MARKER_CLASS.error, errorElement, (element) => {
      element.style.position = 'relative'
      setErrorElement(element)
    })

    const videoElement = container.querySelector('iframe, video')

    if (!isNull(videoElement) && isNull(wrapperElement)) {
      const wrapper = document.createElement('div')
      wrapper.className = cn(styles.wrapper, className)
      wrapper.style.position = 'relative'

      if (!isNull(container.parentNode)) {
        container.parentNode.insertBefore(wrapper, container)
        wrapper.appendChild(container)

        setWrapperElement(wrapper)
      }
    }
  }, [containerRef, className, wrapperElement, progressElement, errorElement])

  const assetId = videoValue?.type === 'asset' ? videoValue.data?.id : undefined
  const skipPolling = isNull(progressElement) ||
    isNil(assetId) ||
    assetId <= 0 ||
    isNil(thumbnailName) ||
    isEmpty(thumbnailName)

  const { data: thumbnailStatus } = useAssetVideoThumbnailStatusQuery(
    skipPolling
      ? skipToken
      : { id: assetId, thumbnailName },
    { pollingInterval: VIDEO_THUMBNAIL_POLL_INTERVAL_MS }
  )

  useEffect(() => {
    if (isNil(thumbnailStatus) || reloadTriggeredRef.current) {
      return
    }
    if (thumbnailStatus.status === 'finished' || thumbnailStatus.status === 'error') {
      reloadTriggeredRef.current = true
      triggerSaveAndReload()
    }
  }, [thumbnailStatus, triggerSaveAndReload])

  const showModal = (): void => {
    openModal(videoValue)
  }

  const renderEditButtonOverlay = (target: HTMLDivElement): React.ReactPortal => ReactDOM.createPortal(
    <InheritanceOverlay
      display="block"
      hideButtons
      isInherited={ inherited }
      noPadding
      onOverwrite={ handleOverwrite }
      shape="angular"
      style={ {
        position: 'absolute',
        inset: 0
      } }
    >
      <IconButton
        className={ styles.editButton }
        disabled={ disabled }
        icon={ { value: 'edit' } }
        onClick={ showModal }
        size="small"
        style={ { pointerEvents: 'auto' } }
        title={ t('video.edit') }
        type="default"
      />
    </InheritanceOverlay>,
    target
  )

  return (
    <>
      {!isNull(progressElement) && ReactDOM.createPortal(
        <div className={ styles.progressOverlay }>
          <Spin size="large" />
          <span className={ styles.progressLabel }>
            { t('video.preview-in-progress') }
          </span>
        </div>,
        progressElement
      )}
      {!isNull(errorElement) && renderEditButtonOverlay(errorElement)}
      {!hasVideo
        ? (
            !isNull(emptyElement) && ReactDOM.createPortal(
              <InheritanceOverlay
                display="block"
                isInherited={ inherited }
                noPadding
                onOverwrite={ handleOverwrite }
                style={ !isNil(width) ? { maxWidth: toCssDimension(width) } : undefined }
              >
                <EditableEmptyPlaceholder
                  buttonText={ t('video.add-video') }
                  disabled={ disabled }
                  height={ height }
                  onClick={ showModal }
                  text={ t('video.placeholder') }
                  width={ width }
                />
              </InheritanceOverlay>,
              emptyElement
            )
          )
        : (
            !isNull(wrapperElement) && renderEditButtonOverlay(wrapperElement)
          )}
    </>
  )
}
