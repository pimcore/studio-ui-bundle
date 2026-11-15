/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useRef, useState } from 'react'
import { Flex } from 'antd'
import cn from 'classnames'
import { Divider } from './divider'
import { PageLayoutPane, type PageLayoutPaneProps } from './page-layout-pane'
import { useStyles } from './page-layout-split.styles'

export interface PageLayoutSplitProps {
  variant: 'split'
  /** The item sizes are read on the first render only; later changes of `size`, `minSize` and `maxSize` are ignored. */
  leftItem: PageLayoutPaneProps
  rightItem: PageLayoutPaneProps
  className?: string
  /** Shows only this item, at full width. */
  fullWidth?: 'left' | 'right'
  withDivider?: boolean
  /** Lets the divider resize the items by mouse and arrow keys (needs `withDivider`). */
  resizable?: boolean
  /** Aligns the divider with a toolbar at the top of the items. */
  withToolbar?: boolean
}

type PaneSizing = Omit<PageLayoutPaneProps, 'children'>

const RESIZE_INCREMENT = 5 // define the amount to resize with each key press

export const PageLayoutSplit = ({
  leftItem,
  rightItem,
  fullWidth,
  className,
  withDivider = false,
  resizable = false,
  withToolbar = false
}: Readonly<Omit<PageLayoutSplitProps, 'variant'>>): React.JSX.Element => {
  const leftItemRef = useRef<HTMLDivElement>(null)
  const rightItemRef = useRef<HTMLDivElement>(null)
  const elementRef = useRef<HTMLDivElement>(null)

  const { styles } = useStyles()

  const { children: leftItemChildren, ...leftSizing } = leftItem
  const { children: rightItemChildren, ...rightSizing } = rightItem

  const [internalLeftItemSizing, setInternalLeftItemSizing] = useState<PaneSizing>(leftSizing)
  const [internalRightItemSizing, setInternalRightItemSizing] = useState<PaneSizing>(rightSizing)

  const resizeBy = (delta: number): void => {
    const leftRect = leftItemRef.current!.getBoundingClientRect()
    const rightRect = rightItemRef.current!.getBoundingClientRect()
    const elementRect = elementRef.current!.getBoundingClientRect()

    // the right item always takes the remaining space, so the combined width
    // stays constant even when one of the items is clamped by min/max size
    const totalWidth = leftRect.width + rightRect.width

    const minLeftWidth = Math.max(
      internalLeftItemSizing.minSize ?? 0,
      internalRightItemSizing.maxSize !== undefined ? totalWidth - internalRightItemSizing.maxSize : 0
    )
    const maxLeftWidth = Math.min(
      internalLeftItemSizing.maxSize ?? totalWidth,
      totalWidth - (internalRightItemSizing.minSize ?? 0)
    )

    const newLeftWidth = Math.min(Math.max(leftRect.width + delta, minLeftWidth), maxLeftWidth)

    setInternalLeftItemSizing({
      ...internalLeftItemSizing,
      size: newLeftWidth / elementRect.width * 100
    })

    setInternalRightItemSizing({
      ...internalRightItemSizing,
      size: (totalWidth - newLeftWidth) / elementRect.width * 100
    })
  }

  const onMouseResize = (event: MouseEvent): void => {
    resizeBy(event.movementX)
  }

  const onKeyboardResize = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'ArrowLeft') {
      resizeBy(-RESIZE_INCREMENT)
    }

    if (event.key === 'ArrowRight') {
      resizeBy(RESIZE_INCREMENT)
    }
  }

  return (
    <Flex
      className={ cn('split-layout', styles.splitLayout, className) }
      ref={ elementRef }
    >
      {fullWidth !== 'right' && (
        <PageLayoutPane
          ref={ leftItemRef }
          { ...internalLeftItemSizing }
          size={ fullWidth === 'left' ? 100 : internalLeftItemSizing.size }
        >
          { leftItemChildren }
        </PageLayoutPane>
      )}

      {withDivider && fullWidth === undefined && (
        <Divider
          onKeyboardResize={ resizable ? onKeyboardResize : undefined }
          onMouseResize={ resizable ? onMouseResize : undefined }
          withToolbar={ withToolbar }
        />
      )}

      {fullWidth !== 'left' && (
        <PageLayoutPane
          ref={ rightItemRef }
          { ...internalRightItemSizing }
          size={ fullWidth === 'right' ? 100 : internalRightItemSizing.size }
        >
          { rightItemChildren }
        </PageLayoutPane>
      )}
    </Flex>
  )
}
