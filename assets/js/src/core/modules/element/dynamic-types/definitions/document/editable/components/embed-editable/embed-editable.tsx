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
import { InheritanceOverlay } from '../inheritance-overlay/inheritance-overlay'

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

  const currentUrl = value?.url ?? ''
  const hasUrl = !isEmpty(currentUrl)
  const isDisabled = disabled || inherited

  const handleOverwrite = (): void => {
    onChange?.(value ?? null)
  }

  useEffect(() => {
    if (!isNull(containerRef?.current)) {
      const iframeElement = containerRef.current.querySelector('iframe')

      if (!isNull(iframeElement) && isNull(wrapperElement)) {
        const iframeWidth = iframeElement.width ?? iframeElement.getAttribute('width')
        const iframeHeight = iframeElement.height ?? iframeElement.getAttribute('height')

        const cssWidth = toCssDimension(iframeWidth) ?? '300px'
        const cssHeight = toCssDimension(iframeHeight) ?? '200px'

        const wrapper = document.createElement('div')
        wrapper.className = cn(styles.wrapper, className)
        wrapper.style.width = cssWidth
        wrapper.style.height = cssHeight
        wrapper.style.position = 'relative' // Ensure positioning context for absolute overlay

        containerRef.current.parentNode?.insertBefore(wrapper, containerRef.current)
        wrapper.appendChild(containerRef.current)

        setWrapperElement(wrapper)
      }
    }
  }, [containerRef, className, wrapperElement])

  const handleEditUrl = (): void => {
    if (isDisabled === true) return

    input({
      title: t('embed.url-modal.title'),
      label: t('embed.url-modal.label'),
      initialValue: currentUrl,
      okText: t('embed.url-modal.ok-text'),
      cancelText: t('embed.url-modal.cancel-text'),
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

  // Always wrap with InheritanceOverlay
  return (
    <>
      {!hasUrl ? (
        <InheritanceOverlay
          display="block"
          isInherited={inherited}
          onOverwrite={handleOverwrite}
          noPadding
          style={width !== undefined ? { maxWidth: toCssDimension(width) } : undefined}
        >
          <EditableEmptyPlaceholder
            buttonText={ t('embed.add-url') }
            disabled={ isDisabled }
            onClick={ handleEditUrl }
            text={ t('embed.placeholder') }
            width={ width }
            height={ height }
          />
        </InheritanceOverlay>
      ) : (
        <>
          {!isNull(wrapperElement) && ReactDOM.createPortal(
            <InheritanceOverlay
              display="block"
              isInherited={inherited}
              onOverwrite={handleOverwrite}
              hideButtons
              noPadding
              shape="angular"
              style={{ 
                position: 'absolute',
                inset: 0
              }}
            >
              <IconButton
                className={ styles.editButton }
                disabled={ isDisabled }
                icon={ { value: 'edit' } }
                onClick={ handleEditUrl }
                size="small"
                title={ t('embed.edit-url') }
                type="default"
                style={{ pointerEvents: 'auto' }}
              />
            </InheritanceOverlay>,
            wrapperElement
          )}
        </>
      )}
    </>
  )
}
