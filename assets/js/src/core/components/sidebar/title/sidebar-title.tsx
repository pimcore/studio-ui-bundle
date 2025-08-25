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
import classNames from 'classnames'
import { Title } from '@Pimcore/components/title/title'
import { useStyles } from './sidebar-title.styles'

export interface SidebarTitleProps {
  children: React.ReactNode
  withBorder?: boolean
  className?: string
}

export const SidebarTitle = ({ 
  children, 
  withBorder = false, 
  className 
}: SidebarTitleProps): React.JSX.Element => {
  const { styles } = useStyles()

  const containerClassName = classNames(
    withBorder ? styles.containerWithBorder : styles.container,
    className
  )

  return (
    <div className={containerClassName}>
      <Title titleClass={styles.title}>{children}</Title>
    </div>
  )
}
