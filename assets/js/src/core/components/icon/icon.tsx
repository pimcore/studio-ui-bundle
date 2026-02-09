/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { isNil, isUndefined } from 'lodash'
import cn from 'classnames'
import { theme } from 'antd'
import { useInjection } from '@Pimcore/app/depency-injection'
import { type IconLibrary } from '@Pimcore/modules/icon-library/services/icon-library'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type ElementIcon as GeneratedElementIcon } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { useStyles } from './icon.styles'
import { type IconColorGroupsRegistry, type IconColorGroup } from './icon-color-groups-registry'

type SubIconVariant = 'default' | 'green'

export interface ElementIcon extends GeneratedElementIcon {
  colorToken?: string
}

export interface IconProps extends Omit<ElementIcon, 'type'> {
  type?: ElementIcon['type']
  options?: React.SVGProps<SVGSVGElement>
  className?: string
  subIconName?: string
  subIconVariant?: SubIconVariant
  sphere?: boolean
  onLoadError?: (hasError: boolean) => void
  iconColorGroup?: IconColorGroup
}

export const Icon = ({ value, type = 'name', options, className, subIconName, subIconVariant = 'default', sphere = false, onLoadError, iconColorGroup, colorToken, ...props }: IconProps): React.JSX.Element => {
  const iconLibrary = useInjection<IconLibrary>(serviceIds.iconLibrary)
  const iconColorGroupsRegistry = useInjection<IconColorGroupsRegistry>(serviceIds.iconColorGroupsRegistry)

  const width = options?.width ?? 16
  const height = options?.height ?? 16

  const { styles } = useStyles()
  const { token } = theme.useToken()

  const containerSize = sphere ? 24 : width
  const containerHeight = sphere ? 24 : height

  const isNameType = type === 'name'
  const isPathType = type === 'path'
  const SvgIcon = isNameType ? iconLibrary.get(value) : undefined
  const shouldHideIcon = isNameType && (isNil(value) || isUndefined(SvgIcon))

  const getIconColor = (): string | undefined => {
    if (!isUndefined(colorToken)) {
      return token[colorToken as keyof typeof token] as string ?? colorToken
    }

    if (isUndefined(iconColorGroup) || !isNameType) {
      return undefined
    }

    return iconColorGroupsRegistry.getIconColorValue(iconColorGroup, value, token)
  }

  const iconColor = getIconColor()

  const renderIcon = (): React.JSX.Element => {
    if (isPathType) {
      return (
        <img
          alt={ '' }
          className='pimcore-icon__image'
          onError={ () => { onLoadError?.(true) } }
          onLoad={ () => { onLoadError?.(false) } }
          src={ value }
          style={ { width, height } }
        />
      )
    }

    if (isUndefined(SvgIcon)) {
      return <div style={ { width, height } } />
    }

    return (
      <SvgIcon
        className='pimcore-icon__svg'
        height={ height }
        width={ width }
        { ...options }
      />
    )
  }

  const SubIcon = isUndefined(subIconName) ? undefined : iconLibrary.get(subIconName)

  const containerStyle = {
    width: sphere ? containerSize : width,
    height: sphere ? containerHeight : height,
    position: 'relative' as const,
    ...(sphere && {
      backgroundColor: token.colorFillAlter,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }),
    ...(!isUndefined(iconColor) && { color: iconColor })
  }

  return (
    <div
      className={ cn(`pimcore-icon pimcore-icon-${value} anticon ${className}`, {
        [styles.iconHide]: shouldHideIcon
      }) }
      style={ containerStyle }
      { ...props }
    >
      {!isNil(SubIcon) && (
        <div className={ `${styles.subIcon} pimcore-icon-sub-icon sub-icon-variant--${subIconVariant}` }><SubIcon /></div>
      )}
      {renderIcon()}
    </div >
  )
}
