import React from "react"
import { SelectedRowsProvider } from "./context/selected-items-context"
import { RecycleBinContainerInner } from "./recycle-bin-container-inner"

export const RecycleBinContainer = () => {
  return (
    <SelectedRowsProvider initialValue={{}}>
      <RecycleBinContainerInner />
    </SelectedRowsProvider>
  )
}