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
import { useClassFieldCollectionGetUsagesQuery } from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { FieldCollectionUsageData } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { Skeleton } from 'antd'

interface FieldCollectionUsagesGridProps {
  collectionKey: string
}

const columnHelper = createColumnHelper<FieldCollectionUsageData>()

const useColumns = (): Array<ColumnDef<FieldCollectionUsageData, any>> => {
  const { t } = useTranslation()

  return useMemo(() => [
    columnHelper.accessor('class', {
      header: t('field-collection.general-settings.usages.class'),
      size: 200
    }),
    columnHelper.accessor('field', {
      header: t('field-collection.general-settings.usages.field'),
      size: 200
    })
  ], [t])
}

export const FieldCollectionUsagesGrid = ({ collectionKey }: FieldCollectionUsagesGridProps): React.JSX.Element => {
  const { data, isLoading } = useClassFieldCollectionGetUsagesQuery({ key: collectionKey })
  const columns = useColumns()

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
