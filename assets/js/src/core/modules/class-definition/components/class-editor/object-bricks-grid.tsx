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
import { useClassDefinitionGetBricksUsagesQuery } from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { ClassDefinitionObjectBrickData } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { Skeleton } from 'antd'

interface ObjectBricksGridProps {
  classId: string
}

const columnHelper = createColumnHelper<ClassDefinitionObjectBrickData>()

const useColumns = (): Array<ColumnDef<ClassDefinitionObjectBrickData, any>> => {
  const { t } = useTranslation()

  return useMemo(() => [
    columnHelper.accessor('key', {
      header: t('object-brick-key'),
      size: 200
    }),
    columnHelper.accessor('fieldName', {
      header: t('field-name'),
      size: 200
    })
  ], [t])
}

export const ObjectBricksGrid = ({ classId }: ObjectBricksGridProps): React.JSX.Element => {
  const { data, isLoading } = useClassDefinitionGetBricksUsagesQuery({ id: classId })
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
