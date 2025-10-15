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
import React, { useState } from 'react'
import { isUndefined } from 'lodash'
import { Icon } from '@Pimcore/components/icon/icon'
import { useTranslation } from 'react-i18next'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { useRowSelectionOptional } from '@Pimcore/modules/element/listing/decorators/row-selection/context-layer/provider/use-row-selection-optional'
import { BatchEditProvider } from './batch-edit-modal/batch-edit-provider'
import { BatchEditModal } from './batch-edit-modal/batch-edit-modal'
import { CsvModal } from '@Pimcore/modules/element/listing/batch-actions/csv-modal/csv-modal'
import { XlsxModal } from '@Pimcore/modules/element/listing/batch-actions/xlsx-modal/xlsx-modal'
import { createJob } from '@Pimcore/modules/execution-engine/jobs/batch-delete/factory'
import { defaultTopics, topics } from '@Pimcore/modules/execution-engine/topics'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'
import { useDataObjectBatchDeleteMutation } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useRefreshGrid } from '@Pimcore/modules/element/actions/refresh-grid/use-refresh-grid'
import { ClassificationStoreModal } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/components/classification-store-modal/classification-store-modal'
import { ClassificationStoreModalProvider } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider/classifcation-store-modal-provider'

export const BatchActions = (): React.JSX.Element => {
  const rowSelection = useRowSelectionOptional()
  const { id, elementType } = useElementContext()
  const { refreshGrid } = useRefreshGrid(elementType)

  const [batchEditModalOpen, setBatchEditModalOpen] = useState<boolean>(false)
  const [csvModalOpen, setCsvModalOpen] = useState<boolean>(false)
  const [xlsxModalOpen, setXlsxModalOpen] = useState<boolean>(false)

  const [batchDelete] = useDataObjectBatchDeleteMutation()
  const { addJob } = useJobs()

  const { t } = useTranslation()

  if (rowSelection === undefined) {
    return <></>
  }

  const { selectedRows } = rowSelection

  const numberedSelectedRows = selectedRows !== undefined ? Object.keys(selectedRows).map(Number) : []
  const hasSelectedItems = selectedRows !== undefined ? Object.keys(selectedRows).length > 0 : false

  const handleBatchDelete = (): void => {
    addJob(createJob({
      title: t('batch-delete.job-title'),
      topics: [topics['batch-deletion-finished'], ...defaultTopics],
      action: async () => {
        const response = await batchDelete({
          body: {
            ids: numberedSelectedRows
          }
        })

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

      <ClassificationStoreModalProvider>
        <BatchEditProvider>
          <BatchEditModal
            batchEditModalOpen={ batchEditModalOpen }
            setBatchEditModalOpen={ setBatchEditModalOpen }
          />
        </BatchEditProvider>
      </ClassificationStoreModalProvider>
    </>
  )
}
