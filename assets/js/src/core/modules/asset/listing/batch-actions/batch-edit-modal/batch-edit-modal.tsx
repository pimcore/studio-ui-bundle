/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useMemo } from 'react'
import { isUndefined } from 'lodash'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { Dropdown, type ItemType, type MenuItemType } from '@Pimcore/components/dropdown/dropdown'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Button } from '@Pimcore/components/button/button'
import { WindowModal } from '@Pimcore/components/modal/window-modal/window-modal'
import { Flex } from '@Pimcore/components/flex/flex'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { useAvailableColumns } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns'
import { useBatchEdit } from './hooks/use-batch-edit'
import { BatchEditListContainer } from './batch-edit-list-container'
import { Form } from '@Pimcore/components/form/form'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { useTranslation } from 'react-i18next'
import { api, useAssetPatchByIdMutation, useAssetPatchFolderByIdMutation } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useRowSelection } from '@Pimcore/modules/element/listing/decorators/row-selection/context-layer/provider/use-row-selection'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useSettings } from '@Pimcore/modules/element/listing/abstract/settings/use-settings'
import { useDynamicTypeResolver } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import { useRefreshGrid } from '@Pimcore/modules/element/actions/refresh-grid/use-refresh-grid'
import { filterDropdownItems, hasSelectableItems } from './utils/dropdown-filter'
import { AssetBatchEditJob } from '@Pimcore/modules/execution-engine/jobs/batch-edit/asset-batch-edit-job'
import { AssetFolderBatchEditJob } from '@Pimcore/modules/execution-engine/jobs/batch-edit/asset-folder-batch-edit-job'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type ExecutionEngine } from '@Pimcore/modules/execution-engine/services/execution-engine'

export interface BatchEditModalProps {
  batchEditModalOpen: boolean
  setBatchEditModalOpen: (showBatchEditModal: boolean) => void
}

export const BatchEditModal = ({ batchEditModalOpen, setBatchEditModalOpen }: BatchEditModalProps): React.JSX.Element => {
  const { getAvailableColumnsDropdown } = useAvailableColumns()
  const { batchEdits, addOrUpdateBatchEdit, resetBatchEdits } = useBatchEdit()
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const [patchAssets, { isError, isSuccess, error }] = useAssetPatchByIdMutation()
  const [patchAssetsInFolder, { isError: isFolderPatchError, isSuccess: isFolderPatchSuccess, error: folderPatchError }] = useAssetPatchFolderByIdMutation()
  const { selectedRows } = useRowSelection()
  const selectedRowsIds = Object.keys(selectedRows ?? {}).map(Number)
  const selectedRowsCount = selectedRowsIds.length
  const executionEngine = container.get<ExecutionEngine>(serviceIds.executionEngine)
  const { id, elementType } = useElementContext()
  const { useDataQueryHelper } = useSettings()
  const { getArgs } = useDataQueryHelper()
  const { hasType } = useDynamicTypeResolver()
  const { refreshGrid } = useRefreshGrid(elementType)

  const resetModal = (): void => {
    resetBatchEdits()
    form.resetFields()
  }

  useEffect(() => {
    if (isSuccess || isFolderPatchSuccess) {
      setBatchEditModalOpen(false)
      resetModal()
    }

    if (selectedRowsCount === 1) {
      api.util.invalidateTags(invalidatingTags.ASSET_GRID_ID(selectedRowsIds[0]))
    }
  }, [isSuccess, isFolderPatchSuccess])

  useEffect(() => {
    if (isError) {
      trackError(new ApiError(error))
    }

    if (isFolderPatchError) {
      trackError(new ApiError(folderPatchError))
    }
  }, [isError, isFolderPatchSuccess])

  const onColumnClick = (column: AvailableColumn): void => {
    const locale = column.locale ?? null
    addOrUpdateBatchEdit({ ...column, locale })
  }

  const handleApplyChanges = (): void => {
    form.submit()

    setBatchEditModalOpen(false)
  }

  const onFormFinish = async (values: any): Promise<void> => {
    const patches = batchEdits.map((batchEdit) => {
      return {
        name: batchEdit.key,
        language: batchEdit.locale ?? null,
        data: values[batchEdit.key],
        type: batchEdit.type
      }
    })

    const filters = getArgs()?.body?.filters ?? {}
    delete filters.page
    delete filters.pageSize

    if (selectedRowsCount === 0) {
      const job = new AssetFolderBatchEditJob({
        patchAssetsInFolder,
        folderId: id,
        patches,
        filters,
        assetContextId: id,
        refreshGrid
      })
      await executionEngine.runJob(job)
    } else if (selectedRowsCount === 1) {
      await patchAssets({
        body: {
          data: [
            {
              id: selectedRowsIds[0],
              metadata: patches
            }
          ]
        }
      })
    } else {
      const job = new AssetBatchEditJob({
        patchAssets,
        selectedRowsIds,
        patches,
        assetContextId: id,
        refreshGrid
      })
      await executionEngine.runJob(job)
    }
  }

  const availableDropdownList = getAvailableColumnsDropdown(onColumnClick).menu.items

  const getFilteredAvailableDropdownList = useMemo(() => (): Array<ItemType<MenuItemType>> => {
    if (isUndefined(availableDropdownList)) return []

    return filterDropdownItems(
      availableDropdownList as Array<ItemType<MenuItemType>>,
      batchEdits,
      hasType
    )
  }, [availableDropdownList, batchEdits, hasType])

  const isEmptyDropdownList = !hasSelectableItems(getFilteredAvailableDropdownList())

  return (
    <WindowModal
      afterClose={ () => {
        resetModal()
      } }
      footer={ (
        <ModalFooter
          divider
          justify={ 'space-between' }
        >
          <Dropdown menu={ { items: getFilteredAvailableDropdownList() } }>
            <IconTextButton
              disabled={ isEmptyDropdownList }
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
                  {t('batch-edit.modal-footer.discard-all-changes')}
                </IconTextButton>
                <Button
                  onClick={ handleApplyChanges }
                  type='primary'
                >
                  {t('batch-edit.modal-footer.apply-changes')}
                </Button>
              </Flex>
            )}
        </ModalFooter>
      ) }
      onCancel={ () => {
        setBatchEditModalOpen(false)
        resetModal()
      } }
      open={ batchEditModalOpen }
      size="M"
      title={ <ModalTitle>{t('batch-edit.modal-title')}</ModalTitle> }
    >
      <Form
        form={ form }
        onFinish={ onFormFinish }
      >
        <BatchEditListContainer />
      </Form>
    </WindowModal>
  )
}
