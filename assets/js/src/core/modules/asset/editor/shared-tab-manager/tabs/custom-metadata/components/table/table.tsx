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

import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { createColumnHelper } from '@tanstack/react-table'
import { type CustomMetadata, useGetAssetCustomMetadataByIdQuery } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { Button } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'
import { Grid } from '@Pimcore/components/grid/grid'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { useStyle } from './table.styles'

interface CustomMetadataWithActions extends CustomMetadata {
  actions: React.ReactNode
}

export const CustomMetadataTable = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useContext(AssetContext)
  const { styles } = useStyle()
  const { data, isLoading } = useGetAssetCustomMetadataByIdQuery({ id: id! })

  const removeMetadata = (metadata: CustomMetadata): void => {
    console.log('removeMetadata', metadata)
  }

  // const updateMetadata = (metadata: CustomMetadata): void => {
  //  console.log('updateMetadata', metadata)
  // }

  function onUpdateCellData ({ rowIndex, columnId, value, rowData }): void {
    console.log({ rowIndex, columnId, value, rowData })
    // updateMetadata(value)
  }

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
      header: t('asset.asset-editor-tabs.custom-metadata.columns.name')
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
                removeMetadata(info.row.original)
              } }
              type="link"
            />
          </div>
        )
      },
      size: 60
    })
  ]

  return (
    <div className={ styles.table }>
      <Grid
        columns={ columns }
        data={ data?.items ?? [] }
        isLoading={ isLoading }
        onUpdateCellData={ onUpdateCellData }
      />
    </div>
  )
}
