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
import { type UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { IconButton } from '../icon-button/icon-button'

export interface StackListItemProps {
  id: UniqueIdentifier
  sortable?: boolean
  renderLeftToolbar?: React.ReactNode
  children: React.ReactNode
  renderRightToolbar?: React.ReactNode
  body?: React.ReactNode
  meta?: unknown
}

export const StackListItem = ({ id, children, body, sortable = false, renderLeftToolbar, renderRightToolbar }: StackListItemProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { listeners, setNodeRef, setActivatorNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? undefined
  }

  return (
    <div
      className={ ['stack-list-item', styles.stackListItem].join(' ') }
      ref={ setNodeRef }
      style={ style }
    >
      <div className="stack-list-item__title">
        {sortable && (
          <IconButton
            icon={ { value: 'drag-option' } }
            ref={ setActivatorNodeRef }
            theme='secondary'
            { ...listeners }
          ></IconButton>
        )}

        {renderLeftToolbar !== undefined && <div className="stack-list-item__left-toolbar">{renderLeftToolbar}</div>}

        <div className="stack-list-item__content">
          {children}
        </div>

        {renderRightToolbar !== undefined && <div className="stack-list-item__right-toolbar">{renderRightToolbar}</div>}
      </div>

      {body !== undefined && (
        <div className='stack-list-item__body'>
          {body}
        </div>
      )}
    </div>
  )
}
