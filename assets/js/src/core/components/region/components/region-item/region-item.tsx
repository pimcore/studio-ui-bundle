/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useStyles } from './region-item.styles'
import React, { type ReactNode } from 'react'
import cn from 'classnames'

export interface RegionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  region: string
  maxWidth?: string
  component: ReactNode
}

export const RegionItem = (props: RegionItemProps): React.JSX.Element => {
  const { region, component, ...restProps } = props
  const { styles } = useStyles(props)
  const classnames = cn(styles.regionItem)

  return (
    <div
      className={ classnames }
      { ...restProps }
    >
      {component}
    </div>
  )
}
