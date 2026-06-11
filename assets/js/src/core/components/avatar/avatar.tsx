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
import { Avatar as AntAvatar, type AvatarProps as AntAvatarProps } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'

export interface AvatarProps extends AntAvatarProps {}

const getDefaultIconSize = (size: AvatarProps['size']): number => {
  if (typeof size === 'number') return Math.round(size * 14 / 24)
  if (size === 'small') return 14
  if (size === 'large') return 24
  return 18
}

export const Avatar = ({ icon, size, ...props }: AvatarProps): React.JSX.Element => {
  const iconSize = getDefaultIconSize(size)
  const resolvedIcon = icon ?? (
  <Icon
    options={ { width: iconSize, height: iconSize } }
    value='user'
  />
  )

  return (
    <AntAvatar
      icon={ resolvedIcon }
      size={ size }
      { ...props }
    />
  )
}
