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
import { PredefinedProperty } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice-enhanced'
import { IconButton } from '@sdk/components'
import { verifyUpdate } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/verify-cell-update'
import { usePredefinedProperty } from '../hooks/use-predefined-property'
import { Row } from 'antd'
import { PredefinedPropertyWithId } from "../predefined-properties-provider"
import { isUndefined } from 'lodash'


type PredefinedPropertyWithActions = PredefinedProperty & { actions: React.ReactNode }

interface ITableProps {
  showDuplicatePropertyModal: () => void
  showMandatoryModal: () => void
}

export const Table = ({ showDuplicatePropertyModal, showMandatoryModal }: ITableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { predefinedProperties, isLoading } = usePredefinedProperties()
  const { deletePropertyById, deleteLoading } = usePredefinedProperty()
const [enrichedProperties, setEnrichedProperties] = useState<PredefinedPropertyWithId[]>([])

  useEffect(() => {
    if (predefinedProperties && Array.isArray(predefinedProperties)) {
      const sorted = [...predefinedProperties].sort((a, b) => b.creationDate - a.creationDate);
      const enriched = sorted.map(item => ({ ...item, rowId: uuid() }))
      setEnrichedProperties(enriched)
    }
  }, [predefinedProperties])

  
  const columnHelper = createColumnHelper<PredefinedPropertyWithActions>()

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
      meta: { editable: true },
      size: 100
    }),
    columnHelper.accessor('data', {
      header: t('properties.columns.data'),
      meta: { type: 'property-value', editable: true, autoWidth: true },
      size: 250
    }),
    columnHelper.accessor('config', {
      header: t('properties.columns.configuration'),
      meta: { editable: true },
      size: 200
    }),
    columnHelper.accessor('ctype', {
      header: t('properties.columns.content-type'),
      meta: { editable: true },
      size: 100
    }),
    columnHelper.accessor('inheritable', {
      header: t('properties.columns.inheritable'),
      size: 74,
      meta: { type: 'checkbox', editable: true, config: { align: 'center' } }
    }),
    columnHelper.accessor('actions', {
      header: t('properties.columns.actions'),
      size: 70,
      cell: (info) => {
      const id = info.row.original.id
      return  (
        <div className="properties-table--actions-column">
          <IconButton icon={{ value: 'translate' }} onClick={() => console.log('Open Translate View')} type="link" />
          <IconButton icon={{ value: 'trash' }} onClick={() => deletePropertyById(id)} type="link" />
        </div>
      )
  }
    })
  ]

  const onUpdateCellData = ({ columnId, value, rowData }): void => {
    const updatedProperty = { ...rowData, [columnId]: value }
    const hasDuplicate = enrichedProperties.filter(property => property.key === updatedProperty.key).length > 1

    if (verifyUpdate(value, columnId, 'key', hasDuplicate, showMandatoryModal, showDuplicatePropertyModal)) {
console.log("update");
    }
  }

  return (
    <div className={styles.table}>
      <Grid
        autoWidth
        columns={tableColumns}
        data={enrichedProperties}
        isLoading={isLoading}
        modifiedCells={[]}
        onUpdateCellData={onUpdateCellData}
        resizable
        enableSorting = {true}
        setRowId={(row: DataProperty) => row.rowId}
      />
    </div>
  )
}
