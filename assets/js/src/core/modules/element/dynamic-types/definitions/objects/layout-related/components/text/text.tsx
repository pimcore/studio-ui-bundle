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

export interface TextProps extends AbstractObjectLayoutDefinition {
  html: string
  title?: string
  border?: boolean
  collapsible?: boolean
  collapsed?: boolean
}

export const Text = (props: TextProps): React.JSX.Element => {
  return (
    <BaseView
      border={ props.border }
      collapsed={ props.collapsed }
      collapsible={ props.collapsible }
      title={ props.title }
    >
      <SanitizeHtml html={ props.html } />
    </BaseView>
  )
}
