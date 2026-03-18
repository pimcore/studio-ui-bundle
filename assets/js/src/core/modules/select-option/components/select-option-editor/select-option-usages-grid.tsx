/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Grid } from '@Pimcore/components/grid/grid'
import { useClassSelectOptionGetUsagesQuery } from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import type { SelectOptionUsageItem } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { createColumnHelper } from '@tanstack/react-table'
import { Skeleton } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface SelectOptionUsagesGridProps {
  selectOptionId: string
}

export const SelectOptionUsagesGrid = ({ selectOptionId }: SelectOptionUsagesGridProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { data, isLoading } = useClassSelectOptionGetUsagesQuery({ id: selectOptionId })

  const columnHelper = createColumnHelper<SelectOptionUsageItem>()
  const columns = [
    columnHelper.accessor('class', {
      header: t('select-option.general-settings.usages.class'),
      size: 200
    }),
    columnHelper.accessor('field', {
      header: t('select-option.general-settings.usages.field'),
      size: 200
    })
  ]

  if (isLoading) {
    return <Skeleton active />
  }

  return (
    <Grid
      columns={ columns }
      data={ data?.items ?? [] }
      enableMultipleRowSelection={ false }
      resizable={ false }
    />
  )
}
