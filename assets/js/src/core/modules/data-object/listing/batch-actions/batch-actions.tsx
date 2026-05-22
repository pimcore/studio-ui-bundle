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
import { Icon } from '@Pimcore/components/icon/icon'
import { useTranslation } from 'react-i18next'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { useRowSelectionOptional } from '@Pimcore/modules/element/listing/decorators/row-selection/context-layer/provider/use-row-selection-optional'
import { BatchEditProvider } from './batch-edit-modal/batch-edit-provider'
import { BatchEditModal } from './batch-edit-modal/batch-edit-modal'
import { CsvModal } from '@Pimcore/modules/element/listing/batch-actions/csv-modal/csv-modal'
import { XlsxModal } from '@Pimcore/modules/element/listing/batch-actions/xlsx-modal/xlsx-modal'
import { DataObjectBatchDeleteJob } from '@Pimcore/modules/execution-engine/jobs/batch-delete/data-object-batch-delete-job'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type ExecutionEngine } from '@Pimcore/modules/execution-engine/services/execution-engine'
import { useRefreshGrid } from '@Pimcore/modules/element/actions/refresh-grid/use-refresh-grid'
import { ClassificationStoreModalProvider } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider/classifcation-store-modal-provider'
import { elementTypes } from '@sdk/modules/data-object'

export const BatchActions = (): React.JSX.Element => {
  const rowSelection = useRowSelectionOptional()
  const elementType = elementTypes.dataObject
  const { refreshGrid } = useRefreshGrid(elementType)
  const executionEngine = container.get<ExecutionEngine>(serviceIds.executionEngine)

  const [batchEditModalOpen, setBatchEditModalOpen] = useState<boolean>(false)
  const [csvModalOpen, setCsvModalOpen] = useState<boolean>(false)
  const [xlsxModalOpen, setXlsxModalOpen] = useState<boolean>(false)

  const { t } = useTranslation()

  if (rowSelection === undefined) {
    return <></>
  }

  const { selectedRows, setSelectedRows } = rowSelection

  const numberedSelectedRows = selectedRows !== undefined ? Object.keys(selectedRows).map(Number) : []
  const hasSelectedItems = selectedRows !== undefined ? Object.keys(selectedRows).length > 0 : false

  const handleBatchDelete = async (): Promise<void> => {
    const job = new DataObjectBatchDeleteJob({
      itemIds: numberedSelectedRows,
      onFinish: async () => {
        await refreshGrid()
        setSelectedRows({})
      }
    })

    await executionEngine.runJob(job)
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
        hidden: !hasSelectedItems,
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
        <DropdownButton
          data-testid="listing-batch-actions-button"
          key={ 'dropdown-button' }
        >{hasSelectedItems ? t('listing.actions') : t('listing.non-selected.actions')}</DropdownButton>
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
