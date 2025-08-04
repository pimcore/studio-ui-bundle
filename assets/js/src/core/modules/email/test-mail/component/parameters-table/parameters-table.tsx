import { Flex } from "@Pimcore/components/flex/flex"
import { Grid } from "@Pimcore/components/grid/grid"
import { DefaultCell, IconButton, IconTextButton } from "@sdk/components"
import { createColumnHelper } from "@tanstack/react-table"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"

interface TestEmailParametersTableProps {
  key: string
  value: string
}

export const ParametersTable = (): React.JSX.Element => {
  const { t } = useTranslation()
  const [data, setData] = useState<TestEmailParametersTableProps[]>([
    { key: '', value: '' }
  ])

  const columnHelper = createColumnHelper<TestEmailParametersTableProps>()
  const columns = [
    columnHelper.accessor('key', {
      header: t('test-email.parameters.columns.key'),
      cell: info => <b><DefaultCell {...info} /></b>
    }),
    columnHelper.accessor('value', {
      header: t('test-email.parameters.columns.value'),
      meta: {
        autoWidth: true,
        editable: true
      },
      cell: info => <b><DefaultCell {...info} /></b>
    })
  ]

  return (
    <Flex vertical gap={4}>
      <Flex justify="end">
        <IconTextButton
          title="Add Parameter"
          icon={{ value: 'new' }}
          onClick={() => {
            setData([...data, { key: '', value: '' }])
          }}
        >
          {t('test-email.parameters.add')}
        </IconTextButton>
      </Flex>
      <Grid
        autoWidth
        columns={columns}
        data={data}
        resizable
      />
    </Flex>
  )
}