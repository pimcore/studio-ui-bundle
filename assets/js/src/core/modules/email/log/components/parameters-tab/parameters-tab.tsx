/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Content } from '@Pimcore/components/content/content'
import { Grid } from '@Pimcore/components/grid/grid'
import { type EmailLog, type EmailLogObjectParameterData, type EmailLogParameters, useEmailLogGetParamsQuery } from '@Pimcore/modules/email/emails-api-slice.gen'
import { addColumnMeta, DefaultCell } from '@sdk/components'
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { isNil, isUndefined } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'

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
      header: t('widget.email-log.grid.name')
    }),
    columnHelper.accessor('computedValue', {
      id: 'computedValue',
      header: t('widget.email-log.grid.value'),
      meta: {
        editable: false
      },
      cell: (info) => {
        const row: ExtendedEmailLogParameters = info.row.original

        return (
          <DefaultCell
            { ...addColumnMeta(info, { type: isNil(row.objectData) ? 'text' : 'element' }) }
          />
        )
      }
    })
  ]

  const dataToLoop = data?.data ?? []
  const extendedData: ExtendedEmailLogParameters[] = dataToLoop.map((parameter) => {
    let computedValue

    if (!isNil(parameter.objectData)) {
      computedValue = {
        ...parameter.objectData,
        fullPath: parameter.objectData.path
      }
    }

    return {
      ...parameter,
      computedValue: computedValue ?? parameter.value
    }
  })

  return (
    <Content
      loading={ isLoading }
      none={ isUndefined(data?.data) || data.data.length === 0 }
    >
      <Grid
        autoWidth
        columns={ columns }
        data={ extendedData }
      />
    </Content>
  )
}
