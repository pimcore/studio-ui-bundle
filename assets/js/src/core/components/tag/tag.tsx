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

import { Tag as AntTag, type TagProps as AntTagPropsProps } from 'antd'
import React from 'react'
import { useStyles } from './tag.styles'
import { Icon } from '@Pimcore/components/icon/icon'
import { type LiteralUnion } from 'antd/es/_util/type'
import type { PresetColorType, PresetStatusColorType } from 'antd/es/_util/colors'

export interface TagProps extends AntTagPropsProps {
  text: string
  iconName?: IconNameType
  className?: string
  theme?: TagTheme
}

export type IconNameType = 'world' | 'user'

export type TagTheme = 'transparent' | 'user-role' | 'admin-role' | 'link-blue' | 'link-purple'

export const Tag = ({ text, theme, color, iconName, className, ...props }: TagProps): React.JSX.Element => {
  const { styles } = useStyles()
  const classes = [styles.tag, className].filter(Boolean)

  const themeColor = (): LiteralUnion<PresetColorType | PresetStatusColorType> | undefined => {
    switch (theme) {
      case 'link-blue':
        return 'blue'
      case 'link-purple':
        return 'processing'
      default:
        return color
    }
  }

  const themeBorder = (): boolean => {
    switch (theme) {
      case 'link-blue':
        return false
      case 'link-purple':
        return false
      default:
        return true
    }
  }

  const renderThemeIcon = (): React.JSX.Element | null => {
    switch (theme) {
      case 'user-role':
        return (
          <Icon
            className="tag-icon"
            name="user-01"
            options={ { width: '12px', height: '12px' } }
          />
        )
      case 'admin-role':
        return (
          <Icon
            className="tag-icon"
            name="shield-02"
            options={ { width: '12px', height: '12px' } }
          />
        )
      default:
        return null
    }
  }

  const renderIcon = (): React.JSX.Element | null => {
    if (iconName === undefined) {
      return renderThemeIcon()
    }
    switch (iconName) {
      case 'world':
        return (
          <Icon
            className="tag-icon"
            name="world"
            options={ { width: '12px', height: '12px' } }
          />
        )
      case 'user':
        return (
          <Icon
            className="tag-icon"
            name="user-01"
            options={ { width: '12px', height: '12px' } }
          />
        )
      default:
        return null
    }
  }

  theme !== undefined && classes.push(`theme-${theme}`)

  return (
    <AntTag
      bordered={ themeBorder() }
      className={ classes.join(' ') }
      color={ themeColor() }
      icon={ renderIcon() }
      { ...props }
    >
      {text}
    </AntTag>
  )
}
