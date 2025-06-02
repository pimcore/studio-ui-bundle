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

export interface BatchEditModalProps {
  batchEditModalOpen: boolean
  setBatchEditModalOpen: (showBatchEditModal: boolean) => void
}

export const BatchEditModal = ({ batchEditModalOpen, setBatchEditModalOpen }: BatchEditModalProps): React.JSX.Element => {
  const { getAvailableColumnsDropdown } = useAvailableColumns()
  const { batchEdits, addOrUpdateBatchEdit, resetBatchEdits } = useBatchEdit()
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
  const { hasType } = useDynamicTypeResolver()
  const { refreshGrid } = useRefreshGrid(elementType)

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

  const onColumnClick = (column: AvailableColumn): void => {
    addOrUpdateBatchEdit(column, undefined)
  }

  const handleApplyChanges = (): void => {
    form.submit()

    resetModal()
    setBatchEditModalOpen(false)
  }

  const onFormFinish = async (values: any): Promise<void> => {
    if (selectedRowsCount === 0) {
      addJob(createJob({
        title: t('batch-edit.job-title'),
        topics: [topics['patch-finished'], ...defaultTopics],
        action: async () => {
          const response = await patchObjectsInFolder({
            body: {
              data: [
                {
                  folderId: id,
                  editableData: values
                }
              ],
              filters: getArgs()?.body?.filters
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
  }

  const availableDropdownList = getAvailableColumnsDropdown(onColumnClick).menu.items

  const getFilteredTypes = (column: any): object[] => {
    return column?.children?.filter((child: any) => {
      const isEditable: boolean = child.editable === true
      const isAlreadyInBatchEditList = batchEdits.some(item => child.key === item.key && child.group === item.group)
      const hasDynamicType = hasType({ target: 'BATCH_EDIT', dynamicTypeIds: [child?.frontendType as string] })

      return isEditable && hasDynamicType && !isAlreadyInBatchEditList
    })
  }

  const getFilteredAvailableDropdownList = useMemo(() => (): Array<ItemType<MenuItemType>> | undefined => {
    if (isUndefined(availableDropdownList)) return []

    return availableDropdownList.map((column: any) => {
      return {
        ...column,
        children: getFilteredTypes(column)
      }
    })
  }, [availableDropdownList])
  const isEmptyDropdownList = getFilteredAvailableDropdownList()?.every((item: any) => item?.children?.length === 0)

  return (
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
  )
}
