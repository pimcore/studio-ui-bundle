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
import { t } from 'i18next'
import { WindowModal } from '@Pimcore/components/modal/window-modal/window-modal'
import { Flex } from '@Pimcore/components/flex/flex'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'
import { useAvailableColumns } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns'
import { useBatchEdit } from './hooks/use-batch-edit'
import { BatchEditListContainer } from './batch-edit-list-container'
import { Form } from '@Pimcore/components/form/form'
import { FieldWidthProvider } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/field-width-provider'
import { type AvailableColumn, buildColumnPickerGroups } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { useRowSelection } from '@Pimcore/modules/element/listing/decorators/row-selection/context-layer/provider/use-row-selection'
import { api, useDataObjectPatchByIdMutation, useDataObjectPatchFolderByIdMutation } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { useSettings } from '@Pimcore/modules/element/listing/abstract/settings/use-settings'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { isArray } from 'lodash'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@sdk/app'
import { useDynamicTypeResolver } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import { useRefreshGrid } from '@Pimcore/modules/element/actions/refresh-grid/use-refresh-grid'
import { shouldIncludeColumnItem } from './utils/dropdown-filter'
import { FieldCollectionProvider } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/field-collection/providers/field-collection-provider'
import { useClassDefinitionSelection } from '../../decorator/class-definition-selection/context-layer/provider/use-class-definition-selection'
import { useClassificationStoreModal } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider/classifcation-store-modal-provider'
import { TabId } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/types'
import { type ClassificationStoreModalProps } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/components/classification-store-modal/classification-store-modal'
import { hasFieldDefinition } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/has-field-definition'
import { DataObjectBatchEditJob } from '@Pimcore/modules/execution-engine/jobs/batch-edit/data-object-batch-edit-job'
import { DataObjectFolderBatchEditJob } from '@Pimcore/modules/execution-engine/jobs/batch-edit/data-object-folder-batch-edit-job'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type ExecutionEngine } from '@Pimcore/modules/execution-engine/services/execution-engine'

export interface BatchEditModalProps {
  batchEditModalOpen: boolean
  setBatchEditModalOpen: (showBatchEditModal: boolean) => void
}

export const BatchEditModal = ({ batchEditModalOpen, setBatchEditModalOpen }: BatchEditModalProps): React.JSX.Element => {
  const { batchEdits, addOrUpdateBatchEdit, addOrUpdateBatchEdits, resetBatchEdits } = useBatchEdit()
  const [form] = Form.useForm()
  const { selectedRows } = useRowSelection()
  const [patchObjectsInFolder, { error: folderPatchError, isError: isFolderPatchError, isSuccess: isFolderPatchSuccess }] = useDataObjectPatchFolderByIdMutation()
  const [patchObjectsByIds, { error: idPatchError, isError: isIdPatchError, isSuccess: isIdPatchSuccess }] = useDataObjectPatchByIdMutation()
  const { useDataQueryHelper } = useSettings()
  const user = useUser()
  const contentLanguages = isArray(user.contentLanguages) ? user.contentLanguages as string[] : []
  const { getArgs } = useDataQueryHelper()
  const { id, elementType } = useElementContext()
  const dispatch = useAppDispatch()
  const executionEngine = container.get<ExecutionEngine>(serviceIds.executionEngine)
  const selectedRowsIds = Object.keys(selectedRows ?? {})
  const selectedRowsCount = selectedRowsIds.length
  const { hasType, getType } = useDynamicTypeResolver()
  const { refreshGrid } = useRefreshGrid(elementType)
  const classDefinitionSelection = useClassDefinitionSelection()
  const selectedClassDefinition = classDefinitionSelection.selectedClassDefinition
  const { openModal } = useClassificationStoreModal({ onUpdate: onClassificationStoreUpdate })
  const { availableColumns } = useAvailableColumns()
  const [fieldsToAddOpen, setFieldsToAddOpen] = useState<boolean>(true)

  const resetModal = (): void => {
    resetBatchEdits()
    form.resetFields()
  }

  useEffect(() => {
    if (isFolderPatchError) {
      trackError(new ApiError(folderPatchError))
    }

    if (isIdPatchError) {
      trackError(new ApiError(idPatchError))
    }
  }, [folderPatchError, idPatchError])

  useEffect(() => {
    if (isFolderPatchSuccess || isIdPatchSuccess) {
      resetModal()
    }

    if (isIdPatchSuccess && selectedRowsCount === 1) {
      dispatch(api.util.invalidateTags(invalidatingTags.DATA_OBJECT_GRID_ID(id)))
    }
  }, [isFolderPatchSuccess, isIdPatchSuccess])

  function onClassificationStoreUpdate (data): void {
    const fieldDefinition = data.modalContext
    const baseColumn = availableColumns.find(col => col.key === fieldDefinition.name && col.type === 'dataobject.classificationstore')

    if (baseColumn === undefined) {
      throw new Error('Could not find base column for classification store field ' + fieldDefinition.name)
    }

    const columnsToAdd: AvailableColumn[] = []

    if (data.type === 'group-by-key') {
      data.data.forEach((item) => {
        const itemDefinition = item.definition
        let alreadyInBatchEdits = false

        batchEdits.forEach((batchEdit) => {
          if (batchEdit.key === baseColumn.key && (batchEdit.config as { keyId: string, groupId: string })?.keyId === item.id && (batchEdit.config as { keyId: string, groupId: string })?.groupId === item.groupId) {
            alreadyInBatchEdits = true
          }
        })

        if (alreadyInBatchEdits) {
          return
        }

        columnsToAdd.push({
          ...baseColumn,
          key: `${baseColumn.key}`,
          frontendType: itemDefinition?.fieldtype,
          config: {
            keyId: item.id,
            groupId: item.groupId,
            fieldDefinition: itemDefinition
          }
        })
      })

      addOrUpdateBatchEdits(columnsToAdd)
    }
  }

  const onColumnClick = (column: AvailableColumn): void => {
    if (column.type === 'dataobject.classificationstore') {
      if (!hasFieldDefinition(column.config)) {
        throw new Error('Field definition is missing in config')
      }

      const fieldDefinition = column.config?.fieldDefinition as ClassificationStoreModalProps

      openModal({
        ...fieldDefinition,
        fieldName: column.key,
        allowedTabs: [TabId.GroupByKey]
      })
      return
    }

    addOrUpdateBatchEdit(column, undefined)
  }

  const handleApplyChanges = (): void => {
    form.submit()
  }

  const onFormFinish = async (values: any): Promise<void> => {
    if (selectedRowsCount === 0) {
      const filters = getArgs()?.body?.filters ?? {}
      delete filters.page
      delete filters.pageSize

      const job = new DataObjectFolderBatchEditJob({
        patchObjectsInFolder,
        folderId: id,
        values,
        filters,
        classId: String(selectedClassDefinition?.id),
        assetContextId: id,
        refreshGrid
      })
      await executionEngine.runJob(job)
    } else if (selectedRowsCount === 1) {
      await patchObjectsByIds({
        body: {
          data: [
            {
              id: parseInt(selectedRowsIds[0]),
              editableData: values
            }
          ]
        }
      })
    } else {
      const job = new DataObjectBatchEditJob({
        patchObjectsByIds,
        selectedRowsIds: selectedRowsIds.map(Number),
        values,
        assetContextId: id,
        refreshGrid
      })
      await executionEngine.runJob(job)
    }

    resetModal()
    setBatchEditModalOpen(false)
  }

  const columnGroups = useMemo(() => {
    const includableColumns = availableColumns.filter((column) =>
      shouldIncludeColumnItem({ ...column, mainType: column.type }, batchEdits, hasType, getType, contentLanguages)
    )

    return buildColumnPickerGroups(includableColumns, t)
  }, [availableColumns, batchEdits, hasType, getType, contentLanguages])

  return (
    <FieldCollectionProvider>
      <WindowModal
        afterClose={ () => {
          resetModal()
        } }
        footer={ <ModalFooter
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
                    resetModal()
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
        </ModalFooter> }
        onCancel={ () => {
          setBatchEditModalOpen(false)
        } }
        open={ batchEditModalOpen }
        size={ 'XL' }
        title={ <ModalTitle>{t('batch-edit.modal-title')}</ModalTitle> }
      >
        <FieldWidthProvider
          fieldWidthValues={ {
            large: 9999,
            medium: 9999,
            small: 9999
          } }
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
        </FieldWidthProvider>
      </WindowModal>
    </FieldCollectionProvider>
  )
}
