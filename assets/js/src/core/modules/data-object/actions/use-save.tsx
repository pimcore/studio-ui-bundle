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

import { useContext } from 'react'
import { DataObjectContext } from '@Pimcore/modules/data-object/data-object-provider'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import type { DataObjectUpdateByIdApiArg } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import type { DataProperty } from '@Pimcore/modules/element/draft/hooks/use-properties'
import type {
  DataProperty as DataPropertyApi
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice.gen'
import { useDataObjectUpdateByIdMutation } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import {
  useSaveContext
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/save-provider/use-save-context'

export interface UseSaveHookReturn {
  save: (editableData: Record<string, any>, task?: 'version' | 'autoSave') => Promise<void>
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
}

export const useSave = (): UseSaveHookReturn => {
  const { id } = useContext(DataObjectContext)
  const { dataObject, properties } = useDataObjectDraft(id)
  const [saveDataObject, { isLoading, isSuccess, isError }] = useDataObjectUpdateByIdMutation()
  const { setIsAutoSaved, setIsAutoSaveLoading } = useSaveContext()

  const save = async (editableData: Record<string, any>, task?: 'version' | 'autoSave'): Promise<void> => {
    if (dataObject?.changes === undefined) return

    const update: DataObjectUpdateByIdApiArg['body']['data'] = {}
    if (dataObject.changes.properties) {
      const propertyUpdate = properties?.map((property: DataProperty): DataPropertyApi => {
        const { rowId, ...propertyApi } = property

        if (typeof propertyApi.data === 'object') {
          return {
            ...propertyApi,
            data: propertyApi?.data?.id ?? null
          }
        }

        return propertyApi
      })

      update.properties = propertyUpdate?.filter((property) => !property.inherited)
    }

    if (Object.keys(editableData).length > 0) {
      update.editableData = editableData
    }

    if (task !== undefined) {
      update.task = task
    }

    if (task === 'autoSave') {
      setIsAutoSaveLoading(true)
    }

    await saveDataObject({
      id,
      body: {
        data: {
          ...update
        }
      }
    }).then(() => {
      setIsAutoSaved(task === 'autoSave')
      if (task === 'autoSave') {
        setIsAutoSaveLoading(false)
      }
    })
  }

  return {
    save,
    isLoading,
    isSuccess,
    isError
  }
}
