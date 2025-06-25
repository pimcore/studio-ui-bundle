import { Content } from "@Pimcore/components/content/content"
import { Grid } from "@Pimcore/components/grid/grid"
import meta from "@Pimcore/components/iframe/iframe.stories"
import { EmailLog, EmailLogObjectParameterData, EmailLogParameters, useEmailLogGetParamsQuery } from "@Pimcore/modules/email/emails-api-slice.gen"
import { DefaultCell } from "@sdk/components"
import { ElementCell, TextCell } from "@sdk/modules/element"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { isNil, isUndefined } from "lodash"
import React from "react"
import { useTranslation } from "react-i18next"

interface ParametersTabProps {
  email: EmailLog
}

interface ExtendedEmailLogParameters extends EmailLogParameters {
  computedValue: string | EmailLogObjectParameterData | null
}

export const ParametersTab = ({ email }: ParametersTabProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { data, isLoading } = useEmailLogGetParamsQuery({ id: email.id })

  const columnHelper = createColumnHelper<ExtendedEmailLogParameters>()
  const columns: Array<ColumnDef<ExtendedEmailLogParameters>> = [
    columnHelper.accessor('name', {
      header: t('widget.email-log.grid.name'),
    }),
    columnHelper.accessor('computedValue', {
      id: 'computedValue',
      header: t('widget.email-log.grid.value'),
      meta: {
        editable: false,
      },
      cell: (info) => {
        const row: ExtendedEmailLogParameters = info.row.original

        console.log('Cell', row, info)

        return <>
          {isNil(row.objectData)
            ? <DefaultCell {...{ ...info, column: { ...info.column, columnDef: { ...info.column.columnDef, meta: { ...info.column.columnDef.meta ?? {}, type: 'text' } } } }} />
            : <DefaultCell {...{ ...info, column: { ...info.column, columnDef: { ...info.column.columnDef, meta: { ...info.column.columnDef.meta ?? {}, type: 'element' } } } }} />
          }
        </>
      }
    })
  ]

  const dataToLoop = data?.data ?? []
  const extendedData: ExtendedEmailLogParameters[] = dataToLoop.map((parameter) => {
    let computedValue;

    if (!isNil(parameter.objectData)) {
      computedValue = {
        ...parameter.objectData,
        fullPath: parameter.objectData!.path
      }
    }

    return {
      ...parameter,
      computedValue: computedValue || parameter.value,
    }
  })

  return (
    <Content
      loading={isLoading}
      none={isUndefined(data?.data) || data.data.length === 0}
    >
      <Grid
        autoWidth
        columns={columns}
        data={extendedData}
      />
    </Content>
  )
}