import { ContentLayout, Sidebar } from "@sdk/components"
import { isNil } from "lodash"
import React from "react"
import { BundleApplicationLoggerGetCollectionApiResponse } from "./application-logger-api-slice.gen"
import { sidebarManager } from "./components/sidebar"
import { Table } from "./components/table/table"

interface ApplicationLoggerProps {
  items: BundleApplicationLoggerGetCollectionApiResponse['items']
}

export const ApplicationLogger = ({ items }: ApplicationLoggerProps): React.JSX.Element => {
  if (isNil(items)) {
    return <></>
  }

  return (
    <ContentLayout
      renderSidebar={
        <Sidebar
          entries={sidebarManager.getEntries()}
        />
      }
    >
      <Table items={items} />
    </ContentLayout>
  )
}