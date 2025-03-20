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
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type ElementIcon } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { isNil, isUndefined } from 'lodash'
import { useStyles } from './icon.styles'

type SubIconVariant = 'default' | 'green'

export interface IconProps extends Omit<ElementIcon, 'type'> {
  type?: ElementIcon['type']
  options?: React.SVGProps<SVGSVGElement>
  className?: string
  subIconName?: string
  subIconVariant?: SubIconVariant
}

export const Icon = ({ value, type = 'name', options, className, subIconName, subIconVariant = 'default', ...props }: IconProps): React.JSX.Element => {
  const iconLibrary = useInjection<IconLibrary>(serviceIds.iconLibrary)
  const width = options?.width ?? 16
  const height = options?.height ?? 16
  const { styles } = useStyles()

  const renderIcon = (): React.JSX.Element => {
    if (type === 'path') {
      return (
        <img
          alt={ '' }
          className='pimcore-icon__image'
          src={ value }
          style={ { width, height } }
        />
      )
    }

    const SvgIcon = iconLibrary.get(value)

    if (SvgIcon === undefined) {
      return <div style={ { width, height } } />
    }

    return (
      <SvgIcon
        height={ height }
        width={ width }
        { ...options }
      />
    )
  }

  const SubIcon = isUndefined(subIconName) ? undefined : iconLibrary.get(subIconName)

  return (
    <div
      className={ `pimcore-icon pimcore-icon-${value} anticon ${className}` }
      style={ { width, height, position: 'relative' } }
      { ...props }
    >
      {!isNil(SubIcon) && (
        <div className={ `${styles.subIcon} sub-icon-variant--${subIconVariant}` }><SubIcon /></div>
      )}
      {renderIcon()}
    </div >
  )
}
