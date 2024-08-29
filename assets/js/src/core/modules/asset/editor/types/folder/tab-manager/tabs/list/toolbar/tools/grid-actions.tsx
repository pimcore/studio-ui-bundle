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
import { useListSelectedRows } from '../../hooks/use-list'
import { type AssetCreateZipApiResponse, useAssetCreateZipMutation, useAssetGetByIdQuery } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'
import { defaultTopics, topics } from '@Pimcore/modules/execution-engine/topics'
import { createJob as createDownloadJob } from '@Pimcore/modules/execution-engine/jobs/download/factory'
import { useAsset } from '@Pimcore/modules/asset/hooks/use-asset'
import { CsvModal } from './csv-modal/csv-modal'
import { useTranslation } from 'react-i18next'

export const GridActions = (): React.JSX.Element => {
  const { selectedRows } = useListSelectedRows()
  const numberedSelectedRows = Object.keys(selectedRows).map(Number)
  const hasSelectedItems = Object.keys(selectedRows).length > 0
  const [fetchCreateZip] = useAssetCreateZipMutation()
  const { id } = useAsset()
  const { data } = useAssetGetByIdQuery({ id: id! })
  const [jobTitle, setJobTitle] = useState<string>('Asset')
  const { addJob } = useJobs()
  const [csvModalOpen, setCsvModalOpen] = useState<boolean>(false)
  const { t } = useTranslation()

  useEffect(() => {
    if (data !== undefined) {
      setJobTitle(`${data.filename}`)
    }
  }, [data])

  const menu: MenuProps = {
    items: [
      {
        key: '1',
        label: t('listing.actions.batch-edit'),
        icon: <Icon name={ 'grid' } />,
        onClick: () => {
          console.log('Action 1')
        }
      },
      {
        key: '2',
        label: t('listing.actions.export'),
        icon: <Icon name={ 'export' } />,
        children: [
          {
            key: '2.1',
            label: t('listing.actions.csv-export'),
            icon: <Icon name={ 'export' } />,
            onClick: () => { setCsvModalOpen(true) }
          }
        ]
      },
      {
        key: '3',
        label: t('listing.actions.zip-download'),
        icon: <Icon name={ 'download-02' } />,
        onClick: () => { createZip() }
      }
    ]
  }

  return (
    <>
      <Dropdown
        disabled={ !hasSelectedItems }
        menu={ menu }
      >
        <DropdownButton key={ 'dropdown-button' }>{ t('listing.actions') }</DropdownButton>
      </Dropdown>

      <CsvModal
        open={ csvModalOpen }
        setOpen={ setCsvModalOpen }
      />
    </>
  )

  function createZip (): void {
    addJob(createDownloadJob({
      // @todo add api domain
      title: t('jobs.zip-job.title', { title: jobTitle }),
      topics: [topics['zip-download-ready'], ...defaultTopics],
      downloadUrl: '/studio/api/assets/download/zip/{jobRunId}',
      action: async () => {
        const promise = fetchCreateZip({ body: { items: numberedSelectedRows } })

        promise.catch(() => {
          console.error('Failed to create zip')
        })

        const response = (await promise) as any
        const data = response.data as AssetCreateZipApiResponse
        return data.jobRunId
      }
    }))
  }
}
