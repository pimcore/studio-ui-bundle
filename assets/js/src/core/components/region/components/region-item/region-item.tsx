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
