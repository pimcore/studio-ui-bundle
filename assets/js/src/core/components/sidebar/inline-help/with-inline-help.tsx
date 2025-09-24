/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactElement } from 'react'
import { type SidebarProvider, type SidebarProviderProps } from '../sidebar-provider'
import { Icon } from '@Pimcore/components/icon/icon'
import { InlineHelpSidebarEntry } from './inline-help-sidebar-entry'
import { InlineHelpProvider } from './inline-help-provider'

export interface WithInlineHelpProps {
  Component: typeof SidebarProvider
}

export const sidebarEntry = {
  key: 'inline-help',
  icon: <Icon value="help-circle" />,
  component: <InlineHelpSidebarEntry />
}

export const WithInlineHelp = ({ Component }: WithInlineHelpProps): WithInlineHelpProps['Component'] => {
  const SidebarProviderWithInlineHelp = (props: SidebarProviderProps): ReactElement => {
    const decoratedProps: SidebarProviderProps = {
      ...props,
      initialEntries: [
        ...props.initialEntries ?? [],
        sidebarEntry
      ]
    }

    return (
      <InlineHelpProvider>
        <Component { ...decoratedProps } />
      </InlineHelpProvider>
    )
  }

  return SidebarProviderWithInlineHelp
}
