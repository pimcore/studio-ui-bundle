/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useAppDispatch } from '@sdk/app'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { api, type DataObjectGetGridApiArg, useDataObjectPatchByIdMutation } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { type UseInlineEditApiUpdateReturn } from '@Pimcore/modules/element/listing/decorators/inline-edit/inline-edit-decorator'
import { isNil, set } from 'lodash'
import { addBatchAppendMode, BatchAppendMode, META_SUPPORTS_BATCH_APPEND_MODE } from '../../../batch-actions/batch-append-mode/batch-append-mode'
import { useLanguageSelection } from '@Pimcore/components/language-selection'
import { useSettings } from '@Pimcore/modules/element/listing/abstract/settings/use-settings'

export const useInlineEditApiUpdate = (): UseInlineEditApiUpdateReturn => {
  const [patchDataObject] = useDataObjectPatchByIdMutation()
  const dispatch = useAppDispatch()
  const { currentLanguage } = useLanguageSelection()
  const { useColumnMapper } = useSettings()
  const columnMapper = useColumnMapper()

  const updateCache: UseInlineEditApiUpdateReturn['updateCache'] = (event) => {
    const { update, getGetRequestArgs } = event
    const { id, column: columnToUpdate, value } = update

    dispatch(api.util.updateQueryData('dataObjectGetGrid', getGetRequestArgs as DataObjectGetGridApiArg, (oldData) => {
      item_loop:
      for (const item of oldData.items) {
        if (item.id !== id) {
          continue
        }

        for (const column of item.columns!) {
          if (columnMapper.shouldMapDataToColumn(column, columnToUpdate)) {
            column.value = value
            if (!isNil(column.inheritance) && 'inherited' in column.inheritance && column.inheritance.inherited === true) {
              column.inheritance.inherited = false
            }
            // for now we assume that there can be only one value updated at the time
            break item_loop
          }
        }
      }

      return oldData
    }))
  }

  const updateApiData: UseInlineEditApiUpdateReturn['updateApiData'] = async (event) => {
    const { update } = event
    let columnKey = update.column.key

    if (update.column.localizable) {
      const splittedColumnKey = (columnKey ?? '').split('.')
      const columnId = splittedColumnKey[splittedColumnKey.length - 1]
      splittedColumnKey.pop()
      const hasPrepath = splittedColumnKey.length > 0 && splittedColumnKey[0] !== ''

      columnKey = `${splittedColumnKey.join('.')}${hasPrepath ? '.' : ''}localizedfields.${columnId}.${update.column.locale ?? currentLanguage}`
    }

    const value = event.meta?.[META_SUPPORTS_BATCH_APPEND_MODE] === true
      ? addBatchAppendMode(update.value, BatchAppendMode.Replace)
      : update.value

    const isPublishedColumn = columnKey === 'published'

    const dataItem = {
      id: update.id,
      ...(isPublishedColumn
        ? {
            published: value
          }
        : {
            editableData: {
              ...set({}, columnKey ?? '', value)
            }
          }
      )
    }

    const promise = patchDataObject({
      body: {
        data: [dataItem]
      }
    })

    const result = await promise
    if (!isNil(result.error)) {
      trackError(new ApiError(result.error))
    }

    return result
  }

  return {
    updateCache,
    updateApiData
  }
}
