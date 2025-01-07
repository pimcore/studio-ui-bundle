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

import React, { useRef, useState } from 'react'
import { Flex } from 'antd'
import cn from 'classnames'
import { SplitLayoutItem, type SplitLayoutItemProps } from './components/item/split-layout-item'
import { Divider } from './components/divider/divider'
import { useStyles } from './split-layout.styles'

interface ISplitLayoutItem extends Omit<SplitLayoutItemProps, 'withDivider' | 'onResize'> {}

export interface SplitLayoutProps {
  leftItem: ISplitLayoutItem
  rightItem: ISplitLayoutItem
  withDivider?: boolean
  resizeAble?: boolean
  withToolbar?: boolean
}

interface ISplitLayoutItemSizing extends Omit<ISplitLayoutItem, 'children'> {}

const RESIZE_INCREMENT = 5 // define the amount to resize with each key press

export const SplitLayout = ({ leftItem, rightItem, withDivider = false, resizeAble = false, withToolbar = false }: SplitLayoutProps): React.JSX.Element => {
  const leftItemRef = useRef<HTMLDivElement>(null)
  const rightItemRef = useRef<HTMLDivElement>(null)
  const elementRef = useRef<HTMLDivElement>(null)

  const { styles } = useStyles()

  const { children: leftItemChildren, ...leftSizing } = leftItem
  const { children: rightItemChildren, ...rightSizing } = rightItem

  const [internalLeftItemSizing, setInternalLeftItemSizing] = useState<ISplitLayoutItemSizing>(leftSizing)
  const [internalRightItemSizing, setInternalRightItemSizing] = useState<ISplitLayoutItemSizing>(rightSizing)

  const onMouseResize = (event: MouseEvent): void => {
    const leftRect = leftItemRef.current!.getBoundingClientRect()
    const rightRect = rightItemRef.current!.getBoundingClientRect()
    const elementRect = elementRef.current!.getBoundingClientRect()

    setInternalLeftItemSizing({
      ...internalLeftItemSizing,
      size: (leftRect.width + event.movementX) / elementRect.width * 100
    })

    setInternalRightItemSizing({
      ...internalRightItemSizing,
      size: (rightRect.width - event.movementX) / elementRect.width * 100
    })
  }

  const onKeyboardResize = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    const leftRect = leftItemRef.current!.getBoundingClientRect()
    const rightRect = rightItemRef.current!.getBoundingClientRect()

    if (event.key === 'ArrowLeft') {
      setInternalLeftItemSizing({
        ...internalLeftItemSizing,
        size: leftRect.width - RESIZE_INCREMENT
      })

      setInternalRightItemSizing({
        ...internalRightItemSizing,
        size: rightRect.width + RESIZE_INCREMENT
      })
    }

    if (event.key === 'ArrowRight') {
      setInternalLeftItemSizing({
        ...internalLeftItemSizing,
        size: leftRect.width + RESIZE_INCREMENT
      })

      setInternalRightItemSizing({
        ...internalRightItemSizing,
        size: rightRect.width - RESIZE_INCREMENT
      })
    }
  }

  return (
    <Flex
      className={ cn('split-layout', styles.splitLayout) }
      ref={ elementRef }
    >
      <SplitLayoutItem
        ref={ leftItemRef }
        { ...internalLeftItemSizing }
      >
        { leftItemChildren }
      </SplitLayoutItem>

      {withDivider && (
      <Divider
        onKeyboardResize={ resizeAble ? onKeyboardResize : undefined }
        onMouseResize={ resizeAble ? onMouseResize : undefined }
        withToolbar={ withToolbar }
      />
      )}

      <SplitLayoutItem
        ref={ rightItemRef }
        { ...internalRightItemSizing }
      >
        { rightItemChildren }
      </SplitLayoutItem>
    </Flex>
  )
}
