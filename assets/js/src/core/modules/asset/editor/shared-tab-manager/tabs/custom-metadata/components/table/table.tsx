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

import React, { useContext, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { createColumnHelper } from '@tanstack/react-table'
import { type CustomMetadata as CustomMetadataApi, useAssetCustomMetadataGetByIdQuery } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { Grid } from '@Pimcore/components/grid/grid'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { verifyUpdate } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/verify-cell-update'
import { type CustomMetadata } from '@Pimcore/modules/asset/draft/hooks/use-custom-metadata'
import { Box } from '@Pimcore/components/box/box'
import { Flex } from '@Pimcore/components/flex/flex'
import { uuid } from '@Pimcore/utils/uuid'

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
  const { asset, customMetadata, setCustomMetadata, removeCustomMetadata, updateAllCustomMetadata, setModifiedCells } = useAssetDraft(id)
  const { data, isLoading } = useAssetCustomMetadataGetByIdQuery({ id })
  const modifiedCellsType = 'customMetadata'
  const modifiedCells = asset?.modifiedCells[modifiedCellsType] ?? []

  const enrichCustomMetadata = (data: CustomMetadataApi[]): CustomMetadata[] => {
    return data.map((item) => {
      return {
        ...item,
        rowId: uuid()
      }
    })
  }

  // @todo check if the type could be delivered that way directly via the api
  const formattedCustomMetadata = useMemo(() => customMetadata?.map((item) => {
    if (item.type.includes('metadata.')) {
      return item
    }

    return {
      ...item,
      type: `metadata.${item.type}`
    }
  }), [customMetadata])

  useEffect(() => {
    if (data !== undefined && asset?.changes.customMetadata === undefined && Array.isArray(data.items)) {
      setCustomMetadata(enrichCustomMetadata(data.items))
    }
  }, [data])

  useEffect(() => {
    if (modifiedCells.length > 0 && asset?.changes.customMetadata === undefined) {
      setModifiedCells(modifiedCellsType, [])
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
      },
      size: 200
    }),
    columnHelper.accessor('language', {
      header: t('asset.asset-editor-tabs.custom-metadata.columns.language'),
      meta: {
        type: 'language-select',
        editable: true
      },
      size: 100
    }),
    columnHelper.accessor('data', {
      header: t('asset.asset-editor-tabs.custom-metadata.columns.value'),
      meta: {
        type: 'asset-custom-metadata-value',
        editable: true,
        autoWidth: true
      },
      size: 400
    }),
    columnHelper.accessor('actions', {
      header: t('asset.asset-editor-tabs.custom-metadata.columns.actions'),
      cell: (info) => {
        return (
          <Box padding={ 'mini' }>
            <Flex
              align='center'
              className='w-full h-full'
              justify='center'
            >
              <IconButton
                icon={ { value: 'trash' } }
                onClick={ () => {
                  removeCustomMetadata(info.row.original)
                } }
                type="link"
              />
            </Flex>
          </Box>
        )
      },
      size: 60
    })
  ]

  const onUpdateCellData = ({ rowIndex, columnId, value, rowData }): void => {
    const updatedCustomMetadataEntries = [...(customMetadata ?? [])]
    const customMetadataIndex = updatedCustomMetadataEntries.findIndex(cm => cm.name === rowData.name && cm.language === rowData.language)
    const updatedCustomMetadata = { ...updatedCustomMetadataEntries.at(customMetadataIndex)!, [columnId]: value }
    updatedCustomMetadataEntries[customMetadataIndex] = updatedCustomMetadata
    const hasDuplicate = updatedCustomMetadataEntries.filter(cm => cm.name === updatedCustomMetadata.name && cm.language === updatedCustomMetadata.language).length > 1

    if (verifyUpdate(value, columnId, 'name', hasDuplicate, showMandatoryModal, showDuplicateEntryModal)) {
      const customMetaDataUpdate = updatedCustomMetadataEntries.map(item => ({
        ...item,
        type: item.type.split('.')[1] ?? item.type
      }))

      updateAllCustomMetadata(customMetaDataUpdate)
      setModifiedCells(modifiedCellsType, [...modifiedCells, { rowIndex: rowData.rowId, columnId }])
    }
  }

  return (
    <Grid
      autoWidth
      columns={ columns }
      data={ formattedCustomMetadata ?? [] }
      isLoading={ isLoading }
      modifiedCells={ modifiedCells }
      onUpdateCellData={ onUpdateCellData }
      setRowId={ (row: CustomMetadata) => row.rowId }
    />
  )
}
