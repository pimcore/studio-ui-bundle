/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React, { useState, useRef } from 'react'
import { type IModalProps, Modal } from '@Pimcore/components/modal/modal'
import type { DraggableData, DraggableEvent } from 'react-draggable'
import Draggable from 'react-draggable'
import { useStyle } from './window-modal.styles'
import cn from 'classnames'
import { Icon } from '@Pimcore/components/icon/icon'
import { Flex } from '@Pimcore/components/flex/flex'

export interface IWindowModalProps extends Omit<IModalProps, 'mask' | 'maskClosable' | 'maskStyle' | 'maskTransitionName' | 'wrapStyle' | 'modalRender'> {

}

export const WindowModal = (props: IWindowModalProps): React.JSX.Element => {
  const { styles } = useStyle()

  const [disabled, setDisabled] = useState(true)
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 })
  const draggleRef = useRef<HTMLDivElement>(null!)

  const onStart = (_event: DraggableEvent, uiData: DraggableData): void => {
    const { clientWidth, clientHeight } = window.document.documentElement
    const targetRect = draggleRef.current?.getBoundingClientRect()
    if (targetRect === undefined) {
      return
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y)
    })
  }

  return (
    <Modal
      { ...props }
      className={ cn(styles.modal, props.className) }
      mask={ false }
      maskClosable={ false }
      modalRender={ (modal) => (
        <Draggable
          bounds={ bounds }
          disabled={ disabled }
          nodeRef={ draggleRef }
          onStart={ (event, uiData) => { onStart(event, uiData) } }
        >
          <div ref={ draggleRef }>{modal}</div>
        </Draggable>
      ) }
      title={
        <div
          onBlur={ () => {} }
          onFocus={ () => {} }
          onMouseOut={ () => {
            setDisabled(true)
          } }
          onMouseOver={ () => {
            if (disabled) {
              setDisabled(false)
            }
          } }
          // fix eslintjsx-a11y/mouse-events-have-key-events
          // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
          style={ { width: '100%', cursor: 'move', flex: 1 } }
          // end
        >
          <Flex gap="small">
            {props.title ?? <Icon value={ 'drag-option' } />}
          </Flex>
        </div>
      }
      wrapStyle={ { pointerEvents: 'none' } }
    >
      {props.children}
    </Modal>
  )
}
