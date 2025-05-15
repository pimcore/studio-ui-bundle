/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { memo, type ReactNode } from 'react'
import { useStyles } from './content-layout.styles'
import { Content } from '../content/content'

interface ContentToolbarViewProps {
  children: ReactNode
  renderTopBar?: ReactNode
  renderSidebar?: ReactNode
  renderToolbar?: ReactNode
}

const Component = (props: ContentToolbarViewProps): React.JSX.Element => {
  const { styles } = useStyles()
  const classes = ['content-toolbar-sidebar-layout', styles.ContentLayout]

  if (props.renderToolbar !== undefined) {
    classes.push('content-toolbar-sidebar-layout--with-toolbar')
  }

  return (
    <div className={ classes.join(' ') }>
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

export const ContentLayout = memo(Component)
