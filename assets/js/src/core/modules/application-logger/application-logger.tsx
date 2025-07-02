import { isNil } from "lodash"
import { BundleApplicationLoggerGetCollectionApiResponse } from "./application-logger-api-slice.gen"
import { Table } from "./components/table/table"
import React from "react"
import { ContentLayout, Sidebar } from "@sdk/components"
import { sidebarManager } from "./components/sidebar"

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