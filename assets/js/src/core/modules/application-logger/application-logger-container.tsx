import React from "react"
import { ApplicationLoggerContainerInner } from "./application-logger-container-inner"
import { FilterProvider } from "./components/sidebar/tabs/filter/provider/filter-provider/filter-provider"

export const ApplicationLoggerContainer = (): React.JSX.Element => {

  return (
    <FilterProvider>
      <ApplicationLoggerContainerInner />
    </FilterProvider>
  )
}