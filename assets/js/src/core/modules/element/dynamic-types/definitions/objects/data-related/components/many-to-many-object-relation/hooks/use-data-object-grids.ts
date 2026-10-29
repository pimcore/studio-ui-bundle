/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useMemo, useRef } from 'react'
import { shallowEqual } from 'react-redux'
import { isEmpty, isNil, isUndefined, sumBy } from 'lodash'
import {
  api,
  type DataObjectGetGridApiArg,
  type DataObjectGetGridApiResponse,
  type GridColumnRequest
} from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { type ManyToManyRelationValue } from '@Pimcore/components/many-to-many-relation'
import { type UseClassDefinitionsReturn } from '@Pimcore/modules/data-object/utils/provider/class-defintions/use-class-definitions'
import { useAppDispatch, useAppSelector } from '@Pimcore/app/store'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import {
  buildGridChunks,
  VISIBLE_FIELDS_CHUNK_SIZE,
  VISIBLE_FIELDS_MAX_PARALLEL
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-object-relation/utils/grid-chunks'

interface IUseDataObjectGridsProps {
  classIds?: string[]
  convertClassName: UseClassDefinitionsReturn['getByName']
  columns?: GridColumnRequest[]
  applyFallbackLanguages?: boolean
  dataValue?: ManyToManyRelationValue | null
}

export interface IUseDataObjectGridsReturn {
  isLoading: boolean
  isError: boolean
  data: DataObjectGetGridApiResponse['items']
  // Related objects of the chunks that have their visible field values, out of all related objects to load.
  loadedCount: number
  totalCount: number
  refetchAll: () => void
}

type GridSubscription = ReturnType<ReturnType<typeof api.endpoints.dataObjectGetGrid.initiate>>
// The app's RootState does not type the API slice it combines, the endpoint selectors expect it.
type GridQueryState = Parameters<ReturnType<typeof api.endpoints.dataObjectGetGrid.select>>[0]

interface ChunkRequest {
  key: string
  args: DataObjectGetGridApiArg
  size: number
}

export const useDataObjectGrids = ({ classIds, convertClassName, columns, applyFallbackLanguages, dataValue }: IUseDataObjectGridsProps): IUseDataObjectGridsReturn => {
  const dispatch = useAppDispatch()

  const chunkRequests = useMemo<ChunkRequest[]>(() => {
    if (isEmpty(columns)) {
      return []
    }

    return buildGridChunks(dataValue, classIds ?? [], VISIBLE_FIELDS_CHUNK_SIZE).map(({ classId, ids }) => {
      const args: DataObjectGetGridApiArg = {
        classId: convertClassName(classId)?.id ?? '',
        body: {
          folderId: 1,
          applyFallbackLanguages,
          columns,
          filters: {
            page: 1,
            pageSize: ids.length,
            includeDescendants: true,
            columnFilters: [
              {
                type: 'system.ids',
                filterValue: ids
              }
            ]
          }
        }
      }

      return { key: JSON.stringify(args), args, size: ids.length }
    })
  }, [dataValue, classIds, columns, applyFallbackLanguages, convertClassName])

  // Unchanged chunks keep their requests and selectors, e.g. when a related object is appended.
  const requestsKey = JSON.stringify(chunkRequests.map(request => request.key))
  const requests = useMemo(() => chunkRequests, [requestsKey])

  // One selector per request, created once: a selector created on every render returns a new result every time.
  const selectors = useMemo(() => requests.map(request => api.endpoints.dataObjectGetGrid.select(request.args)), [requests])
  const results = useAppSelector(state => selectors.map(select => select(state as GridQueryState)), shallowEqual)

  const subscriptions = useRef(new Map<string, GridSubscription>())

  const isSettled = (index: number): boolean => results[index].isSuccess || results[index].isError
  const settledKey = results.map((_, index) => isSettled(index) ? '1' : '0').join('')

  // The chunks are requested in relation order with only a few requests running at the same time,
  // so the rows on top of the relation get their values first.
  useEffect(() => {
    const neededKeys = new Set(requests.map(request => request.key))
    subscriptions.current.forEach((subscription, key) => {
      if (!neededKeys.has(key)) {
        subscription.unsubscribe()
        subscriptions.current.delete(key)
      }
    })

    let running = requests.filter((request, index) => subscriptions.current.has(request.key) && !isSettled(index)).length
    requests.forEach(request => {
      if (running >= VISIBLE_FIELDS_MAX_PARALLEL || subscriptions.current.has(request.key)) {
        return
      }

      subscriptions.current.set(request.key, dispatch(api.endpoints.dataObjectGetGrid.initiate(request.args, { forceRefetch: true })))
      running++
    })
  }, [requests, settledKey])

  useEffect(() => () => {
    subscriptions.current.forEach(subscription => { subscription.unsubscribe() })
    subscriptions.current.clear()
  }, [])

  // A refetch of data already shown (e.g. after any data object save invalidated the grids) runs in the background.
  const isLoading = results.some(result => isUndefined(result.data) && !result.isError)
  const isError = results.some(result => result.isError)
  const loadedCount = requests.reduce((count, request, index) => isUndefined(results[index].data) ? count : count + request.size, 0)
  const totalCount = sumBy(requests, 'size')

  // Every chunk has its own request; each failure is tracked once, also when another chunk failed before.
  const trackedErrors = useRef(new WeakSet<object>())
  useEffect(() => {
    results.forEach(result => {
      if (result.isError && !isNil(result.error) && !trackedErrors.current.has(result.error)) {
        trackedErrors.current.add(result.error)
        trackError(new ApiError(result.error))
      }
    })
  }, [results])

  const data = useMemo(() => results.flatMap(result => result.data?.items ?? []), [results])
  const refetchAll = (): void => { subscriptions.current.forEach(subscription => { void subscription.refetch() }) }

  return { isLoading, isError, data, loadedCount, totalCount, refetchAll }
}
