import { Flex } from "@Pimcore/components/flex/flex"
import { Grid } from "@Pimcore/components/grid/grid"
import { SendEmailParameters } from "@Pimcore/modules/email/emails-api-slice-enhanced"
import { OnUpdateCellDataEvent } from "@Pimcore/types/components/types"
import { IconTextButton } from "@sdk/components"
import { createColumnHelper } from '@tanstack/react-table'
import { FormInstance } from "antd"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useStyles } from './parameters-table.styles'

interface TestEmailParametersTableProps {
  key: string
  value: string
}

interface ParametersTableProps {
  form: FormInstance<SendEmailParameters>
}

export const ParametersTable = ({ form }: ParametersTableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const [data, setData] = useState<TestEmailParametersTableProps[]>([
    { key: '', value: '' }
  ])

  const columnHelper = createColumnHelper<TestEmailParametersTableProps>()
  const columns = [
    columnHelper.accessor('key', {
      header: t('test-email.parameters.columns.key'),
      meta: {
        editable: true
      }
    }),
    columnHelper.accessor('value', {
      header: t('test-email.parameters.columns.value'),
      meta: {
        autoWidth: true,
        editable: true
      }
    })
  ]

  const onUpdateCellData = async ({ rowIndex, value, columnId }: OnUpdateCellDataEvent): Promise<void> => {
    const updatedData = [...data]
    updatedData[rowIndex] = {
      ...updatedData[rowIndex],
      [columnId]: value
    }

    setData(updatedData)
    form.setFieldValue('documentParameters', updatedData)
  }

  return (
    <Flex vertical gap={4}>
      <Flex justify="space-between" align="center">
        <p className={styles.formLabel}>
          {t('test-email.form.parameters')}
        </p>
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
        onUpdateCellData={onUpdateCellData}
      />
    </Flex>
  )
}