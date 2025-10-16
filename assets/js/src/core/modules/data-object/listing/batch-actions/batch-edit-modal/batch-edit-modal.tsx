/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable max-lines */

import React, { useEffect, useMemo } from 'react'
import { isUndefined } from 'lodash'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { Dropdown, type ItemType, type MenuItemType } from '@Pimcore/components/dropdown/dropdown'
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
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { useRowSelection } from '@Pimcore/modules/element/listing/decorators/row-selection/context-layer/provider/use-row-selection'
import { api, useDataObjectPatchByIdMutation, useDataObjectPatchFolderByIdMutation } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { useSettings } from '@Pimcore/modules/element/listing/abstract/settings/use-settings'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@sdk/app'
import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'
import { createJob } from '@Pimcore/modules/execution-engine/jobs/batch-edit/factory'
import { defaultTopics, topics } from '@Pimcore/modules/execution-engine/topics'
import { useDynamicTypeResolver } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import { useRefreshGrid } from '@Pimcore/modules/element/actions/refresh-grid/use-refresh-grid'
import { filterDropdownItems, hasSelectableItems } from './utils/dropdown-filter'
import { FieldCollectionProvider } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/field-collection/providers/field-collection-provider'
import { useClassDefinitionSelection } from '../../decorator/class-definition-selection/context-layer/provider/use-class-definition-selection'
import { useClassificationStoreModal } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider/classifcation-store-modal-provider'
import { TabId } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/types'
import { type ClassificationStoreModalProps } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/components/classification-store-modal/classification-store-modal'
import { BatchEdit } from './batch-edit-provider'

export interface BatchEditModalProps {
  batchEditModalOpen: boolean
  setBatchEditModalOpen: (showBatchEditModal: boolean) => void
}

export const BatchEditModal = ({ batchEditModalOpen, setBatchEditModalOpen }: BatchEditModalProps): React.JSX.Element => {
  const { getAvailableColumnsDropdown } = useAvailableColumns()
  const { batchEdits, addOrUpdateBatchEdit, addOrUpdateBatchEdits, resetBatchEdits } = useBatchEdit()
  const [form] = Form.useForm()
  const { selectedRows } = useRowSelection()
  const [patchObjectsInFolder, { error: folderPatchError, isError: isFolderPatchError, isSuccess: isFolderPatchSuccess }] = useDataObjectPatchFolderByIdMutation()
  const [patchObjectsByIds, { error: idPatchError, isError: isIdPatchError, isSuccess: isIdPatchSuccess }] = useDataObjectPatchByIdMutation()
  const { useDataQueryHelper } = useSettings()
  const { getArgs } = useDataQueryHelper()
  const { id, elementType } = useElementContext()
  const dispatch = useAppDispatch()
  const { addJob } = useJobs()
  const selectedRowsIds = Object.keys(selectedRows ?? {})
  const selectedRowsCount = selectedRowsIds.length
  const { hasType, getType } = useDynamicTypeResolver()
  const { refreshGrid } = useRefreshGrid(elementType)
  const classDefinitionSelection = useClassDefinitionSelection()
  const selectedClassDefinition = classDefinitionSelection.selectedClassDefinition
  const { openModal } = useClassificationStoreModal({ onUpdate: onClassificationStoreUpdate })
  const { availableColumns } = useAvailableColumns()

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
      if (!('fieldDefinition' in column.config)) {
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
      addJob(createJob({
        title: t('batch-edit.job-title'),
        topics: [topics['patch-finished'], ...defaultTopics],
        action: async () => {
          const filters = getArgs()?.body?.filters ?? {}
          delete filters.page
          delete filters.pageSize

          const response = await patchObjectsInFolder({
            body: {
              data: [
                {
                  folderId: id,
                  editableData: values
                }
              ],
              filters: {
                ...filters
              },
              classId: String(selectedClassDefinition?.id)
            }
          })

          if (response.data?.jobRunId === undefined) {
            trackError(new GeneralError('JobRunId is undefined'))
            throw new Error('JobRunId is undefined')
          }

          return response.data?.jobRunId
        },
        refreshGrid,
        // @todo change that to a more generic context
        assetContextId: id
      }))
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
      addJob(createJob({
        title: t('batch-edit.job-title'),
        topics: [topics['patch-finished'], ...defaultTopics],
        action: async () => {
          const response = await patchObjectsByIds({
            body: {
              data: selectedRowsIds.map((rowId) => ({
                id: parseInt(rowId),
                editableData: values
              }))
            }
          })

          if (response.data?.jobRunId === undefined) {
            trackError(new GeneralError('JobRunId is undefined'))
            throw new Error('JobRunId is undefined')
          }

          return response.data?.jobRunId
        },
        refreshGrid,
        // @todo change that to a more generic context
        assetContextId: id
      }))
    }

    resetModal()
    setBatchEditModalOpen(false)
  }

  const availableDropdownList = getAvailableColumnsDropdown(onColumnClick).menu.items

  const getFilteredAvailableDropdownList = useMemo(() => (): Array<ItemType<MenuItemType>> => {
    if (isUndefined(availableDropdownList)) return []

    return filterDropdownItems(
      availableDropdownList as Array<ItemType<MenuItemType>>,
      batchEdits,
      hasType,
      getType
    )
  }, [availableDropdownList, batchEdits, hasType, getType])

  const isEmptyDropdownList = !hasSelectableItems(getFilteredAvailableDropdownList())

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
          <Form
            form={ form }
            onFinish={ onFormFinish }
          >
            <BatchEditListContainer />
          </Form>
        </FieldWidthProvider>
      </WindowModal>
    </FieldCollectionProvider>
  )
}
