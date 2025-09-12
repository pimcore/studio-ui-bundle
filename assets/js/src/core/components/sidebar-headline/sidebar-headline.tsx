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
import { useStyles } from './sidebar-headline.styles'

export interface SidebarHeadlineProps {
  children: React.ReactNode
  withBorder?: boolean
  asFormLabel?: boolean
  className?: string
}

export const SidebarHeadline = ({
  children,
  withBorder = false,
  asFormLabel = false,
  className
}: SidebarHeadlineProps): React.JSX.Element => {
  const { styles } = useStyles()

  const containerClassName = classNames(
    asFormLabel
      ? (withBorder ? styles.containerAsFormLabelWithBorder : styles.containerAsFormLabel)
      : (withBorder ? styles.containerWithBorder : styles.container),
    className
  )

  return (
    <div className={ containerClassName }>
      <Title titleClass={ styles.title }>{children}</Title>
    </div>
  )
}
