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
import { Title } from '@Pimcore/components/title/title'
import {
  useStyles
} from '@Pimcore/components/header/header.styles'
import cn from 'classnames'

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.JSX.Element
  fullWidth?: boolean
  title: string
}

export const Header = (props: HeaderProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { icon, title, children, fullWidth, ...rest } = props
  const classNames = cn(styles.header, props.className)

  return (
    <div
      { ...rest }
      className={ classNames }
    >
      {title !== '' && (
        <span className={ 'header__text' }>
          <Title icon={ icon }>
            {title}
          </Title>
        </span>
      )}

      <div className={ cn('header__content', { 'w-full': fullWidth === true }) }>
        {children}
      </div>
    </div>
  )
}
