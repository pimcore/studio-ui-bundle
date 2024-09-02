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

import { Flex } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useStyles } from './split-layout.styles'
import { SplitLayoutItem, type SplitLayoutItemProps } from './item/split-layout-item'

export interface ISplitLayoutItem extends Omit<SplitLayoutItemProps, 'withDivider' | 'onResize'> {}

export interface SplitLayoutProps {
  leftItem: ISplitLayoutItem
  rightItem: ISplitLayoutItem
  withDivider?: boolean
  resizeAble?: boolean
}

export const SplitLayout = ({ leftItem, rightItem, withDivider = false, resizeAble = false }: SplitLayoutProps): React.JSX.Element => {
  const { styles } = useStyles()
  const leftItemRef = useRef<HTMLDivElement>(null)
  const rightItemRef = useRef<HTMLDivElement>(null)
  const elementRef = useRef<HTMLDivElement>(null)
  const [internalLeftItem, setInternalLeftItem] = useState<ISplitLayoutItem>(leftItem)
  const [internalRightItem, setInternalRightItem] = useState<ISplitLayoutItem>(rightItem)

  useEffect(() => {
    setInternalLeftItem(leftItem)
  }, [leftItem])

  useEffect(() => {
    setInternalRightItem(rightItem)
  }, [rightItem])

  return (
    <Flex
      className={ ['split-layout', styles.splitLayout].join(' ') }
      ref={ elementRef }
    >
      <SplitLayoutItem
        ref={ leftItemRef }
        { ...internalLeftItem }
        onResize={ resizeAble ? onResize : undefined }
        withDivider={ withDivider }
      />

      <SplitLayoutItem
        ref={ rightItemRef }
        { ...internalRightItem }
      />
    </Flex>
  )

  function onResize (event: MouseEvent): void {
    const leftRect = leftItemRef.current!.getBoundingClientRect()
    const rightRect = rightItemRef.current!.getBoundingClientRect()
    const elementRect = elementRef.current!.getBoundingClientRect()

    setInternalLeftItem({
      ...internalLeftItem,
      size: (leftRect.width + event.movementX) / elementRect.width * 100
    })

    setInternalRightItem({
      ...internalRightItem,
      size: (rightRect.width - event.movementX) / elementRect.width * 100
    })
  }
}
