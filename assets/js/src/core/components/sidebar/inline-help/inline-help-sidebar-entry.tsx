import React from "react"
import { useInlineHelp } from "./inline-help-provider"

export const InlineHelpSidebarEntry = (): React.JSX.Element => {
  const { component } = useInlineHelp();

  return (
    <>
      {component}
    </>
  )
}
