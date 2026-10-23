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
import { Divider } from '../../../split-layout/components/divider/divider'
import { PageLayoutPane, type PageLayoutPaneProps } from '../pane/page-layout-pane'
import { useStyles } from './page-layout-split.styles'

export interface PageLayoutSplitOptions {
  /** The item sizes are read on the first render only; later changes of `size`, `minSize` and `maxSize` are ignored. */
  leftItem: PageLayoutPaneProps
  rightItem: PageLayoutPaneProps
  /** Shows only the left item, at full width (with both flags set, both items stay visible). */
  leftItemFullWidth?: boolean
  /** Shows only the right item, at full width (with both flags set, both items stay visible). */
  rightItemFullWidth?: boolean
  withDivider?: boolean
  /** Lets the divider resize the items by mouse and arrow keys (needs `withDivider`). */
  resizeAble?: boolean
  /** Aligns the divider with a toolbar at the top of the items. */
  withToolbar?: boolean
}

export interface PageLayoutSplitProps extends PageLayoutSplitOptions {
  variant: 'split'
}

type PaneSizing = Omit<PageLayoutPaneProps, 'children'>

const RESIZE_INCREMENT = 5 // define the amount to resize with each key press

export const PageLayoutSplit = ({
  leftItem,
  rightItem,
  withDivider = false,
  resizeAble = false,
  withToolbar = false,
  leftItemFullWidth = false,
  rightItemFullWidth = false
}: Readonly<PageLayoutSplitOptions>): React.JSX.Element => {
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

  const isLeftItemFullWidth = leftItemFullWidth && !rightItemFullWidth
  const isRightItemFullWidth = rightItemFullWidth && !leftItemFullWidth

  return (
    <Flex
      className={ cn('split-layout', styles.splitLayout) }
      ref={ elementRef }
    >
      {!isRightItemFullWidth && (
        <PageLayoutPane
          ref={ leftItemRef }
          { ...internalLeftItemSizing }
          size={ leftItemFullWidth ? 100 : internalLeftItemSizing.size }
        >
          { leftItemChildren }
        </PageLayoutPane>
      )}

      {withDivider && !isLeftItemFullWidth && !isRightItemFullWidth && (
        <Divider
          onKeyboardResize={ resizeAble ? onKeyboardResize : undefined }
          onMouseResize={ resizeAble ? onMouseResize : undefined }
          withToolbar={ withToolbar }
        />
      )}

      {!isLeftItemFullWidth && (
        <PageLayoutPane
          ref={ rightItemRef }
          { ...internalRightItemSizing }
          size={ rightItemFullWidth ? 100 : internalRightItemSizing.size }
        >
          { rightItemChildren }
        </PageLayoutPane>
      )}
    </Flex>
  )
}
