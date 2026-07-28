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
import { useDraggableModal, type UseDraggableModalOptions } from './use-draggable-modal'

export interface DraggableModalRenderProps extends Pick<UseDraggableModalOptions, 'handle' | 'cancel' | 'disabled'> {
  children: React.ReactNode
}

/**
 * Component wrapper around {@link useDraggableModal} for the imperative modal
 * API (`modal.confirm` / `modal.info` / …), whose `modalRender` callback needs
 * to return an element that can own its own drag state. Each open imperative
 * modal is destroyed on close, so state resets naturally without an `open`
 * prop.
 *
 * Compose with any caller-provided `modalRender`:
 *   modalRender: (node) => <DraggableModalRender>{userRender(node)}</DraggableModalRender>
 */
export const DraggableModalRender = ({ children, ...options }: DraggableModalRenderProps): React.JSX.Element => {
  const { modalRender } = useDraggableModal(options)
  return <>{modalRender(children)}</>
}

/**
 * Wraps a `ModalFuncProps.modalRender` value so the imperative modal becomes
 * draggable, preserving any existing render (e.g. autofocus behaviour).
 */
export const withDraggableModalRender = (
  existingRender?: (node: React.ReactNode) => React.ReactNode
): ((node: React.ReactNode) => React.ReactNode) => {
  const renderDraggableModal = (node: React.ReactNode): React.ReactNode => (
    <DraggableModalRender>
      {existingRender !== undefined ? existingRender(node) : node}
    </DraggableModalRender>
  )
  renderDraggableModal.displayName = 'DraggableModalRenderCallback'

  return renderDraggableModal
}
