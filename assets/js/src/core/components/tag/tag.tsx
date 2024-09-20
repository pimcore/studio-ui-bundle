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

export interface TagProps extends AntTagPropsProps {
  tagText: string
  iconName?: IconNameType
  className?: string
  theme?: TagTheme
}

export type IconNameType = 'world' | 'user'

export type TagTheme = 'transparent' | 'user-role' | 'admin-role'

export const Tag = ({ tagText, theme, iconName, className, ...props }: TagProps): React.JSX.Element => {
  const { styles } = useStyles()
  const classes = [styles.tag, className].filter(Boolean)

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
      className={ classes.join(' ') }
      icon={ renderIcon() }
      { ...props }
    >
      {tagText}
    </AntTag>
  )
}
