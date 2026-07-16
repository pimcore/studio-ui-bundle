/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useMemo, useState } from 'react'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { FieldsToAddPanel } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/view-layer/components/fields-to-add-panel/fields-to-add-panel'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Button } from '@Pimcore/components/button/button'
import { WindowModal } from '@Pimcore/components/modal/window-modal/window-modal'
import { Flex } from '@Pimcore/components/flex/flex'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { useAvailableColumns } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns'
import { useBatchEdit } from './hooks/use-batch-edit'
import { NO_LOCALE_FORM_KEY } from './batch-edit-provider'
import { BatchEditListContainer } from './batch-edit-list-container'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { Form } from '@Pimcore/components/form/form'
import { type AvailableColumn, buildColumnPickerGroups } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { useTranslation } from 'react-i18next'
import { api, useAssetPatchByIdMutation, useAssetPatchFolderByIdMutation } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useRowSelection } from '@Pimcore/modules/element/listing/decorators/row-selection/context-layer/provider/use-row-selection'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useSettings } from '@Pimcore/modules/element/listing/abstract/settings/use-settings'
import { useDynamicTypeResolver } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import { useRefreshGrid } from '@Pimcore/modules/element/actions/refresh-grid/use-refresh-grid'
import { shouldIncludeColumnItem } from './utils/dropdown-filter'
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
  const { availableColumns } = useAvailableColumns()
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
  const contentLanguages = (useUser().contentLanguages ?? []) as string[]
  const [fieldsToAddOpen, setFieldsToAddOpen] = useState<boolean>(true)

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
    // The hook assigns the next unused locale for localizable fields (one row per locale).
    addOrUpdateBatchEdit(column)
  }

  const handleApplyChanges = (): void => {
    form.submit()

    setBatchEditModalOpen(false)
  }

  const onFormFinish = async (values: any): Promise<void> => {
    const patches = batchEdits.map((batchEdit) => {
      // Localizable rows are namespaced under a Form.Group keyed by locale (null → sentinel),
      // so read the value from that group; non-localizable fields stay flat.
      const data = batchEdit.localizable
        ? values[batchEdit.locale ?? NO_LOCALE_FORM_KEY]?.[batchEdit.key]
        : values[batchEdit.key]

      return {
        name: batchEdit.key,
        language: batchEdit.locale ?? null,
        data,
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

  const columnGroups = useMemo(() => {
    const includableColumns = availableColumns.filter((column) =>
      shouldIncludeColumnItem({ ...column, mainType: column.type }, batchEdits, hasType, contentLanguages)
    )

    return buildColumnPickerGroups(includableColumns, t)
  }, [availableColumns, batchEdits, hasType, contentLanguages])

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
          <IconTextButton
            data-testid="batch-edit-add-column"
            icon={ { value: 'new' } }
            onClick={ () => { setFieldsToAddOpen((isOpen) => !isOpen) } }
            type='default'
          >
            {t('listing.add-column')}
          </IconTextButton>
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
      size="XL"
      title={ <ModalTitle>{t('batch-edit.modal-title')}</ModalTitle> }
    >
      <Flex
        className='w-full'
        gap='small'
      >
        { fieldsToAddOpen && (
          <FieldsToAddPanel
            data-testid="batch-edit-fields-to-add"
            groups={ columnGroups }
            onClose={ () => { setFieldsToAddOpen(false) } }
            onColumnSelect={ onColumnClick }
          />
        ) }

        <div style={ { flex: 1, minWidth: 0 } }>
          <Form
            form={ form }
            onFinish={ onFormFinish }
          >
            <BatchEditListContainer />
          </Form>
        </div>
      </Flex>
    </WindowModal>
  )
}
