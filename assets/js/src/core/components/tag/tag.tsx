/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode } from 'react'
import { Tag as AntTag, type TagProps as AntTagPropsProps } from 'antd'
import cn from 'classnames'
import { Icon } from '@Pimcore/components/icon/icon'
import { useStyles } from './tag.styles'

export interface TagProps extends AntTagPropsProps, React.RefAttributes<HTMLSpanElement> {
  children: ReactNode
  iconName?: string
  className?: string
  theme?: TagTheme
}

export type TagTheme = 'transparent'

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(({ children, icon, iconName, theme, className, ...props }, ref): React.JSX.Element => {
  const { styles } = useStyles()

  const tagClassNames = cn(
    styles.tag,
    className,
    { [`theme-${theme}`]: theme }
  )

  const renderIcon = (name: string): React.JSX.Element => (
    <Icon
      className="tag-icon"
      options={ { width: '12px', height: '12px' } }
      value={ name }
    />
  )

  const getIcon = (): React.ReactNode => {
    if (iconName !== undefined) {
      return renderIcon(iconName)
    }

    return icon ?? null
  }

  return (
    <AntTag
      className={ tagClassNames }
      icon={ getIcon() }
      ref={ ref }
      { ...props }
    >
      {children}
    </AntTag>
  )
})

Tag.displayName = 'Tag'
