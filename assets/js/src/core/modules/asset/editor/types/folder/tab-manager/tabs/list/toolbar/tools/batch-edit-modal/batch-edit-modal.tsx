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

import React, { useEffect, useState } from 'react'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import {
  getFormattedDropDownMenu,
  useListGridAvailableColumns,
  useListSelectedRows
} from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/list/hooks/use-list'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Button } from '@Pimcore/components/button/button'
import { t } from 'i18next'
import {
  useBatchEdit
} from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/list/toolbar/tools/batch-edit-modal/hooks/use-batch-edit'
import {
  BatchEditListContainer
} from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/list/toolbar/tools/batch-edit-modal/batch-edit-list-container'
import {
  type GridColumnConfiguration,
  useAssetPatchByIdMutation
} from '@Pimcore/modules/asset/asset-api-slice.gen'
import { Modal } from '@Pimcore/components/modal/modal'
import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'
import { createJob } from '@Pimcore/modules/execution-engine/jobs/default/factory'
import { defaultTopics, topics } from '@Pimcore/modules/execution-engine/topics'
import { Flex } from '@Pimcore/components/flex/flex'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'

export interface BatchEditModalProps {
  batchEditModalOpen: boolean
  setBatchEditModalOpen: (showBatchEditModal: boolean) => void
}

export const BatchEditModal = ({ batchEditModalOpen, setBatchEditModalOpen }: BatchEditModalProps): React.JSX.Element => {
  const { editableColumnsDropDownMenu } = useListGridAvailableColumns()
  const [patchAsset] = useAssetPatchByIdMutation()
  const { batchEdits, addOrUpdateBatchEdit, resetBatchEdits, assetPatchForUpdate } = useBatchEdit()
  const { addJob } = useJobs()
  const { selectedRows } = useListSelectedRows()
  const [jobTitle, setJobTitle] = useState<string>('Asset')

  useEffect(() => {
    setJobTitle(Object.keys(selectedRows).length.toString())
  }, [selectedRows])

  const onColumnClick = (column: GridColumnConfiguration): void => {
    addOrUpdateBatchEdit(column.key, column.type, '')
  }

  const applyChanges = (): void => {
    Object.keys(selectedRows).length === 1 ? applyUpdate() : applyUpdates()
  }

  const applyUpdate = (): void => {
    patchAsset(assetPatchForUpdate()).then(() => {
      console.log('----> reload the app')
    }).catch((error) => { console.error(`Failed to patch assets ${error}`) })
  }

  const applyUpdates = (): void => {
    addJob(createJob({
      title: t('jobs.batch-edit-job.title', { title: jobTitle }),
      topics: [topics['patch-finished'], ...defaultTopics],
      action: async () => {
        const promise = patchAsset(assetPatchForUpdate())

        promise.catch(() => {
          console.error('Failed to patch assets')
        })

        const response = (await promise) as any
        const data = response.data
        return data.jobRunId
      }
    }))

    resetBatchEdits()
    setBatchEditModalOpen(false)
  }

  return (
    <Modal
      afterClose={ () => {
        resetBatchEdits()
      } }
      footer={ <ModalFooter
        divider
        justify={ 'space-between' }
               >
        <Dropdown menu={ {
          items: getFormattedDropDownMenu(editableColumnsDropDownMenu, onColumnClick)
        } }
        >
          <IconTextButton
            icon='PlusCircleOutlined'
            type='default'
          >
            {t('listing.add-column')}
          </IconTextButton>
        </Dropdown>
        {batchEdits.length > 0 &&
            (
            <Flex
              align={ 'center' }
              gap={ 'extra-small' }
            >
              <IconTextButton
                icon='close'
                onClick={ () => {
                  resetBatchEdits()
                } }
                type='link'
              >
                {t('batch-edit.modal-footer.discard-all-changes')}</IconTextButton>
              <Button
                onClick={ () => {
                  applyChanges()
                } }
                type='primary'
              >{t('batch-edit.modal-footer.apply-changes')}</Button>
            </Flex>
            )}
      </ModalFooter> }
      onCancel={ () => {
        setBatchEditModalOpen(false)
      } }
      open={ batchEditModalOpen }
      size={ 'M' }
      title={ <ModalTitle>{t('batch-edit.modal-title')}</ModalTitle> }
    >
      <BatchEditListContainer />
    </Modal>
  )
}
