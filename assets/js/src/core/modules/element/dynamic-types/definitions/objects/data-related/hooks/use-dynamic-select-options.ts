/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useEffect, useMemo } from 'react'
import { isNil, isUndefined } from 'lodash'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useLazyDataObjectGetSelectOptionsQuery } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import {
  convertSelectOptions,
  type ConvertedSelectOption,
  type SelectOptionsHookContext,
  type SelectOptionType
} from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/utils/select-options'

export interface UseDynamicSelectOptionsResult {
  options: ConvertedSelectOption[] | undefined
  isLoading: boolean
  fetchOptions: (changedData?: Record<string, unknown>, context?: Record<string, unknown>) => void
}

/**
 * Fetches dynamic select options from the backend provider via a lazy query. `fetchOptions()`
 * triggers it with the current `changedData` (the result is cached per request args); the response
 * is converted to antd options.
 */
export const useDynamicSelectOptions = (
  objectId?: number,
  fieldName?: string
): UseDynamicSelectOptionsResult => {
  const [trigger, { data, isFetching, error }] = useLazyDataObjectGetSelectOptionsQuery()
  const options = useMemo(() => convertSelectOptions(data?.items), [data])

  useEffect(() => {
    if (!isNil(error)) {
      trackError(new ApiError(error))
    }
  }, [error])

  const fetchOptions = useCallback((
    changedData?: Record<string, unknown>,
    context?: Record<string, unknown>
  ): void => {
    if (isUndefined(objectId) || isUndefined(fieldName)) {
      return
    }

    void trigger({
      body: {
        objectId,
        fieldName,
        changedData: changedData ?? {},
        context: context ?? {}
      }
    })
  }, [objectId, fieldName, trigger])

  return { options, isLoading: isFetching, fetchOptions }
}

/**
 * Grid-cell adapter for the SelectCellConfig.useOptionsHook signature. Fetches only in edit mode
 * (so display mode does not fire a request per visible row).
 */
export const useGridDynamicSelectOptions = (
  fieldName: string,
  context?: SelectOptionsHookContext
): { isLoading: boolean, options: SelectOptionType[] } => {
  const objectId = context?.objectId
  const enabled = context?.enabled === true
  const { options, isLoading, fetchOptions } = useDynamicSelectOptions(objectId, fieldName)

  useEffect(() => {
    if (enabled && !isUndefined(objectId)) {
      fetchOptions()
    }
  }, [enabled, objectId, fieldName, fetchOptions])

  return { isLoading, options: (options ?? []) as SelectOptionType[] }
}
