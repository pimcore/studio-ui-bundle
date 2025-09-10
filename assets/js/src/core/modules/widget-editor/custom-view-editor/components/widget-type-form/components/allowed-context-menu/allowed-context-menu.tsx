import React from 'react'
import { DataObjectContextMenuOptions } from "./data-object-context-menu-options"
import { AssetContextMenuOptions } from './asset-context-menu-options'
import { DocumentContextMenuOptions } from './document-context-menu-options'

export const AllowedContextMenuPanel = (): React.JSX.Element => {
  return (
    <>
      <DataObjectContextMenuOptions />
      <AssetContextMenuOptions />
      <DocumentContextMenuOptions />
    </>
  )
}