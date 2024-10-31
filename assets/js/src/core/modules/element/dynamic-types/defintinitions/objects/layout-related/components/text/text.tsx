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
