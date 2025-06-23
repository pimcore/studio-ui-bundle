import { Content } from "@Pimcore/components/content/content"
import { Grid } from "@Pimcore/components/grid/grid"
import { EmailLog, useEmailLogGetParamsQuery } from "@Pimcore/modules/email/emails-api-slice.gen"
import { ColumnDef } from "@tanstack/react-table"
import { isUndefined } from "lodash"
import React from "react"
import { useTranslation } from "react-i18next"

interface ParametersTabProps {
  email: EmailLog
}

export const ParametersTab = ({ email }: ParametersTabProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { data, isLoading } = useEmailLogGetParamsQuery({ id: email.id })

  const columns: Array<ColumnDef<any>> = [
    {
      header: t('widget.email-log.grid.name'),
      accessorKey: 'name'
    },
    {
      header: t('widget.email-log.grid.value'),
      accessorKey: 'value'
    }
  ]

  return (
    <Content
      loading={isLoading}
      none={isUndefined(data?.data) || data.data.length === 0}
    >
      <Grid
        columns={columns}
        data={data?.data ?? []}
      />
    </Content>
  )
}