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
import { GlobalOutlined, UserOutlined } from '@ant-design/icons'

export interface TagProps extends AntTagPropsProps {
  tagText: string
  iconName: IconNameType
  className?: string
}

export type IconNameType = 'world' | 'user'

export const Tag = ({ tagText, iconName, className, ...props }: TagProps): React.JSX.Element => {
  const { styles } = useStyles()
  const classes = [styles.tag, className].filter(Boolean).join(' ')

  const renderIcon = (): React.JSX.Element | null => {
    switch (iconName) {
      case 'world':
        return <GlobalOutlined />
      case 'user':
        return <UserOutlined />
      default:
        return null
    }
  }

  return (
    <AntTag
      className={ classes }
      icon={ renderIcon() }
      { ...props }
    >
      {tagText}
    </AntTag>
  )
}
