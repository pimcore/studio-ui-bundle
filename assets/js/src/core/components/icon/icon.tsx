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

import { useInjection } from '@Pimcore/app/depency-injection'
import { type IconLibrary } from '@Pimcore/modules/icon-library/services/icon-library'
import React from 'react'
import { serviceIds } from '@Pimcore/app/config/services'

export interface IconProps {
  name: string
  options?: React.SVGProps<SVGSVGElement>
  className?: string
}

export const Icon = ({ name, options, className }: IconProps): React.JSX.Element => {
  const iconLibrary = useInjection<IconLibrary>(serviceIds.iconLibrary)
  const SvgIcon = iconLibrary.get(name)
  const width = options?.width ?? 16
  const height = options?.height ?? 16

  if (SvgIcon === undefined) {
    return <div style={ { width, height } } />
  }

  return (
    <div
      className={ `pimcore-icon pimcore-icon-${name} anticon ${className}` }
      style={ { width, height } }
    >
      <SvgIcon
        height={ height }
        width={ width }
        { ...options }
      />
    </div>
  )
}
