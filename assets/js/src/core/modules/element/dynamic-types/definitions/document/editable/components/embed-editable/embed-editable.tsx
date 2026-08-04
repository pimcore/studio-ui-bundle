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
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { isEmpty, isNull } from 'lodash'
import { useStyles } from './embed-editable.styles'
import ReactDOM from 'react-dom'
import cn from 'classnames'
import { toCssDimension } from '@sdk/utils'
import { EditableOverlay } from '../editable-overlay/editable-overlay'

export interface EmbedValue {
  url: string
}

export interface EmbedEditableProps {
  value?: EmbedValue | null
  onChange?: (value: EmbedValue | null) => void
  disabled?: boolean
  inherited?: boolean
  className?: string
  containerRef?: React.RefObject<HTMLDivElement>
  width?: string | number
  height?: string | number
}

export const EmbedEditable = ({
  value,
  onChange,
  disabled,
  inherited = false,
  className,
  containerRef,
  width,
  height
}: EmbedEditableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { input } = useFormModal()
  const { styles } = useStyles()
  const [wrapperElement, setWrapperElement] = useState<HTMLDivElement | null>(null)
  const [embedUnsupported, setEmbedUnsupported] = useState(false)

  const currentUrl = value?.url ?? ''
  const hasUrl = !isEmpty(currentUrl)
  const isDisabled = Boolean(disabled) || Boolean(inherited)

  const handleOverwrite = (): void => {
    onChange?.(value ?? null)
  }

  useEffect(() => {
    if (!isNull(containerRef?.current) && isNull(wrapperElement) && hasUrl) {
      const iframeElement = containerRef.current.querySelector('iframe')

      const wrapper = document.createElement('div')
      wrapper.className = cn(styles.wrapper, className)
      wrapper.style.position = 'relative'

      if (!isNull(iframeElement)) {
        const iframeWidth = iframeElement.width ?? iframeElement.getAttribute('width')
        const iframeHeight = iframeElement.height ?? iframeElement.getAttribute('height')
        wrapper.style.width = toCssDimension(iframeWidth) ?? '300px'
        wrapper.style.height = toCssDimension(iframeHeight) ?? '200px'
      } else {
        setEmbedUnsupported(true)
      }

      containerRef.current.parentNode?.insertBefore(wrapper, containerRef.current)
      wrapper.appendChild(containerRef.current)
      setWrapperElement(wrapper)
    }
  }, [containerRef, className, wrapperElement, hasUrl])

  const handleEditUrl = (): void => {
    if (isDisabled) return

    input({
      title: t('embed.url-modal.title'),
      label: t('embed.url-modal.label'),
      initialValue: currentUrl,
      okText: t('embed.url-modal.ok-text'),
      cancelText: t('embed.url-modal.cancel-text'),
      warningMessage: embedUnsupported ? t('embed.url-modal.warning') : undefined,
      onOk: (url: string) => {
        const trimmedUrl = url.trim()
        if (isEmpty(trimmedUrl)) {
          onChange?.(null)
        } else {
          onChange?.({ url: trimmedUrl })
        }
      }
    })
  }

  // Always wrap with EditableOverlay
  return (
    <>
      {!hasUrl
        ? (
          <EditableOverlay
            display="block"
            isInherited={ inherited }
            noPadding
            onOverwrite={ handleOverwrite }
            style={ width !== undefined ? { maxWidth: toCssDimension(width) } : undefined }
          >
            <EditableEmptyPlaceholder
              buttonText={ t('embed.add-url') }
              disabled={ isDisabled }
              height={ height }
              onClick={ handleEditUrl }
              text={ t('embed.placeholder') }
              width={ width }
            />
          </EditableOverlay>
          )
        : (
          <>
            {!isNull(wrapperElement) && ReactDOM.createPortal(
              <EditableOverlay
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
                  disabled={ isDisabled }
                  icon={ { value: 'edit' } }
                  onClick={ handleEditUrl }
                  style={ { pointerEvents: 'auto' } }
                  title={ t('embed.edit-url') }
                  type="default"
                />
              </EditableOverlay>,
              wrapperElement
            )}
          </>
          )}
    </>
  )
}
