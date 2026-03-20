/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo, useRef, useState } from 'react'
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { type PredefinedMetadata } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/metadata-api-slice-enhanced'
import { type PredefinedAssetMetadataRow, usePredefinedAssetMetadata } from '../hooks/use-predefined-asset-metadata'
import { ErrorKeyTypes } from '@Pimcore/modules/app/error-handler'
import { type ModifiedCells } from '@sdk/modules/element'
import { ActionsCell } from './actions-cell'
import { useInjection } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DynamicTypeMetaDataRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/meta-data/dynamic-type-metadata-registry'
import { type DynamicTypeAssetRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/asset/dynamic-type-asset-registry'
import { type SelectOptionType } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/utils/select-options'
import { useModal } from '@Pimcore/components/modal/useModal'
import { Button } from 'antd'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'

interface DuplicateInfo {
  name: string
  language: string
}

type PredefinedAssetMetadataWithActions = PredefinedMetadata & { actions: React.ReactNode }

interface TableProps {
  predefinedAssetMetadataRows: PredefinedAssetMetadataRow[]
  setPredefinedAssetMetadataRows: React.Dispatch<React.SetStateAction<PredefinedAssetMetadataRow[]>>
}

export const Table = ({ predefinedAssetMetadataRows, setPredefinedAssetMetadataRows }: TableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { updateMetadataById } = usePredefinedAssetMetadata()
  const [modifiedCells, setModifiedCells] = useState<ModifiedCells>([])
  const { showModal: showDuplicateModal, closeModal: closeDuplicateModal, renderModal: DuplicateModal } = useModal({ type: 'error' })
  const duplicateInfoRef = useRef<DuplicateInfo>({ name: '', language: '' })

  const metadataTypeRegistry = useInjection<DynamicTypeMetaDataRegistry>(serviceIds['DynamicTypes/MetadataRegistry'])
  const assetTypeRegistry = useInjection<DynamicTypeAssetRegistry>(serviceIds['DynamicTypes/AssetRegistry'])

  const typeSelectOptions = useMemo<SelectOptionType[]>(() => {
    return metadataTypeRegistry.getDynamicTypes().map(type => ({
      value: type.id,
      label: t('data-type.' + type.id.split('.')[1])
    }))
  }, [t])

  const targetSubTypeOptions = useMemo<SelectOptionType[]>(() => {
    return assetTypeRegistry.getDynamicTypes().map(type => ({
      value: type.id,
      label: type.id
    }))
  }, [])

  // Normalize rows: ensure type has 'metadata.' prefix for the grid renderers
  const formattedRows = useMemo(() => {
    return predefinedAssetMetadataRows.map(row => ({
      ...row,
      type: row.type.includes('metadata.') ? row.type : `metadata.${row.type}`
    }))
  }, [predefinedAssetMetadataRows])

  const columnHelper = createColumnHelper<PredefinedAssetMetadataWithActions>()

  const tableColumns = [
    columnHelper.accessor('type', {
      header: t('predefined-asset-metadata.columns.icon'),
      meta: {
        type: 'asset-custom-metadata-icon',
        editable: false
      },
      size: 40,
      enableSorting: false
    }),
    columnHelper.accessor('name', {
      header: t('predefined-asset-metadata.columns.name'),
      meta: { editable: true },
      size: 200
    }),
    columnHelper.accessor('group', {
      header: t('predefined-asset-metadata.columns.group'),
      meta: { editable: true },
      size: 150
    }),
    columnHelper.accessor('description', {
      header: t('predefined-asset-metadata.columns.description'),
      meta: { editable: true },
      size: 200
    }),
    columnHelper.accessor('type', {
      id: 'typeSelect',
      header: t('predefined-asset-metadata.columns.type'),
      meta: {
        type: 'select',
        editable: true,
        config: { options: typeSelectOptions }
      },
      size: 130
    }),
    columnHelper.accessor('data', {
      header: t('predefined-asset-metadata.columns.value'),
      meta: {
        type: 'asset-custom-metadata-value',
        editable: true,
        autoWidth: true
      },
      size: 300
    }),
    columnHelper.accessor('config', {
      header: t('predefined-asset-metadata.columns.config'),
      meta: { editable: true },
      size: 150
    }),
    columnHelper.accessor('language', {
      header: t('predefined-asset-metadata.columns.language'),
      meta: {
        type: 'language-select',
        editable: true,
        config: { allowClear: true }
      },
      size: 100
    }),
    columnHelper.accessor('targetSubType', {
      header: t('predefined-asset-metadata.columns.target-type'),
      meta: {
        type: 'select',
        editable: true,
        config: { options: targetSubTypeOptions }
      },
      size: 130
    }),
    columnHelper.accessor('actions', {
      header: t('predefined-asset-metadata.columns.actions'),
      size: 80,
      enableSorting: false,
      cell: (info) => (
        <ActionsCell
          info={ info }
          setPredefinedAssetMetadataRows={ setPredefinedAssetMetadataRows }
        />
      )
    })
  ]

  const onUpdateCellData = async ({
    columnId,
    value,
    rowData
  }: {
    columnId: string
    value: unknown
    rowData: PredefinedAssetMetadataRow
  }): Promise<void> => {
    const rowId = rowData.rowId
    // 'typeSelect' is the id for the editable type column (accessor 'type' used twice)
    const fieldKey = columnId === 'typeSelect' ? 'type' : columnId
    // When the type changes, clear data as the value may be incompatible with the new type
    const extraFields = fieldKey === 'type' ? { data: null } : {}
    const updatedRow: PredefinedAssetMetadataRow = { ...rowData, ...extraFields, [fieldKey]: value }

    // Validate name + language uniqueness (strict equality)
    if (fieldKey === 'name' || fieldKey === 'language') {
      const hasDuplicate = predefinedAssetMetadataRows.some(row =>
        row.rowId !== rowId &&
        row.name === updatedRow.name &&
        (row.language ?? null) === (updatedRow.language ?? null)
      )

      if (hasDuplicate) {
        duplicateInfoRef.current = {
          name: updatedRow.name,
          language: updatedRow.language ?? ''
        }
        showDuplicateModal()
        return
      }
    }

    setPredefinedAssetMetadataRows(prev =>
      prev.map(row =>
        row.rowId === rowId ? updatedRow : row
      )
    )

    setModifiedCells([{ columnId, rowIndex: rowId }])

    const { success, errorKey } = await updateMetadataById(updatedRow.id, updatedRow)

    if (success) {
      setModifiedCells([])
    } else {
      if (errorKey === ErrorKeyTypes.INVALID_ARGUMENT) {
        duplicateInfoRef.current = {
          name: updatedRow.name,
          language: updatedRow.language ?? ''
        }
        showDuplicateModal()
      }
      setPredefinedAssetMetadataRows(prev =>
        prev.map(row =>
          row.rowId === rowId ? rowData : row
        )
      )
    }
  }

  return (
    <div>
      <Grid
        autoWidth
        columns={ tableColumns }
        data={ formattedRows }
        enableSorting
        modifiedCells={ modifiedCells }
        onUpdateCellData={ onUpdateCellData }
        resizable
        setRowId={ (row: PredefinedAssetMetadataRow) => row.rowId }
      />

      <DuplicateModal
        footer={ <ModalFooter>
          <Button
            onClick={ closeDuplicateModal }
            type='primary'
          >{t('button.ok')}</Button>
        </ModalFooter> }
        title={ t('predefined-asset-metadata.duplicate-entry.title') }
      >
        <p>{t('predefined-asset-metadata.duplicate-entry.error')}</p>
        <div style={ { marginTop: 8 } }>
          <div><strong>{t('predefined-asset-metadata.columns.name')}:</strong> {duplicateInfoRef.current.name}</div>
          <div><strong>{t('predefined-asset-metadata.columns.language')}:</strong> {duplicateInfoRef.current.language !== '' ? duplicateInfoRef.current.language : '—'}</div>
        </div>
      </DuplicateModal>
    </div>
  )
}
