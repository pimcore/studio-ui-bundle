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
import { type AbstractObjectLayoutDefinition } from '../../dynamic-type-object-layout-abstract'
import { SanitizeHtml } from '@Pimcore/components/sanitize-html/sanitize-html'
import { BaseView } from '../../views/base-view'
import { parseInlineCss } from '@Pimcore/utils/css'

export interface TextProps extends AbstractObjectLayoutDefinition {
  html: string
  title?: string
  border?: boolean
  collapsible?: boolean
  collapsed?: boolean
  bodyStyle?: string | null
}

export const Text = (props: TextProps): React.JSX.Element => {
  const style = parseInlineCss(props.bodyStyle)
  const content = style !== undefined
    ? <div style={ style }><SanitizeHtml html={ props.html } /></div>
    : <SanitizeHtml html={ props.html } />

  return (
    <BaseView
      border={ props.border }
      collapsed={ props.collapsed }
      collapsible={ props.collapsible }
      title={ props.title }
    >
      {content}
    </BaseView>
  )
}
