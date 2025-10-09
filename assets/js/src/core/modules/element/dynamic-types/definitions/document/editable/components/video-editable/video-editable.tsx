/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState, useEffect } from 'react'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { EditableEmptyPlaceholder } from '@Pimcore/components/editable-empty-placeholder'
import { useTranslation } from 'react-i18next'
import { isNull, isNil, isEmpty } from 'lodash'
import { useStyles } from './video-editable.styles'
import ReactDOM from 'react-dom'
import cn from 'classnames'
import { type VideoValue, type VideoType } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/video/video'
import { useVideoModal } from '@Pimcore/modules/element/components/video-modal/hooks/use-video-modal'
import { InheritanceOverlay } from '../inheritance-overlay/inheritance-overlay'
import { toCssDimension } from '@Pimcore/utils/css'

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
  height = 380
}: VideoEditableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const [wrapperElement, setWrapperElement] = useState<HTMLDivElement | null>(null)
  const [emptyElement, setEmptyElement] = useState<HTMLDivElement | null>(null)

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
    if (!isNull(containerRef?.current)) {
      const emptyVideoElement: HTMLDivElement | null = containerRef.current.querySelector('.pimcore_editable_video_empty')
      if (!isNull(emptyVideoElement) && isNull(emptyElement)) {
        emptyVideoElement.className = cn(emptyVideoElement.className, 'studio-required-field-target')
        setEmptyElement(emptyVideoElement)
      }

      const videoElement = containerRef.current.querySelector('iframe, video')

      if (!isNull(videoElement) && isNull(wrapperElement)) {
        const wrapper = document.createElement('div')
        wrapper.className = cn(styles.wrapper, className)
        wrapper.style.position = 'relative'

        if (!isNull(containerRef.current.parentNode)) {
          containerRef.current.parentNode.insertBefore(wrapper, containerRef.current)
          wrapper.appendChild(containerRef.current)

          setWrapperElement(wrapper)
        }
      }
    }
  }, [containerRef, className, wrapperElement])

  const showModal = (): void => {
    openModal(videoValue)
  }

  return (
    <>
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
            !isNull(wrapperElement) && ReactDOM.createPortal(
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
              wrapperElement
            )
          )}
    </>
  )
}
