/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { useStyles } from './stack-list-item.styles'
import { type UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { IconButton } from '../icon-button/icon-button'
import { Collapse, CollapseItem } from '../collapse/collapse'

export const StackListItemTypes = {
  DEFAULT: 'default',
  COLLAPSE: 'collapse',
} as const

export type StackListItemType = (typeof StackListItemTypes)[keyof typeof StackListItemTypes]

export interface StackListItemProps {
  id: UniqueIdentifier
  type?: StackListItemType
  sortable?: boolean
  renderLeftToolbar?: React.ReactNode
  children: React.ReactNode
  renderRightToolbar?: React.ReactNode
  body?: React.ReactNode
  meta?: unknown
}

export const StackListItem = (props: StackListItemProps): React.JSX.Element => {
  const { id, children, body, sortable = false, renderLeftToolbar, renderRightToolbar, type = StackListItemTypes.DEFAULT } = props
  const { styles } = useStyles()
  const { listeners, setNodeRef, setActivatorNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition: transition ?? undefined
  }

  return useMemo(() => {
    if (type === StackListItemTypes.DEFAULT) {
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

    if (type === StackListItemTypes.COLLAPSE) {
      const leftSidebarContent = (
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

          <div className="stack-list-item__content">{children}</div>
        </div> 
      )      

      return (
        <div
          className={ ['stack-list-item', styles.stackListItem].join(' ') }
          ref={ setNodeRef }
          style={ style }
        >
          <CollapseItem contentPadding={'none'} label={<>{leftSidebarContent}</>} size='small' extra={renderRightToolbar} extraPosition='end' className={styles.stackListItem}>
            {body !== undefined ? <div className='stack-list-item__body'>{body}</div> : undefined}
          </CollapseItem>
        </div>
      )
    }

    throw new Error(`Unknown StackListItem type: ${type}`)
  }, [props, transform])
}
