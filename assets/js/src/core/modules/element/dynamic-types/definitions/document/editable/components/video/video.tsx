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
import { isNull, isNil } from 'lodash'
import { useStyles } from './video.styles'
import ReactDOM from 'react-dom'
import cn from 'classnames'
import { type VideoValue, type VideoType } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/video/video'
import { useVideoModal } from '@Pimcore/modules/element/components/video-modal/hooks/use-video-modal'

export interface VideoComponentProps {
  value?: VideoValue | null
  onChange?: (value: VideoValue | null) => void
  disabled?: boolean
  className?: string
  containerRef?: React.RefObject<HTMLDivElement>
  allowedVideoTypes?: VideoType[]
  width?: number | string
  height?: number | string
}

export const VideoComponent = ({
  value,
  onChange,
  disabled,
  className,
  containerRef,
  allowedVideoTypes,
  width = '100%',
  height = 380
}: VideoComponentProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const [wrapperElement, setWrapperElement] = useState<HTMLDivElement | null>(null)
  const [emptyElement, setEmptyElement] = useState<HTMLDivElement | null>(null)

  const videoValue = value ?? null
  const hasVideo = !isNil(videoValue) &&
    !isNil(videoValue.data) &&
    (
      (videoValue.type === 'asset' && !isNil(videoValue.data.id)) ||
      (videoValue.type !== 'asset' && !isNil(videoValue.data) && videoValue.data !== '')
    )

  const { openModal } = useVideoModal({
    disabled,
    allowedVideoTypes,
    onChange
  })

  useEffect(() => {
    if (!isNull(containerRef?.current)) {
      // Look for the empty video element
      const emptyVideoElement = containerRef.current.querySelector('.pimcore_editable_video_empty')
      if (!isNull(emptyVideoElement)) {
        setEmptyElement(emptyVideoElement)
      }

      if (!isNull(wrapperElement)) {
        return
      }

      // Create a wrapper around the container
      const wrapper = document.createElement('div')
      wrapper.className = cn(styles.wrapper, className, 'pimcore-editable-wrapper')
      wrapper.setAttribute('data-editable-type', 'video')
      wrapper.setAttribute('data-role', 'editable-wrapper')
      wrapper.style.position = 'relative'
      wrapper.style.display = 'inline-block'
      wrapper.style.width = '100%'

      containerRef.current.parentNode?.insertBefore(wrapper, containerRef.current)
      wrapper.appendChild(containerRef.current)

      setWrapperElement(wrapper)
    }
  }, [containerRef, className, wrapperElement, styles.wrapper])

  const showModal = (): void => {
    openModal(videoValue)
  }

  // Show placeholder in empty video element when there's no video content
  if (!isNull(emptyElement) && !hasVideo) {
    return ReactDOM.createPortal(
      <EditableEmptyPlaceholder
        buttonText={ t('video.add-video') }
        disabled={ disabled }
        fullHeight
        onClick={ showModal }
        text={ t('video.placeholder') }
      />,
      emptyElement
    )
  }

  // Show edit button when there's video content and we have a wrapper
  if (!isNull(wrapperElement) && hasVideo && disabled !== true) {
    return ReactDOM.createPortal(
      <IconButton
        className={ styles.editButton }
        icon={ { value: 'edit' } }
        onClick={ showModal }
        title={ t('edit') }
        type="default"
      />,
      wrapperElement
    )
  }

  return <></>
}
