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
import { type ISidebarButton } from '@Pimcore/modules/element/sidebar/sidebar-manager'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'

interface SidebarButtonProps extends Omit<ISidebarButton, 'component'> {
  index: number
}

const HALF_DIVISOR = 2
const PERCENT_MULTIPLIER = 100

export const FocalPointSidebarButton = (props: Partial<SidebarButtonProps>): React.JSX.Element => {
  const { id } = useContext(AssetContext)
  const focalPointContext = useContext(FocalPointContext)

  const { addImageSettings } = useAssetDraft(id)

  const handleClick = (): void => {
    if (!isUndefined(focalPointContext)) {
      const {
        isActive,
        setIsActive,
        setCoordinates,
        containerRef
      } = focalPointContext

      if (!isNull(containerRef.current)) {
        const container = containerRef.current

        const scrollLeft = container.scrollLeft
        const scrollTop = container.scrollTop

        const visibleWidth = container.clientWidth
        const visibleHeight = container.clientHeight

        const fullWidth = container?.firstElementChild?.clientWidth ?? 0
        const fullHeight = container?.firstElementChild?.clientHeight ?? 0

        const percentX = fullWidth >= visibleWidth
          ? ((scrollLeft + visibleWidth / HALF_DIVISOR) / fullWidth) * PERCENT_MULTIPLIER
          : 50

        const percentY = fullHeight >= visibleHeight
          ? ((scrollTop + visibleHeight / HALF_DIVISOR) / fullHeight) * PERCENT_MULTIPLIER
          : 50

        const updatedCoordinates = { x: percentX, y: percentY }

        setCoordinates(updatedCoordinates)
        addImageSettings({ focalPoint: updatedCoordinates })

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
