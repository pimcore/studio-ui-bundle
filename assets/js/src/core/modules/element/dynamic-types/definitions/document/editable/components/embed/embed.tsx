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
import { Text } from '@Pimcore/components/text/text'
import { Flex } from '@Pimcore/components/flex/flex'
import { useTranslation } from 'react-i18next'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { isEmpty, isNull } from 'lodash'
import { useStyles } from './embed.styles'
import ReactDOM from 'react-dom'
import cn from 'classnames'
import { toCssDimension } from '@sdk/utils'

export interface EmbedValue {
  url: string
}

export interface EmbedComponentProps {
  value?: EmbedValue | null
  onChange?: (value: EmbedValue | null) => void
  disabled?: boolean
  className?: string
  containerRef?: React.RefObject<HTMLDivElement>
}

export const EmbedComponent = ({ value, onChange, disabled, className, containerRef }: EmbedComponentProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { input } = useFormModal()
  const { styles } = useStyles()
  const [iframe, setIframe] = useState<HTMLIFrameElement | null>(null)
  const [wrapperElement, setWrapperElement] = useState<HTMLDivElement | null>(null)

  const currentUrl = value?.url ?? ''
  const hasUrl = !isEmpty(currentUrl)

  useEffect(() => {
    if (!isNull(containerRef?.current)) {
      const iframeElement = containerRef.current.querySelector('iframe')
      setIframe(iframeElement)

      if (!isNull(iframeElement) && isNull(wrapperElement)) {
        const iframeWidth = iframeElement.width ?? iframeElement.getAttribute('width')
        const iframeHeight = iframeElement.height ?? iframeElement.getAttribute('height')

        const cssWidth = toCssDimension(iframeWidth) ?? '300px'
        const cssHeight = toCssDimension(iframeHeight) ?? '200px'

        const wrapper = document.createElement('div')
        wrapper.className = cn(styles.wrapper, className)
        wrapper.style.width = cssWidth
        wrapper.style.height = cssHeight

        containerRef.current.parentNode?.insertBefore(wrapper, containerRef.current)
        wrapper.appendChild(containerRef.current)

        setWrapperElement(wrapper)
      }
    }
  }, [containerRef, className, wrapperElement])

  const handleEditUrl = (): void => {
    if (disabled === true) return

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

  if (!hasUrl) {
    return (
      <Flex
        align="center"
        className={ styles.placeholder }
        gap="small"
        justify="center"
        onClick={ handleEditUrl }
        style={ { cursor: disabled === true ? 'not-allowed' : 'pointer' } }
        vertical
      >
        <Text className={ styles.placeholderText }>
          {t('embed.placeholder')}
        </Text>
        <IconButton
          disabled={ disabled }
          icon={ { value: 'edit' } }
          type="default"
        >
          {t('embed.add-url')}
        </IconButton>
      </Flex>
    )
  }

  if (isNull(iframe) || isNull(wrapperElement)) {
    return <></>
  }

  return ReactDOM.createPortal(
    <IconButton
      className={ styles.editButton }
      disabled={ disabled }
      icon={ { value: 'edit' } }
      onClick={ handleEditUrl }
      size="small"
      title={ t('embed.edit-url') }
      type="default"
    />,
    wrapperElement
  )
}
