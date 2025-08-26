import React, { ReactElement } from "react"
import { SidebarProvider, SidebarProviderProps } from "../sidebar-provider"
import { Icon } from "@Pimcore/components/icon/icon"
import { InlineHelpSidebarEntry } from "./inline-help-sidebar-entry"
import { InlineHelpProvider } from "./inline-help-provider"

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
