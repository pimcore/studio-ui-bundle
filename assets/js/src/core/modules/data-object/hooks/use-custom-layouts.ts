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

import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import {
  type CustomLayoutsInCompactFormatToBeUsedForEGListings,
  useClassCustomLayoutEditorCollectionQuery
} from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { isUndefined } from 'lodash'

type Layout = CustomLayoutsInCompactFormatToBeUsedForEGListings

export interface UseCustomLayoutsReturn {
  layouts: Layout[] | undefined
  getDefaultLayoutId: (currentLayout?: string | null) => string | null
  isLoading: boolean
}

export const useCustomLayouts = (id: number): UseCustomLayoutsReturn => {
  const { dataObject, isLoading: isDraftLoading } = useDataObjectDraft(id)
  const { data, error, isLoading: isCustomLayoutLoading } = useClassCustomLayoutEditorCollectionQuery({ objectId: id }, { skip: dataObject === undefined || dataObject.type === 'folder' })
  if (error !== undefined) {
    trackError(new ApiError(error))
  }

  const layouts = data !== undefined ? data.items : undefined

  const getDefaultLayoutId = (currentLayout?: string | null): string | null => {
    if (isUndefined(layouts)) {
      return null
    }
    const defaultLayout = layouts.find(layout => layout.default) ??
            layouts.find(layout => layout.id === currentLayout) ??
            layouts.find(layout => layout.id === '0') ??
            layouts[0] ??
            null

    return defaultLayout?.id ?? null
  }
  const isLoading = isDraftLoading || (isCustomLayoutLoading && dataObject?.type !== 'folder')
  return {
    layouts,
    getDefaultLayoutId,
    isLoading
  }
}
