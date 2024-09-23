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
  children: React.JSX.Element | string
  iconName?: IconNameType
  className?: string
  theme?: TagTheme
}

export type IconNameType = 'world' | 'user'

export type TagTheme = 'transparent' | 'user-role' | 'admin-role' | 'link-blue' | 'link-purple'

export const Tag = ({ children, theme, color, iconName, className, ...props }: TagProps): React.JSX.Element => {
  const { styles } = useStyles()
  const classes = [styles.tag, className].filter(Boolean)
  theme !== undefined && classes.push(`theme-${theme}`)

  const getThemeColor = (): LiteralUnion<PresetColorType | PresetStatusColorType> | undefined => {
    switch (theme) {
      case 'link-blue':
        return 'blue'
      case 'link-purple':
        return 'processing'
      default:
        return color
    }
  }

  const isBordered = (): boolean => {
    const noBorderThemes: TagTheme[] = ['link-blue', 'link-purple']
    return theme !== undefined ? !noBorderThemes.includes(theme) : true
  }

  const renderIcon = (name: string): React.JSX.Element => (
    <Icon
      className="tag-icon"
      name={ name }
      options={ { width: '12px', height: '12px' } }
    />
  )

  const getThemeIcon = (): React.JSX.Element | null => {
    switch (theme) {
      case 'user-role':
        return renderIcon('user-01')
      case 'admin-role':
        return renderIcon('shield-02')
      default:
        return null
    }
  }

  const getIcon = (): React.JSX.Element | null => {
    if (theme !== undefined) {
      return getThemeIcon()
    }
    switch (iconName) {
      case 'world':
        return renderIcon('world')
      case 'user':
        return renderIcon('user-01')
      default:
        return null
    }
  }

  return (
    <AntTag
      bordered={ isBordered() }
      className={ classes.join(' ') }
      color={ getThemeColor() }
      icon={ getIcon() }
      { ...props }
    >
      {children}
    </AntTag>
  )
}
