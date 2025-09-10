import React from 'react'
import { DataObjectContextMenuOptionsPanel } from "./data-object-context-menu-options-panel"
import { AssetContextMenuOptionsPanel } from './asset-context-menu-options-panel'
import { DocumentContextMenuOptionsPanel } from './document-context-menu-options-panel'

export const AllowedContextMenuPanel = (): React.JSX.Element => {
  return (
    <>
      <DataObjectContextMenuOptionsPanel />
      <AssetContextMenuOptionsPanel />
      <DocumentContextMenuOptionsPanel />
    </>
  )
}