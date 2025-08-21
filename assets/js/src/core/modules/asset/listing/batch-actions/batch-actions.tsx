/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { DropdownButton } from '@Pimcore/components/dropdown-button/dropdown-button'
import React, { useEffect, useState } from 'react'
import { isUndefined } from 'lodash'
import { Icon } from '@Pimcore/components/icon/icon'
import {
  useAssetGetByIdQuery,
  useAssetBatchDeleteMutation
} from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { useTranslation } from 'react-i18next'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { useZipDownload } from '@Pimcore/modules/asset/actions/zip-download/use-zip-download'
import { useRowSelectionOptional } from '@Pimcore/modules/element/listing/decorators/row-selection/context-layer/provider/use-row-selection-optional'
import { useSettings } from '@Pimcore/modules/element/listing/abstract/settings/use-settings'
import { BatchEditProvider } from './batch-edit-modal/batch-edit-provider'
import { BatchEditModal } from './batch-edit-modal/batch-edit-modal'
import { CsvModal } from '@Pimcore/modules/element/listing/batch-actions/csv-modal/csv-modal'
import { XlsxModal } from '@Pimcore/modules/element/listing/batch-actions/xlsx-modal/xlsx-modal'
import { createJob } from '@Pimcore/modules/execution-engine/jobs/batch-delete/factory'
import { defaultTopics, topics } from '@Pimcore/modules/execution-engine/topics'
import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { useRefreshGrid } from '@Pimcore/modules/element/actions/refresh-grid/use-refresh-grid'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'

export const BatchActions = (): React.JSX.Element => {
  const rowSelection = useRowSelectionOptional()
  const { id, elementType } = useElementContext()
  const { useDataQueryHelper } = useSettings()
  const { getArgs } = useDataQueryHelper()
  const { addJob } = useJobs()
  const { refreshGrid } = useRefreshGrid(elementType)

  const { createZipDownload: createZipFolderDownload } = useZipDownload({ type: 'folder' })
  const { createZipDownload: createZipAssetListDownload } = useZipDownload({ type: 'asset-list' })
  const [batchDelete] = useAssetBatchDeleteMutation()
  const { data } = useAssetGetByIdQuery({ id })

  const [jobTitle, setJobTitle] = useState<string>('Asset')
  const [csvModalOpen, setCsvModalOpen] = useState<boolean>(false)
  const [xlsxModalOpen, setXlsxModalOpen] = useState<boolean>(false)
  const [batchEditModalOpen, setBatchEditModalOpen] = useState<boolean>(false)

  const { t } = useTranslation()

  useEffect(() => {
    if (data !== undefined) {
      setJobTitle(`${data.filename}`)
    }
  }, [data])

  if (rowSelection === undefined) {
    return <></>
  }

  const { selectedRows } = rowSelection

  const numberedSelectedRows = selectedRows !== undefined ? Object.keys(selectedRows).map(Number) : []
  const hasSelectedItems = selectedRows !== undefined ? Object.keys(selectedRows).length > 0 : false

  const handleBatchDelete = (): void => {
    addJob(createJob({
      title: t('batch-delete.job-title'),
      topics: [topics['deletion-finished'], ...defaultTopics],
      action: async () => {
        const response = await batchDelete({
          body: {
            ids: numberedSelectedRows
          }
        })

        console.log('response: ', response)

        if (isUndefined(response.data?.jobRunId)) {
          trackError(new GeneralError('JobRunId is undefined'))
          throw new Error('JobRunId is undefined')
        }

        return response.data?.jobRunId
      },
      refreshGrid,
      assetContextId: id
    }))
  }

  const menu: DropdownMenuProps = {
    items: [
      {
        key: '1',
        label: t('listing.actions.batch-edit'),
        icon: <Icon value={ 'batch-selection' } />,
        onClick: () => {
          setBatchEditModalOpen(true)
        }
      },
      {
        key: '2',
        label: t('listing.actions.export'),
        icon: <Icon value={ 'export' } />,
        children: [
          {
            key: '2.1',
            label: t('listing.actions.csv-export'),
            icon: <Icon value={ 'export' } />,
            onClick: () => {
              setCsvModalOpen(true)
            }
          },
          {
            key: '2.2',
            label: t('listing.actions.xlsx-export'),
            icon: <Icon value={ 'export' } />,
            onClick: () => {
              setXlsxModalOpen(true)
            }
          }
        ]
      },
      {
        key: '3',
        label: t('listing.actions.zip-download'),
        icon: <Icon value={ 'download' } />,
        onClick: () => {
          createZip()
        }
      },
      {
        key: '4',
        label: t('listing.actions.delete'),
        icon: <Icon value={ 'trash' } />,
        onClick: handleBatchDelete
      }
    ]
  }

  return (
    <>
      <Dropdown
        menu={ menu }
      >
        <DropdownButton key={ 'dropdown-button' }>{hasSelectedItems ? t('listing.actions') : t('listing.non-selected.actions')}</DropdownButton>
      </Dropdown>

      <CsvModal
        open={ csvModalOpen }
        setOpen={ setCsvModalOpen }
      />

      <XlsxModal
        open={ xlsxModalOpen }
        setOpen={ setXlsxModalOpen }
      />

      <BatchEditProvider>
        <BatchEditModal
          batchEditModalOpen={ batchEditModalOpen }
          setBatchEditModalOpen={ setBatchEditModalOpen }
        />
      </BatchEditProvider>
    </>
  )

  function createZip (): void {
    if (hasSelectedItems) {
      createZipAssetListDownload({ jobTitle, requestData: { body: { assets: numberedSelectedRows } } })
    } else {
      createZipFolderDownload({
        jobTitle,
        requestData: {
          body: {
            folders: [id],
            filters: {
              includeDescendants: true,
              ...getArgs().body.filters ?? {},
              page: 1,
              pageSize: 999999999990
            }
          }
        }
      })
    }
  }
}
