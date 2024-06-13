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
  type DataProperty,
  useGetPropertiesForElementByTypeAndIdQuery
} from '@Pimcore/modules/asset/properties-api-slice.gen'
import React, { useEffect, useState } from 'react'
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { useGlobalAssetContext } from '@Pimcore/modules/asset/hooks/use-global-asset-context'
import { Button, Checkbox, Result } from 'antd'
import { useStyles } from '@Pimcore/modules/asset/editor/image/tab-manager/tabs/properties/components/table/table.styles'
import { Icon } from '@Pimcore/components/icon/icon'

interface ITableProps {
  propertiesTableTab: string
}

export const Table = ({ propertiesTableTab }: ITableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { context } = useGlobalAssetContext()
  const { styles } = useStyles()

  if (context === undefined) {
    return <Result title="Missing context" />
  }

  const { data, isLoading } = useGetPropertiesForElementByTypeAndIdQuery({
    elementType: 'asset',
    id: context?.config.id
  })

  const [gridDataOwn, setGridDataOwn] = useState<DataProperty[]>([])
  const [gridDataInherited, setGridDataInherited] = useState<DataProperty[]>([])
  useEffect(() => {
    if (data !== undefined && Array.isArray(data.items)) {
      setGridDataOwn(data?.items.filter((item) => {
        return item.inherited === false
      }))

      setGridDataInherited(data?.items.filter((item) => {
        return item.inherited === true
      }))
    }
  }, [data])

  const columnHelper = createColumnHelper<DataProperty>()
  const baseColumns = [
    columnHelper.accessor('type', {
      header: t('asset.asset-editor-tabs.properties.columns.type'),
      meta: {
        type: 'asset-property-icon'
      },
      size: 40
    }),
    columnHelper.accessor('key', {
      header: t('asset.asset-editor-tabs.properties.columns.key')
    }),
    columnHelper.accessor('predefinedName', {
      header: t('asset.asset-editor-tabs.properties.columns.name')
    }),
    columnHelper.accessor('description', {
      header: t('asset.asset-editor-tabs.properties.columns.description')
    }),
    columnHelper.accessor('data', {
      header: t('asset.asset-editor-tabs.properties.columns.data'),
      id: 'properties-table--data-column',
      meta: {
        type: 'asset-property-value',
        editable: true
      }
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
        editable: true
      }
    }),
    columnHelper.accessor('actions', {
      header: t('asset.asset-editor-tabs.properties.columns.actions'),
      cell: (info) => {
        return (
          <div className={ 'properties-table--actions-column' }>
            {
              info.row.original.type === 'document' &&
              info.row.original.data !== null &&
              (
                <Button
                  icon={ <Icon name="group" /> }
                  onClick={ () => {
                    console.log('open document with ID: ' + info.row.original.data.id)
                  } }
                  type="link"
                />
              )
            }

            <Button
              icon={ <Icon name="trash" /> }
              onClick={ () => {
                console.log('delete property with ID: ' + info.row.original.data.id)
              } }
              type="link"
            />
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

  function onUpdateCellData ({ rowIndex, columnId, value }): void {
    console.log('triggered onUpdateCellData!', value)
  }

  return (
    <div className={ styles.table }>
      {isLoading && (
        <p>Counting Lamas ...</p>
      )}

      {!isLoading && (
        <>
          {gridDataOwn.length > 0 && (
            <Grid
              columns={ ownTableColumns }
              data={ gridDataOwn }
              onUpdateCellData={ onUpdateCellData }
            />
          )}

          {propertiesTableTab === 'all' && gridDataInherited.length > 0 && (
            <>
              <p className={ 'headline' }>
                {t('asset.asset-editor-tabs.properties.inherited.properties')}
              </p>
              <Grid
                columns={ allTableColumns }
                data={ gridDataInherited }
                onUpdateCellData={ onUpdateCellData }
              />
            </>
          )}
        </>
      )}
    </div>
  )
}
