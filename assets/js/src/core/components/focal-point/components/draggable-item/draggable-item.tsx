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

import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { Button } from 'antd'
import {CSS} from '@dnd-kit/utilities'
import {Icon} from "@Pimcore/components/icon/icon";
import { useStyle } from './draggable-item.styles';

interface DraggableItemProps {
  style?: React.CSSProperties
  top?: number
  left?: number
  children: React.ReactNode
}

export const DraggableItem = ({ style, top, left, children }: DraggableItemProps): React.JSX.Element => {
  const {styles} = useStyle()
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: 'draggable'
    })

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const craftedStyle = {
    //...style,
    position: 'absolute',
    zIndex: 1000,
    top,
    left,
    transform: CSS.Transform.toString(transform),
  } as React.CSSProperties

  return (
    <div className={styles.draggableContainer}>
      <Button
        type={'dashed'}
        icon={<Icon name={'focal-point'} />}
        { ...attributes }
        { ...listeners }
        aria-label="Draggable"
        data-cypress="draggable-item"
        ref={ setNodeRef }
        className={styles.draggableItem}
        style={ { ...craftedStyle } }
      />

      {children}
    </div>
  )
}
