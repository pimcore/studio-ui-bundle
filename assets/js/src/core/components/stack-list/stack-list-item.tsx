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
import { useStyles } from './stack-list-item.styles'

export interface StackListItemProps {
  renderLeftToolbar?: React.ReactNode
  children: React.ReactNode
  renderRightToolbar?: React.ReactNode
}

export const StackListItem = ({ children, renderLeftToolbar, renderRightToolbar }: StackListItemProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <div className={ ['stack-list-item', styles.stackListItem].join(' ') }>
      {renderLeftToolbar !== undefined && <div className="stack-list-item__left-toolbar">{renderLeftToolbar}</div>}

      <div className="stack-list-item__content">
        {children}
      </div>

      {renderRightToolbar !== undefined && <div className="stack-list-item__right-toolbar">{renderRightToolbar}</div>}
    </div>
  )
}
