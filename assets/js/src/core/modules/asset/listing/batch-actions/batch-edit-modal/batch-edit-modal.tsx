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

import React, { useContext, useEffect, useState } from 'react'
import { isUndefined } from 'lodash'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Button } from '@Pimcore/components/button/button'
import { t } from 'i18next'
import {
  type GridColumnConfiguration,
  useAssetPatchByIdMutation
} from '@Pimcore/modules/asset/asset-api-slice.gen'
import { Modal } from '@Pimcore/components/modal/modal'
import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'
import { createJob } from '@Pimcore/modules/execution-engine/jobs/batch-edit/factory'
import { defaultTopics, topics } from '@Pimcore/modules/execution-engine/topics'
import { Flex } from '@Pimcore/components/flex/flex'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { eventBus } from '@Pimcore/lib/event-bus'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { useRowSelection } from '@Pimcore/modules/element/listing/decorators/row-selection/context-layer/provider/use-row-selection'
import { useAvailableColumns } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns'
import { useBatchEdit } from './hooks/use-batch-edit'
import { BatchEditListContainer } from './batch-edit-list-container'

export interface BatchEditModalProps {
  batchEditModalOpen: boolean
  setBatchEditModalOpen: (showBatchEditModal: boolean) => void
}

export const BatchEditModal = ({ batchEditModalOpen, setBatchEditModalOpen }: BatchEditModalProps): React.JSX.Element => {
  const { getAvailableColumnsDropdown } = useAvailableColumns()
  const assetContext = useContext(AssetContext)
  const [patchAsset] = useAssetPatchByIdMutation()
  const { batchEdits, addOrUpdateBatchEdit, resetBatchEdits, assetPatchForUpdate } = useBatchEdit()
  const { addJob } = useJobs()
  const { selectedRows } = useRowSelection()
  const [jobTitle, setJobTitle] = useState<string>('Asset')
  useEffect(() => {
    setJobTitle(Object.keys(selectedRows ?? {}).length.toString())
  }, [selectedRows])

  const onColumnClick = (column: GridColumnConfiguration): void => {
    const locale = column.locale ?? null
    addOrUpdateBatchEdit(column.key, column.type, column.frontendType, locale === null ? null : String(locale), column.localizable, '')
  }

  const applyChanges = (): void => {
    Object.keys(selectedRows ?? {}).length === 1 ? applyUpdate() : applyUpdates()
  }

  const applyUpdate = (): void => {
    patchAsset(assetPatchForUpdate()).then(() => {
      eventBus.publish({ identifier: { type: 'asset:listing:refresh', id: assetContext.id } })
    }).catch((error) => { console.error(`Failed to patch assets ${error}`) })
    resetBatchEdits()
    setBatchEditModalOpen(false)
  }

  const applyUpdates = (): void => {
    addJob(createJob({
      title: t('jobs.batch-edit-job.title', { title: jobTitle }),
      topics: [topics['patch-finished'], ...defaultTopics],
      assetContextId: assetContext.id,
      action: async () => {
        try {
          const response = await patchAsset(assetPatchForUpdate())
          const data = response.data
          if (!isUndefined(data?.jobRunId)) {
            return data.jobRunId
          } else {
            trackError(new GeneralError('JobRunId is undefined'))
            throw new Error('JobRunId is undefined')
          }
        } catch (error) {
          console.error('Failed to patch assets')
          throw error
        }
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
          items: getAvailableColumnsDropdown(onColumnClick).menu.items
        } }
        >
          <IconTextButton
            icon={ { value: 'new' } }
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
                icon={ { value: 'close' } }
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
