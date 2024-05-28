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
  const columns = [
    columnHelper.accessor('type', {
      header: t('asset.asset-editor-tabs.properties.columns.type')
    }),
    columnHelper.accessor('key', {
      header: t('asset.asset-editor-tabs.properties.columns.key')
    }),
    columnHelper.accessor('description', {
      header: t('asset.asset-editor-tabs.properties.columns.description')
    }),
    columnHelper.accessor('data', {
      header: t('asset.asset-editor-tabs.properties.columns.data'),
      cell: (info) => {
        return (
          <>
            <p>{info.row.original.data}</p>
            <Button
              icon={ <Icon name={ 'copy-07' } /> }
              onClick={ () => {
                navigator.clipboard.writeText(info.row.original.data as string)
                  .catch((e) => {
                    console.error('Failed to copy data to clipboard', e)
                  })
              } }
              type={ 'link' }
            />
          </>
        )
      },
      id: 'properties-table--data-column'
    }),
    columnHelper.accessor('inheritable', {
      header: t('asset.asset-editor-tabs.properties.columns.inheritable'),
      cell: (info) => {
        return <Checkbox checked={ info.row.original.inheritable } />
      },
      size: 70,
      id: 'properties-table--inheritable-column'
    }),
    columnHelper.accessor('actions', {
      header: t('asset.asset-editor-tabs.properties.columns.inheritable'),
      cell: (info) => {
        return (
          <div>
            <button>edit</button>
            <button>delete</button>
          </div>
        )
      },
      id: 'properties-table--actions-column'
    })
  ]

  return (
    <div className={ styles.table }>
      {isLoading && (
        <p>Counting Lamas ...</p>
      )}

      {!isLoading && (
        <>
          <Grid
            columns={ columns }
            data={ gridDataOwn }
          />

          {propertiesTableTab === 'all' && (
            <>
              <p className={ 'headline' }>
                {t('asset.asset-editor-tabs.properties.inherited.properties')}
              </p>
              <Grid
                columns={ columns }
                data={ gridDataInherited }
              />
            </>
          )}
        </>
      )}
    </div>
  )
}
