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
import { FocalPointContext } from '@Pimcore/components/focal-point/context/focal-point-context'
import { type ISidebarButton } from '@Pimcore/modules/element/sidebar/sidebar-manager'

interface SidebarButtonProps extends Omit<ISidebarButton, 'component'> {
  index: number
}

export const FocalPointSidebarButton = (props: Partial<SidebarButtonProps>): React.JSX.Element => {
  const focalPointContext = useContext(FocalPointContext)

  const onClick = (): void => {
    if (focalPointContext !== undefined) {
      const {
        isActive,
        setIsActive,
        setCoordinates,
        containerRef
      } = focalPointContext

      if (containerRef.current !== null) {
        const calcX = containerRef.current.clientWidth * 0.5
        const calcY = containerRef.current.clientHeight * 0.5

        setCoordinates({ x: calcX, y: calcY })
        setIsActive(!isActive)
      }
    }
  }

  return (
    <div
      aria-label={ props.key }
      className={ [
        'button',
        focalPointContext?.isActive === true ? 'button--highlighted' : ''
      ].join(' ') }
      key={ props.key }
      onClick={ onClick }
      onKeyDown={ onClick }
      role={ 'button' }
      tabIndex={ props.index }
    >
      { props.icon }
    </div>
  )
}
