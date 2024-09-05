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

import {
  type DataProperty as DataPropertyApi
} from '@Pimcore/modules/asset/properties-api-slice.gen'
import React, { useContext, useEffect, useState } from 'react'
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { useStyles } from './table.styles'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { usePropertyGetCollectionForElementByTypeAndIdQuery } from '@Pimcore/modules/asset/properties-api-slice-enhanced'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { verifyUpdate } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/verify-cell-update'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { type DataProperty } from '@Pimcore/modules/asset/asset-draft-slice'

interface ITableProps {
  propertiesTableTab: string
  showDuplicatePropertyModal: () => void
  showMandatoryModal: () => void
}

type DataPropertyWithActions = DataProperty & {
  actions: React.ReactNode
}

export const Table = ({
  propertiesTableTab,
  showDuplicatePropertyModal,
  showMandatoryModal
}: ITableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { openElement, mapToElementType } = useElementHelper()
  const { styles } = useStyles()
  const { id } = useContext(AssetContext)
  const { asset, properties, setProperties, updateProperty, removeProperty } = useAssetDraft(id!)
  const arePropertiesAvailable = properties !== undefined && properties.length >= 0

  const { data, isLoading } = usePropertyGetCollectionForElementByTypeAndIdQuery({
    elementType: 'asset',
    id: id!
  })

  const [gridDataOwn, setGridDataOwn] = useState<DataProperty[]>([])
  const [gridDataInherited, setGridDataInherited] = useState<DataProperty[]>([])
  const [modifiedCells, setModifiedCells] = useState<Array<{ rowIndex: string, columnId: string }>>([])

  const enrichProperties = (data: DataPropertyApi[]): DataProperty[] => {
    return data.map((item) => {
      return {
        ...item,
        rowId: Math.random()
      }
    })
  }

  useEffect(() => {
    if (data !== undefined && Array.isArray(data.items)) {
      setProperties(enrichProperties(data?.items))
    }
  }, [data])

  useEffect(() => {
    if (arePropertiesAvailable) {
      setGridDataOwn(properties.filter((item) => {
        return !item.inherited
      }))

      setGridDataInherited(properties.filter((item) => {
        return item.inherited
      }))
    }
  }, [properties])

  useEffect(() => {
    if (modifiedCells.length > 0 && asset?.changes.properties === undefined) {
      setModifiedCells([])
    }
  }, [asset])

  const columnHelper = createColumnHelper<DataPropertyWithActions>()
  const createColumns = (tableType: 'own' | 'inherited'): any => [
    columnHelper.accessor('type', {
      header: t('asset.asset-editor-tabs.properties.columns.type'),
      meta: {
        type: 'property-icon'
      },
      size: 40
    }),
    columnHelper.accessor('key', {
      header: t('asset.asset-editor-tabs.properties.columns.key'),
      meta: {
        editable: true
      },
      size: 200
    }),
    columnHelper.accessor('predefinedName', {
      header: t('asset.asset-editor-tabs.properties.columns.name'),
      size: 200
    }),
    columnHelper.accessor('description', {
      header: t('asset.asset-editor-tabs.properties.columns.description'),
      size: 200
    }),
    columnHelper.accessor('data', {
      header: t('asset.asset-editor-tabs.properties.columns.data'),
      meta: {
        type: 'property-value',
        editable: tableType === 'own',
        autoWidth: true
      },
      size: 300
    }),
    columnHelper.accessor('inheritable', {
      header: t('asset.asset-editor-tabs.properties.columns.inheritable'),
      size: 70,
      meta: {
        type: 'checkbox',
        editable: tableType === 'own',
        config: {
          align: 'center'
        }
      }
    }),
    columnHelper.accessor('actions', {
      header: t('asset.asset-editor-tabs.properties.columns.actions'),
      size: 70,
      cell: (info) => {
        return (
          <div className={ 'properties-table--actions-column' }>
            {
              ['document', 'asset', 'object'].includes(info.row.original.type) &&
                info.row.original.data !== null &&
              (
                <IconButton
                  icon={ 'group' }
                  onClick={ async () => {
                    await openElement({
                      type: mapToElementType(info.row.original.type),
                      id: info.row.original.data.id
                    })
                  } }
                  type="link"
                />
              )
            }

            {tableType === 'own' && (
              <IconButton
                icon={ 'trash' }
                onClick={ () => {
                  removeProperty(info.row.original)
                } }
                type="link"
              />
            )}
          </div>
        )
      }
    })
  ]
  const ownTableColumns = [
    ...createColumns('own')
  ]
  const allTableColumns = [
    ...createColumns('inherited')
  ]

  const onUpdateCellData = ({ rowIndex, columnId, value, rowData }): void => {
    const updatedProperties = [...(properties ?? [])]
    const propertyIndex = updatedProperties.findIndex((property) => property.key === rowData.key && !property.inherited)
    const updatedProperty = { ...updatedProperties.at(propertyIndex)!, [columnId]: value }
    updatedProperties[propertyIndex] = updatedProperty
    const hasDuplicate = updatedProperties.filter(property => property.key === updatedProperty.key && !property.inherited).length > 1

    if (verifyUpdate(value, columnId, 'key', hasDuplicate, showMandatoryModal, showDuplicatePropertyModal)) {
      updateProperty(rowData.key as string, updatedProperty)
      console.log('rowdata', rowData)
      setModifiedCells([...modifiedCells, { rowIndex: rowData.rowId, columnId }])
    }
  }

  return (
    <div className={ styles.table }>
      {(
        <>
          {(
            <Grid
              autoWidth
              columns={ ownTableColumns }
              data={ gridDataOwn }
              isLoading={ isLoading }
              modifiedCells={ modifiedCells }
              onUpdateCellData={ onUpdateCellData }
              resizable
              setRowId={ (row: DataProperty) => row.rowId + '' }
            />
          )}

          {propertiesTableTab === 'all' && (
            <>
              <p className={ 'headline' }>
                {t('asset.asset-editor-tabs.properties.inherited.properties')}
              </p>
              <Grid
                autoWidth
                columns={ allTableColumns }
                data={ gridDataInherited }
                resizable
              />
            </>
          )}
        </>
      )}
    </div>
  )
}
