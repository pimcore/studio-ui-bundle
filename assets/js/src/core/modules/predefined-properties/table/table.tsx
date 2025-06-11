/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { useStyles } from './table.styles'
import { type DataProperty } from '@Pimcore/modules/element/draft/hooks/use-properties'
import { uuid } from '@Pimcore/utils/uuid'
import { usePredefinedProperties } from '../hooks/use-predefined-properties'
import { type PredefinedProperty, type UpdatePredefinedProperty } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice-enhanced'
import { IconButton } from '@sdk/components'
import { usePredefinedProperty } from '../hooks/use-predefined-property'
import { type PredefinedPropertyWithId } from '../predefined-properties-provider'
import { ContentType } from '../enums/content-type'
import { ElementType } from '../enums/element-type'

type PredefinedPropertyWithActions = PredefinedProperty & { actions: React.ReactNode }

export const Table = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { predefinedProperties } = usePredefinedProperties()
  const { deletePropertyById, updatePropertyById } = usePredefinedProperty()
  const [enrichedProperties, setEnrichedProperties] = useState<PredefinedPropertyWithId[]>([])
  const [deletingRowId, setDeletingRowId] = useState<string | null>(null)

  useEffect(() => {
    if (predefinedProperties !== undefined && Array.isArray(predefinedProperties)) {
      const sorted = [...predefinedProperties].sort((a, b) => b.creationDate - a.creationDate)
      const enriched = sorted.map(item => ({ ...item, rowId: uuid() }))
      setEnrichedProperties(enriched)
    }
  }, [predefinedProperties])

  const columnHelper = createColumnHelper<PredefinedPropertyWithActions>()

  const handleDelete = async (id: string): Promise<void> => {
    try {
      setDeletingRowId(id)
      await deletePropertyById(id)
    } finally {
      setDeletingRowId(null)
    }
  }

  const tableColumns = [
    columnHelper.accessor('name', {
      header: t('properties.columns.name'),
      meta: { editable: true },
      size: 200
    }),
    columnHelper.accessor('description', {
      header: t('properties.columns.description'),
      meta: { editable: true },
      size: 200
    }),
    columnHelper.accessor('key', {
      header: t('properties.columns.key'),
      meta: { editable: true },
      size: 200
    }),
    columnHelper.accessor('type', {
      header: t('properties.columns.type'),
      meta: { type: 'select', editable: true, config: { options: Object.values(ContentType) } },
      size: 100
    }),
    columnHelper.accessor('data', {
      header: t('properties.columns.data'),
      meta: { type: 'property-value', editable: true, autoWidth: true },
      size: 150
    }),
    columnHelper.accessor('config', {
      header: t('properties.columns.configuration'),
      meta: { editable: true },
      size: 150
    }),
    columnHelper.accessor('ctype', {
      header: t('properties.columns.content-type'),
      meta: { type: 'select', editable: true, config: { options: Object.values(ElementType) } },
      size: 110
    }),
    columnHelper.accessor('inheritable', {
      header: t('properties.columns.inheritable'),
      size: 95,
      meta: { type: 'checkbox', editable: true, config: { align: 'center' } }
    }),
    columnHelper.accessor('actions', {
      header: t('properties.columns.actions'),
      size: 80,
      cell: (info) => {
        const id = info.row.original.id
        return (
          <div className="properties-table--actions-column">
            <IconButton
              icon={ { value: 'translate' } }
              onClick={ () => { console.log('Open Translate View') } }
              type="link"
            />
            <IconButton
              icon={ { value: 'trash' } }
              loading={ deletingRowId === id }
              onClick={ async () => { await handleDelete(id) } }
              type="link"
            />
          </div>
        )
      }
    })
  ]

  const toApiProperty = (row: PredefinedPropertyWithId): UpdatePredefinedProperty => ({
    name: row.name ?? '',
    description: row.description ?? '',
    key: row.key ?? '',
    type: row.type ?? '',
    data: row.data ?? '',
    config: row.config ?? '',
    ctype: row.ctype ?? '',
    inheritable: row.inheritable
  })

  const onUpdateCellData = async ({ columnId, value, rowData }): Promise<void> => {
    const updatedProperty: PredefinedPropertyWithId = { ...rowData, [columnId]: value }
    const rowId: string = rowData.rowId

    setEnrichedProperties(prev =>
      prev.map(row =>
        row.rowId === rowId ? updatedProperty : row
      )
    )

    await updatePropertyById(updatedProperty.id, toApiProperty(updatedProperty))
  }

  return (
    <div className={ styles.table }>
      <Grid
        autoWidth
        columns={ tableColumns }
        data={ enrichedProperties }
        enableSorting
        modifiedCells={ [] }
        onUpdateCellData={ onUpdateCellData }
        resizable
        setRowId={ (row: DataProperty) => row.rowId }
      />
    </div>
  )
}
