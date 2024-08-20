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

import { DropdownButton } from '@Pimcore/components/dropdown-button/dropdown-button'
import { Dropdown, type MenuProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { useListColumns, useListSelectedRows } from '../../hooks/use-list'
import { type AssetCreateCsvApiResponse, type AssetCreateZipApiResponse, useAssetCreateCsvMutation, useAssetCreateZipMutation, useAssetGetByIdQuery } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'
import { topics } from '@Pimcore/modules/execution-engine/topics'
import { createJob as createDownloadJob } from '@Pimcore/modules/execution-engine/jobs/download/factory'
import { useAsset } from '@Pimcore/modules/asset/hooks/use-asset'

export const GridActions = (): React.JSX.Element => {
  const { selectedRows } = useListSelectedRows()
  const numberedSelectedRows = Object.keys(selectedRows).map(Number)
  const hasSelectedItems = Object.keys(selectedRows).length > 0
  const { columns } = useListColumns()
  const [fetchCreateZip] = useAssetCreateZipMutation()
  const [fetchCreateCsv] = useAssetCreateCsvMutation()
  const { id } = useAsset()
  const { data } = useAssetGetByIdQuery({ id: id! })
  const { addJob } = useJobs()
  const [jobTitle, setJobTitle] = useState<string>('Asset')

  useEffect(() => {
    if (data !== undefined) {
      setJobTitle(`${data.filename}`)
    }
  }, [data])

  const menu: MenuProps = {
    items: [
      {
        key: '1',
        label: 'Batch edit',
        icon: <Icon name={ 'grid' } />,
        onClick: () => {
          console.log('Action 1')
        }
      },
      {
        key: '2',
        label: 'Export',
        icon: <Icon name={ 'export' } />,
        children: [
          {
            key: '2.1',
            label: 'CSV-Export',
            icon: <Icon name={ 'export' } />,
            onClick: () => { createCSV() }
          }
        ]
      },
      {
        key: '3',
        label: 'ZIP download',
        icon: <Icon name={ 'download-02' } />,
        onClick: () => { createZip() }
      }
    ]
  }

  return (
    <Dropdown
      disabled={ !hasSelectedItems }
      menu={ menu }
    >
      <DropdownButton key={ 'dropdown-button' }>Apply to selection</DropdownButton>
    </Dropdown>
  )

  function createZip (): void {
    fetchCreateZip({ body: { items: numberedSelectedRows } }).then((promise: any) => {
      const data = promise.data as AssetCreateZipApiResponse

      addJob(createDownloadJob({
        // @todo add api domain
        downloadUrl: `/studio/api/assets/download/zip/${data.jobRunId}`,
        id: data.jobRunId,
        title: `Zip of ${jobTitle}`,
        topics: [topics['zip-download-ready'], topics['handler-progress']]
      }))
    }).catch(() => {
      console.error('Failed to create zip')
    })
  }

  function createCSV (): void {
    fetchCreateCsv({
      body: {
        assets: numberedSelectedRows,
        gridConfig: columns.map((column) => {
          return {
            key: column.key,
            type: column.type,
            config: column.config
          }
        }),
        settings: {
          delimiter: ',',
          header: 'title'
        }
      }
    }).then((response: any) => {
      const data = response.data as AssetCreateCsvApiResponse

      addJob(createDownloadJob({
        // @todo add api domain
        downloadUrl: `/studio/api/assets/download/csv/${data.jobRunId}`,
        id: data.jobRunId,
        title: `CSV of ${jobTitle}`,
        topics: [topics['csv-download-ready'], topics['handler-progress']]
      }))
    }).catch(() => {
      console.error('Failed to create CSV')
    })
  }
}
