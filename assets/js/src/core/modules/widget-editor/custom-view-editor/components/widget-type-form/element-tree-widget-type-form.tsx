import React from 'react'
import { AllowedContextMenuPanel } from "./components/allowed-context-menu/allowed-context-menu"
import { AllowedObjectsPanel } from './components/allowed-objects-panel/allowed-objects-panel'
import { FilterPanel } from './components/filter-panel/filter-panel'
import { SpecificPanel } from "./components/specific-panel/specific-panel"

export const ElementTreeWidgetTypeForm = (): React.JSX.Element => {
  return (
    <>
      <SpecificPanel />
      <AllowedObjectsPanel />
      <AllowedContextMenuPanel />
      <FilterPanel />
    </>
  )
}