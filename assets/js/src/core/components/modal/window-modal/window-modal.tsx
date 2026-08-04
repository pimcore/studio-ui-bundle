/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { isInIframe } from '@Pimcore/utils/iframe'
import { ConfigProvider } from 'antd'
import { type IModalProps, Modal } from '@Pimcore/components/modal/modal'
import { useDraggableModal } from '@Pimcore/components/modal/hooks/use-draggable-modal'
import { useStyle } from './window-modal.styles'
import cn from 'classnames'
import { Icon } from '@Pimcore/components/icon/icon'

export interface IWindowModalProps extends Omit<IModalProps, 'mask' | 'maskClosable' | 'maskStyle' | 'maskTransitionName' | 'wrapClassName' | 'modalRender' | 'draggable'> {

}

export const WindowModal = (props: IWindowModalProps): React.JSX.Element => {
  const { zIndex, ...restProps } = props
  const { styles } = useStyle({ zIndex })

  // The window modal keeps its own render (no mask, pointer-events:none wrapper),
  // so it drives the shared drag hook directly instead of the base Modal's.
  const { modalRender, nodeRef } = useDraggableModal({
    open: props.open,
    wrapperClassName: styles.draggableContainer
  })

  // In an iframe (e.g. document editor) popups must render inside the draggable container to
  // inherit the correct stacking context. In the top-level window the modal wrapper has
  // pointer-events:none, so popups rendered inside it would be unclickable — use document.body.
  const getPopupContainer = (): HTMLElement => {
    if (isInIframe()) return nodeRef.current ?? document.body
    return document.body
  }

  return (
    <Modal
      { ...restProps }
      className={ cn(styles.modal, props.className) }
      mask={ false }
      maskClosable={ false }
      modalRender={ modalRender }
      // Ensure there is always a header to grab, even without an explicit title.
      title={ props.title ?? <Icon value={ 'drag-option' } /> }
      wrapClassName={ styles.wrapper }
    >
      <ConfigProvider getPopupContainer={ getPopupContainer }>
        {props.children}
      </ConfigProvider>
    </Modal>
  )
}
