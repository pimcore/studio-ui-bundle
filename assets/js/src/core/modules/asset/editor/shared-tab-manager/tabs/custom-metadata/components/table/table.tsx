/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { createColumnHelper } from '@tanstack/react-table'
import { type CustomMetadata, useAssetCustomMetadataGetByIdQuery } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { Button } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'
import { Grid } from '@Pimcore/components/grid/grid'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { useStyle } from './table.styles'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { verifyUpdate } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/verifyCellUpdate'

interface CustomMetadataWithActions extends CustomMetadata {
  actions: React.ReactNode
}

interface CustomMetadataTableProps {
  showDuplicateEntryModal: () => void
  showMandatoryModal: () => void
}

export const CustomMetadataTable = ({ showDuplicateEntryModal, showMandatoryModal }: CustomMetadataTableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useContext(AssetContext)
  const { styles } = useStyle()
  const { asset, customMetadata, setCustomMetadata, removeCustomMetadata, updateAllCustomMetadata } = useAssetDraft(id!)
  const { data, isLoading } = useAssetCustomMetadataGetByIdQuery({ id: id! })
  const [modifiedCells, setModifiedCells] = useState<Array<{ rowIndex: number, columnId: string }>>([])

  useEffect(() => {
    if (data !== undefined && Array.isArray(data.items)) {
      setCustomMetadata(data?.items)
    }
  }, [data])

  useEffect(() => {
    if (modifiedCells.length > 0 && asset?.changes.customMetadata === undefined) {
      setModifiedCells([])
    }
  }, [asset])

  const columnHelper = createColumnHelper<CustomMetadataWithActions>()
  const columns = [
    columnHelper.accessor('type', {
      header: t('asset.asset-editor-tabs.custom-metadata.columns.type'),
      meta: {
        type: 'asset-custom-metadata-icon'
      },
      size: 40
    }),
    columnHelper.accessor('name', {
      header: t('asset.asset-editor-tabs.custom-metadata.columns.name'),
      meta: {
        editable: true
      }
    }),
    columnHelper.accessor('language', {
      header: t('asset.asset-editor-tabs.custom-metadata.columns.language'),
      id: 'custom-metadata-table--language-column',
      meta: {
        type: 'language-select',
        editable: true
      }
    }),
    columnHelper.accessor('data', {
      header: t('asset.asset-editor-tabs.custom-metadata.columns.value'),
      id: 'custom-metadata-table--data-column',
      meta: {
        type: 'type-dependent-content',
        editable: true
      },
      size: 400
    }),
    columnHelper.accessor('actions', {
      header: t('asset.asset-editor-tabs.custom-metadata.columns.actions'),
      cell: (info) => {
        return (
          <div className={ 'custom-metadata-table--actions-column' }>
            <Button
              icon={ <Icon name="trash" /> }
              onClick={ () => {
                removeCustomMetadata(info.row.original)
              } }
              type="link"
            />
          </div>
        )
      },
      size: 60
    })
  ]

  function onUpdateCellData ({ rowIndex, columnId, value, rowData }): void {
    const updatedCustomMetadata = [...(customMetadata ?? [])]
    const updatedCustomMetadataPrimaryKeys = updatedCustomMetadata.map(cm => cm.name)
    const customMetadataToUpdate = { ...updatedCustomMetadata.find(cm => cm.name === rowData.name)! }
    const customMetadataIndex = updatedCustomMetadata.findIndex(cm => cm.name === rowData.name)

    updatedCustomMetadata[customMetadataIndex] = {
      ...customMetadataToUpdate,
      [getRealColumnName(columnId as string)]: value
    }

    verifyUpdate(value, updatedCustomMetadataPrimaryKeys, columnId, 'name', showMandatoryModal, showDuplicateEntryModal) && updateAllCustomMetadata(updatedCustomMetadata)

    function getRealColumnName (columnId: string): string {
      switch (columnId) {
        case 'custom-metadata-table--language-column':
          return 'language'
        case 'custom-metadata-table--data-column':
          return 'data'
        default:
          return columnId
      }
    }

    setModifiedCells([...modifiedCells, { rowIndex, columnId }])
  }

  return (
    <div className={ styles.table }>
      <Grid
        columns={ columns }
        data={ customMetadata! }
        isLoading={ isLoading }
        modifiedCells={ modifiedCells }
        onUpdateCellData={ onUpdateCellData }
      />
    </div>
  )
}
