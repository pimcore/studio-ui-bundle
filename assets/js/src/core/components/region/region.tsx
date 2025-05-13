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
import { useStyles } from './region.styles'
import cn from 'classnames'
import { RegionItem, type RegionItemProps } from './components/region-item/region-item'

export interface RegionProps {
  layoutDefinition: string[]
  items: RegionItemProps[]
}

export const Region = (props: RegionProps): React.JSX.Element => {
  const { items } = props
  const { styles } = useStyles(props)

  const classnames = cn(styles.region)

  return (
    <div className={ classnames }>
      {items.map((item) => {
        return (
          <RegionItem
            component={ item.component }
            key={ item.region }
            maxWidth={ item.maxWidth }
            region={ item.region }
          />
        )
      })}
    </div>
  )
}
