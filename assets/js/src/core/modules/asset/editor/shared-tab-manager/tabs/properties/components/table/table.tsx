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
  type DataProperty
} from '@Pimcore/modules/asset/properties-api-slice.gen'
import React, { useContext, useEffect, useState } from 'react'
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { Button, Checkbox } from 'antd'
import { useStyles } from './table.styles'
import { Icon } from '@Pimcore/components/icon/icon'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { usePropertyGetCollectionForElementByTypeAndIdQuery } from '@Pimcore/modules/asset/properties-api-slice-enhanced'

interface ITableProps {
  propertiesTableTab: string
}

type DataPropertyWithActions = DataProperty & {
  actions: React.ReactNode
}

export const Table = ({ propertiesTableTab }: ITableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { id } = useContext(AssetContext)
  const { properties, setProperties, updateProperty, removeProperty } = useAssetDraft(id!)
  const arePropertiesAvailable = properties !== undefined && properties.length >= 0

  const { data, isLoading } = usePropertyGetCollectionForElementByTypeAndIdQuery({
    elementType: 'asset',
    id: id!
  })

  const [gridDataOwn, setGridDataOwn] = useState<DataProperty[]>([])
  const [gridDataInherited, setGridDataInherited] = useState<DataProperty[]>([])

  useEffect(() => {
    if (data !== undefined && Array.isArray(data.items)) {
      setProperties(data?.items)
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

  const columnHelper = createColumnHelper<DataPropertyWithActions>()
  const baseColumns = [
    columnHelper.accessor('type', {
      header: t('asset.asset-editor-tabs.properties.columns.type'),
      meta: {
        type: 'asset-property-icon'
      },
      size: 40
    }),
    columnHelper.accessor('key', {
      header: t('asset.asset-editor-tabs.properties.columns.key'),
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
      id: 'properties-table--data-column',
      meta: {
        type: 'type-dependent-content',
        editable: propertiesTableTab === 'own',
        autoWidth: true
      },
      size: 300
    }),
    columnHelper.accessor('inheritable', {
      header: t('asset.asset-editor-tabs.properties.columns.inheritable'),
      cell: (info) => {
        return (
          <div className={ 'properties-table--inheritable-column' }>
            <Checkbox defaultChecked={ info.row.original.inheritable } />
          </div>
        )
      },
      size: 70,
      meta: {
        editable: propertiesTableTab === 'own'
      }
    }),
    columnHelper.accessor('actions', {
      header: t('asset.asset-editor-tabs.properties.columns.actions'),
      cell: (info) => {
        return (
          <div className={ 'properties-table--actions-column' }>
            {
              ['document', 'asset', 'object'].includes(info.row.original.type) &&
                info.row.original.data !== null &&
              (
                <Button
                  icon={ <Icon name="group" /> }
                  onClick={ () => {
                    console.log(`open ${info.row.original.type} with ID: ` + info.row.original.data.id)
                  } }
                  type="link"
                />
              )
            }

            {propertiesTableTab === 'own' && (
              <Button
                icon={ <Icon name="trash" /> }
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
    ...baseColumns
  ]
  const allTableColumns = [
    ...baseColumns
  ]

  function onUpdateCellData ({ rowIndex, columnId, value, rowData }): void {
    if (columnId === 'properties-table--data-column') {
      const updatedProperties = [...(properties ?? [])]
      const propertyToUpdate = { ...updatedProperties.find((property) => property.key === rowData.key)! }

      propertyToUpdate.data = value

      updateProperty(propertyToUpdate)
    }
  }

  function getModifiedCells (): Array<{ rowIndex: number, columnId: string }> {
    const modifiedCells: Array<{ rowIndex: number, columnId: string }> = []

    data?.items!.forEach((item, index) => {
      gridDataOwn.forEach((property, propertyIndex) => {
        if (property.key === item.key && property.data !== item.data) {
          modifiedCells.push({
            rowIndex: propertyIndex,
            columnId: 'properties-table--data-column'
          })
        }
      })
    })

    return modifiedCells
  }

  return (
    <div className={ styles.table }>
      {(
        <>
          { (
            <Grid
              columns={ ownTableColumns }
              data={ gridDataOwn }
              isLoading={ isLoading }
              modifiedCells={ getModifiedCells() }
              onUpdateCellData={ onUpdateCellData }
              autoWidth
              resizable
            />
          )}

          {propertiesTableTab === 'all' && (
            <>
              <p className={ 'headline' }>
                {t('asset.asset-editor-tabs.properties.inherited.properties')}
              </p>
              <Grid
                columns={ allTableColumns }
                data={ gridDataInherited }
                onUpdateCellData={ onUpdateCellData }
                autoWidth
                resizable
              />
            </>
          )}
        </>
      )}
    </div>
  )
}
