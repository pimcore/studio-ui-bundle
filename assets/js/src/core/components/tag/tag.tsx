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

import React, { type ReactNode } from 'react'
import { Tag as AntTag, type TagProps as AntTagPropsProps, Tooltip } from 'antd'
import cn from 'classnames'
import { Icon } from '@Pimcore/components/icon/icon'
import { isNumber, isString } from '@Pimcore/utils/type-utils'
import { useStyles } from './tag.styles'

export interface TagProps extends AntTagPropsProps {
  children: ReactNode
  iconName?: string
  className?: string
  theme?: TagTheme
  maxLength?: number
}

export type TagTheme = 'transparent'

export const Tag = ({ children, icon, iconName, theme, maxLength, className, ...props }: TagProps): React.JSX.Element => {
  const { styles } = useStyles()

  const isLimitedCharNumber = maxLength != null && isNumber(maxLength)
  const shouldTruncateText = isLimitedCharNumber && isString(children) && (children as string)?.length > maxLength
  const shouldShowTooltip = isLimitedCharNumber && shouldTruncateText

  const displayText = shouldTruncateText ? `${(children as string)?.substring(0, maxLength)}...` : children

  const tagClassNames = cn(
    styles.tag,
    className,
    { [`theme-${theme}`]: theme }
  )

  const renderIcon = (name: string): React.JSX.Element => (
    <Icon
      className="tag-icon"
      name={ name }
      options={ { width: '12px', height: '12px' } }
    />
  )

  const getIcon = (): React.ReactNode => {
    if (iconName !== undefined) {
      return renderIcon(iconName)
    }

    return icon ?? null
  }

  const renderTag = (): JSX.Element => (
    <AntTag
      className={ tagClassNames }
      icon={ getIcon() }
      { ...props }
    >
      {displayText}
    </AntTag>
  )

  return (
    <>
      {shouldShowTooltip
        ? (
          <Tooltip title={ children }>
            {renderTag()}
          </Tooltip>
          )
        : renderTag()
      }
    </>
  )
}
