/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { type RowSelectionState } from '@tanstack/react-table'
import { Flex } from '@Pimcore/components/flex/flex'
import { Grid } from '@Pimcore/components/grid/grid'
import { Title } from '@Pimcore/components/title/title'
import { type GridProps, type OnUpdateCellDataEvent } from '@Pimcore/types/components/types'
import { type ClassificationStoreConfigurationKeyGroupRelationDetail } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'

interface IKeyRelationsSectionProps {
  /** Name of the sub group these keys are assigned to, omitted when no heading is wanted. */
  heading?: string
  relations: ClassificationStoreConfigurationKeyGroupRelationDetail[]
  columns: GridProps['columns']
  isLoading: boolean
  selectedRows: RowSelectionState
  onSelectedRowsChange: (rows: RowSelectionState) => void
  onUpdateCellData: (event: OnUpdateCellDataEvent) => void
}

export const KeyRelationsSection = ({
  heading,
  relations,
  columns,
  isLoading,
  selectedRows,
  onSelectedRowsChange,
  onUpdateCellData
}: IKeyRelationsSectionProps): React.JSX.Element => {
  return (
    <Flex
      gap="mini"
      vertical
    >
      { heading !== undefined && (
        <Title level={ 5 }>{ heading }</Title>
      ) }
      <Grid
        columns={ columns }
        data={ relations }
        enableMultipleRowSelection
        isLoading={ isLoading }
        onSelectedRowsChange={ onSelectedRowsChange }
        onUpdateCellData={ onUpdateCellData }
        selectedRows={ selectedRows }
        setRowId={ (row: ClassificationStoreConfigurationKeyGroupRelationDetail) => row.keyId !== undefined ? String(row.keyId) : undefined as unknown as string }
      />
    </Flex>
  )
}
