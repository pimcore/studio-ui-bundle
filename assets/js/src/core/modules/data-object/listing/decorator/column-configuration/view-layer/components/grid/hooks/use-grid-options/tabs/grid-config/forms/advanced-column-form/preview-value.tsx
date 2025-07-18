import { GridContentRenderer } from "@Pimcore/components/grid-content-renderer/grid-content-renderer"
import { Grid } from "@Pimcore/components/grid/grid"
import { createColumnHelper } from "@tanstack/react-table"
import React from "react"

export interface PreviewValueProps {
  value: {
    type: string
    value: any
  }[]
}

const columnHelper = createColumnHelper();

export const PreviewValue = (props: PreviewValueProps): React.JSX.Element => {
  const { value } = props

  const columns = value.map((item, index) => {
    return columnHelper.accessor(`${item.type}-${index}`, {
      header: item.type,
      meta: {
        editable: false,
        type: 'dataobject.adapter',
        config: {
          dataObjectType: item.type,
          dataObjectConfig: {}
        }
      }
    })
  })

  const data = [] as Record<string, any>[]
  const row = {} as Record<string, any>

  // Create a row with the values from the value array
  value.forEach((item, index) => {
    row[`${item.type}-${index}`] = item.value
  })

  data.push(row);

  return (
    <GridContentRenderer>
      <Grid columns={columns} data={data} autoWidth />
    </GridContentRenderer>
  )
}
