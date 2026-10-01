/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Modal as AntModal, type ModalProps as AntModalProps } from 'antd'
import React, { useEffect, useRef } from 'react'
import { useStyle } from '@Pimcore/components/modal/modal.styles'
import type useModal from 'antd/es/modal/useModal'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { useDraggableModal } from '@Pimcore/components/modal/hooks/use-draggable-modal'

export type ModalSize = 'M' | 'ML' | 'L' | 'XL' | 'XXL'

export interface IModalProps extends AntModalProps {
  icon?: React.JSX.Element
  iconName?: string
  size?: ModalSize
  limitContentHeight?: boolean
  className?: string
  /**
   * Allow the modal to be dragged by its header. Defaults to `true`.
   * A caller-provided `modalRender` always takes precedence and disables the
   * built-in drag behaviour.
   */
  draggable?: boolean
  useModal?: typeof useModal
  children: React.ReactNode
}

export const Modal = ({ iconName, size = 'M', limitContentHeight, className, title, children, styles: stylesProp, draggable = true, modalRender: modalRenderProp, ...props }: IModalProps): React.JSX.Element => {
  const { styles } = useStyle()

  // Restore focus to the element that triggered the modal when it closes.
  const triggerRef = useRef<Element | null>(null)
  useEffect(() => {
    if (props.open === true) {
      triggerRef.current = document.activeElement
    }
    if (props.open === false && triggerRef.current instanceof HTMLElement) {
      const el = triggerRef.current
      triggerRef.current = null
      requestAnimationFrame(() => { el.focus() })
    }
  }, [props.open])

  // A caller-provided modalRender wins (e.g. WindowModal supplies its own),
  // which also switches off the built-in drag wrapper.
  const hasCustomRender = modalRenderProp !== undefined
  const { modalRender: draggableRender } = useDraggableModal({
    open: props.open,
    disabled: !draggable || hasCustomRender
  })
  const modalRender = hasCustomRender ? modalRenderProp : (draggable ? draggableRender : undefined)

  const classes = [styles.modal, className].filter(Boolean)

  const sizeBasedWidth = {
    XXL: 'max(1200px, 85%)',
    XL: 1000,
    L: 700,
    ML: 872,
    M: 530
  }[size]

  const mergedStyles: AntModalProps['styles'] = limitContentHeight === true
    ? {
        ...stylesProp,
        body: { maxHeight: '60vh', overflowY: 'auto', ...stylesProp?.body }
      }
    : stylesProp

  return (
    <AntModal
      className={ classes.join(' ') }
      modalRender={ modalRender }
      styles={ mergedStyles }
      title={ (
        <ModalTitle iconName={ iconName }>{title}</ModalTitle>
        ) }
      width={ sizeBasedWidth }
      { ...props }
    >
      {children}
    </AntModal>
  )
}
