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

import React from 'react'
import { StackListItem, type StackListItemProps } from './stack-list-item'
import { useStyles } from './stack-list.styles'

export interface StackListProps {
  items: StackListItemProps[]
}

export const StackList = ({ items }: StackListProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <div className={ ['stack-list', styles.stackList].join(' ') }>
      {items.map((item, index) => (
        <div
          className="stack-list__item"
          key={ index }
        >
          <StackListItem { ...item } />
        </div>
      ))}
    </div>
  )
}
