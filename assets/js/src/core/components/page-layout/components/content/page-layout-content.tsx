/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode } from 'react'
import cn from 'classnames'
import { Content } from '../../../content/content'
import { useStyles } from './page-layout-content.styles'

export interface PageLayoutContentProps {
  variant: 'content'
  children: ReactNode
  className?: string
  /** Rendered above the content, e.g. a `Header` or a `Toolbar` with `position="top"`. */
  renderTopBar?: ReactNode
  /** Rendered next to the content, across the full height. */
  renderSidebar?: ReactNode
  /** Rendered below the content. */
  renderToolbar?: ReactNode
}

export const PageLayoutContent = (props: Readonly<PageLayoutContentProps>): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <div
      className={ cn('content-toolbar-sidebar-layout', styles.ContentLayout, props.className, {
        'content-toolbar-sidebar-layout--with-toolbar': props.renderToolbar !== undefined
      }) }
    >
      { props.renderTopBar !== undefined && (
        <div className='content-toolbar-sidebar-layout__top-bar'>
          {props.renderTopBar}
        </div>
      )}

      <Content className='content-toolbar-sidebar-layout__content relative'>
        {props.children}
      </Content>

      { props.renderToolbar !== undefined && (
        <div className='content-toolbar-sidebar-layout__toolbar'>
          {props.renderToolbar}
        </div>
      )}

      { props.renderSidebar !== undefined && (
        <div className='content-toolbar-sidebar-layout__sidebar'>
          {props.renderSidebar}
        </div>
      )}
    </div>
  )
}
