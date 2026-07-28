/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Draggable, { type DraggableData, type DraggableEvent } from 'react-draggable'
import cn from 'classnames'
import { useStyle } from './use-draggable-modal.styles'

/**
 * CSS selectors (relative to the modal content) that initiate a drag.
 * Covers both the standard modal header and the imperative confirm/alert title.
 */
const DEFAULT_HANDLE = '.ant-modal-header, .ant-modal-confirm-title'

/**
 * CSS selectors inside the handle that must NOT start a drag, so interactive
 * header content (close button, links, form controls placed in the title)
 * keeps working. `react-draggable` matches these against the mousedown target.
 */
const DEFAULT_CANCEL = '.ant-modal-close, button, a, input, textarea, select, [role="button"], .ant-select, .ant-input, .ant-input-number, .ant-picker'

export interface UseDraggableModalOptions {
  /** When false the modal renders untouched (no drag behaviour, no wrapper). */
  disabled?: boolean
  /**
   * Controlled open state of the modal. When provided, the drag position is
   * reset to origin every time the modal opens, so a modal that was dragged
   * away does not reappear off-centre on the next open. Imperative modals are
   * destroyed on close, so they get a fresh position automatically and can
   * omit this.
   */
  open?: boolean
  /** Override the drag-handle selector. */
  handle?: string
  /** Override the non-draggable selector. */
  cancel?: string
  /** Extra class(es) merged onto the draggable wrapper element. */
  wrapperClassName?: string
}

export interface UseDraggableModalResult {
  /** Pass to antd `Modal`'s / `ModalFuncProps`' `modalRender`. */
  modalRender: (modal: React.ReactNode) => React.ReactNode
  /** The draggable container element; useful as a `getPopupContainer` target. */
  nodeRef: React.RefObject<HTMLDivElement>
}

/**
 * Shared drag-by-header behaviour for every Studio modal. Wraps the modal
 * content in `react-draggable` using the standard antd recipe (viewport bounds
 * recomputed on drag start, `nodeRef` to stay React-18/19 safe) and drives the
 * position in controlled mode so it can be reset between opens.
 */
export const useDraggableModal = (options: UseDraggableModalOptions = {}): UseDraggableModalResult => {
  const {
    disabled = false,
    open,
    handle = DEFAULT_HANDLE,
    cancel = DEFAULT_CANCEL,
    wrapperClassName
  } = options

  const { styles } = useStyle()
  const nodeRef = useRef<HTMLDivElement>(null)
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // Reset to origin (centred) whenever the modal transitions to open.
  useEffect(() => {
    if (open === true) {
      setPosition({ x: 0, y: 0 })
    }
  }, [open])

  const onStart = useCallback((_event: DraggableEvent, uiData: DraggableData): void => {
    const { clientWidth, clientHeight } = window.document.documentElement
    const targetRect = nodeRef.current?.getBoundingClientRect()
    if (targetRect === undefined || targetRect === null) {
      return
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y)
    })
  }, [])

  const onDrag = useCallback((_event: DraggableEvent, uiData: DraggableData): void => {
    setPosition({ x: uiData.x, y: uiData.y })
  }, [])

  const modalRender = useCallback((modal: React.ReactNode): React.ReactNode => {
    if (disabled) {
      return modal
    }

    return (
      <Draggable
        bounds={ bounds }
        cancel={ cancel }
        handle={ handle }
        nodeRef={ nodeRef }
        onDrag={ onDrag }
        onStart={ onStart }
        position={ position }
      >
        <div
          className={ cn(styles.draggableWrapper, wrapperClassName) }
          ref={ nodeRef }
        >
          {modal}
        </div>
      </Draggable>
    )
  }, [bounds, cancel, handle, disabled, position, onDrag, onStart, styles.draggableWrapper, wrapperClassName])

  return { modalRender, nodeRef }
}
