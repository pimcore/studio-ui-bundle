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

import { useAppDispatch } from '@Pimcore/app/store'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { api, type DataObjectGetGridApiArg, useDataObjectPatchByIdMutation } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { type UseInlineEditApiUpdateReturn } from '@Pimcore/modules/element/listing/decorators/inline-edit/inline-edit-decorator'
import { isNil, set } from 'lodash'
import { addBatchAppendMode, BatchAppendMode, META_SUPPORTS_BATCH_APPEND_MODE } from '../../../batch-actions/batch-append-mode/batch-append-mode'

export const useInlineEditApiUpdate = (): UseInlineEditApiUpdateReturn => {
  const [patchDataObject] = useDataObjectPatchByIdMutation()
  const dispatch = useAppDispatch()

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
          if (column.key === columnToUpdate.key && column.locale === columnToUpdate.locale) {
            column.value = value
            if (column.inheritance === true) {
              column.inheritance = 'broken'
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

    if (update.column.localizable && update.column.locale !== undefined && update.column.locale !== null) {
      const splittedColumnKey = columnKey.split('.')
      const columnId = splittedColumnKey[splittedColumnKey.length - 1]
      splittedColumnKey.pop()
      const hasPrepath = splittedColumnKey.length > 0 && splittedColumnKey[0] !== ''

      columnKey = `${splittedColumnKey.join('.')}${hasPrepath ? '.' : ''}localizedfields.${columnId}.${update.column.locale}`
    }

    const value = event.meta?.[META_SUPPORTS_BATCH_APPEND_MODE] === true
      ? addBatchAppendMode(update.value, BatchAppendMode.Replace)
      : update.value

    const promise = patchDataObject({
      body: {
        data: [
          {
            id: update.id,
            editableData: {
              ...set({}, columnKey, value)
            }
          }
        ]
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
