/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Flex } from '@Pimcore/components/flex/flex'
import { Grid } from '@Pimcore/components/grid/grid'
import { type SendEmailParameters } from '@Pimcore/modules/email/emails-api-slice-enhanced'
import { type OnUpdateCellDataEvent } from '@Pimcore/types/components/types'
import { IconTextButton } from '@sdk/components'
import { createColumnHelper } from '@tanstack/react-table'
import { type FormInstance } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useStyles } from './parameters-table.styles'

interface ParameterRow {
  key: string
  value: string
}

interface ParametersTableProps {
  form: FormInstance<SendEmailParameters>
}

export const ParametersTable = ({ form }: ParametersTableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const [data, setData] = useState<ParameterRow[]>([
    { key: '', value: '' }
  ])

  const columnHelper = createColumnHelper<ParameterRow>()
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
    <Flex
      gap={4}
      vertical
    >
      <Flex
        align="center"
        justify="space-between"
      >
        <p className={styles.formLabel}>
          {t('test-email.form.parameters')}
        </p>
        <IconTextButton
          icon={{ value: 'new' }}
          onClick={() => {
            setData([...data, { key: '', value: '' }])
          }}
          title={t('test-email.form.parameters.add-parameter')}
        >
          {t('test-email.parameters.add')}
        </IconTextButton>
      </Flex>
      <Grid
        autoWidth
        columns={columns}
        data={data}
        onUpdateCellData={onUpdateCellData}
        resizable
      />
    </Flex >
  )
}
