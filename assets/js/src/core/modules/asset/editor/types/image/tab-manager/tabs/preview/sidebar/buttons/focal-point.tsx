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

import React, { useContext } from 'react'
import cn from 'classnames'
import { isNull, isUndefined } from 'lodash'
import { FocalPointContext } from '@Pimcore/components/focal-point/context/focal-point-context'
import { ZoomContext } from '@Pimcore/modules/asset/editor/types/image/tab-manager/tabs/preview/preview-container'
import { type ISidebarButton } from '@Pimcore/modules/element/sidebar/sidebar-manager'

interface SidebarButtonProps extends Omit<ISidebarButton, 'component'> {
  index: number
}

export const FocalPointSidebarButton = (props: Partial<SidebarButtonProps>): React.JSX.Element => {
  const focalPointContext = useContext(FocalPointContext)
  const { zoom } = useContext(ZoomContext)

  const zoomFactor = zoom / 100

  const handleClick = (): void => {
    if (!isUndefined(focalPointContext)) {
      const {
        isActive,
        setIsActive,
        setCoordinates,
        containerRef
      } = focalPointContext

      const image = containerRef.current?.querySelector('img')

      if (!isNull(containerRef.current) && !isUndefined(image) && !isNull(image)) {
        const container = containerRef.current

        const scrollLeft = container?.scrollLeft ?? 0
        const scrollTop = container?.scrollTop ?? 0

        console.log('=====>>>>scroll: ', scrollLeft, scrollTop)

        const visibleWidth = container?.clientWidth ?? 0
        const visibleHeight = container?.clientHeight ?? 0

        const contentWidth = container?.scrollWidth ?? 1
        const contentHeight = container?.scrollHeight ?? 1

        const centerX = scrollLeft + visibleWidth / 2
        const centerY = scrollTop + visibleHeight / 2

        const percentX = (centerX / contentWidth) * 100
        const percentY = (centerY / contentHeight) * 100

        console.log('=====>>>> coordinates: ', percentX, percentY, zoomFactor)

        setCoordinates({ x: 50, y: 50 })
        setIsActive(!isActive)
      }
    }
  }

  return (
    <div
      aria-label={ props.key }
      className={ cn('button', { 'button--highlighted': focalPointContext?.isActive === true }) }
      key={ props.key }
      onClick={ handleClick }
      onKeyDown={ handleClick }
      role={ 'button' }
      tabIndex={ props.index }
    >
      { props.icon }
    </div>
  )
}
