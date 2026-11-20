/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { isNil, isUndefined, sumBy } from 'lodash'
import {
  api,
  type DataObjectGetVisibleFieldValuesForRelationApiArg,
  type GridColumnData,
  type RelationVisibleFieldValues
} from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { type ManyToManyRelationValue } from '@Pimcore/components/many-to-many-relation'
import { getTypedVisibleFieldsKey } from '@Pimcore/components/many-to-many-relation/utils/visible-fields-key'
import { useAppDispatch, useAppSelector } from '@Pimcore/app/store'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import {
  VISIBLE_FIELDS_CHUNK_SIZE,
  VISIBLE_FIELDS_FIRST_CHUNK_SIZE,
  VISIBLE_FIELDS_MAX_PARALLEL
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-object-relation/utils/grid-chunks'
import { buildRelationVisibleFieldChunks } from '../utils/relation-visible-field-chunks'

interface UseRelationVisibleFieldValuesProps {
  /** Requests nothing while false, e.g. before the columns are known or when there are none. */
  enabled: boolean
  classId?: string
  relationField?: string
  locale: string | null
  dataValue?: ManyToManyRelationValue | null
}

export interface UseRelationVisibleFieldValuesReturn {
  isLoading: boolean
  isError: boolean
  /** The loaded values per related element, keyed by "type:id". */
  valuesByElement: Map<string, GridColumnData[]>
  // Related elements of the requests that have their visible field values, out of all related elements to load.
  loadedCount: number
  totalCount: number
  refetchAll: () => void
}

type ValuesSubscription = ReturnType<ReturnType<typeof api.endpoints.dataObjectGetVisibleFieldValuesForRelation.initiate>>
// The app's RootState does not type the API slice it combines, the endpoint selectors expect it.
type ValuesQueryState = Parameters<ReturnType<typeof api.endpoints.dataObjectGetVisibleFieldValuesForRelation.select>>[0]

interface ChunkRequest {
  key: string
  args: DataObjectGetVisibleFieldValuesForRelationApiArg
  elementKeys: string[]
}

const getItemKey = (item: RelationVisibleFieldValues): string => getTypedVisibleFieldsKey(item.type, item.id)

/**
 * Loads the visible field values of the rows of a many-to-many relation or advanced many-to-many relation, a
 * page of rows per request, in relation order and with only a few requests at the same time - the same
 * queue the object relation types use for their grids.
 */
export const useRelationVisibleFieldValues = ({ enabled, classId, relationField, locale, dataValue }: UseRelationVisibleFieldValuesProps): UseRelationVisibleFieldValuesReturn => {
  const dispatch = useAppDispatch()

  const chunkRequests = useMemo<ChunkRequest[]>(() => {
    if (!enabled || isUndefined(classId) || isUndefined(relationField)) {
      return []
    }

    return buildRelationVisibleFieldChunks(dataValue, VISIBLE_FIELDS_CHUNK_SIZE, VISIBLE_FIELDS_FIRST_CHUNK_SIZE).map((elements) => {
      const args: DataObjectGetVisibleFieldValuesForRelationApiArg = {
        relationVisibleFieldValuesRequest: { classId, relationField, locale, elements }
      }

      return {
        key: JSON.stringify(args),
        args,
        elementKeys: elements.map((element) => getTypedVisibleFieldsKey(element.type, element.id))
      }
    })
  }, [enabled, classId, relationField, locale, dataValue])

  // Unchanged chunks keep their requests and selectors, e.g. when a related element is appended.
  const requestsKey = JSON.stringify(chunkRequests.map(request => request.key))
  const requests = useMemo(() => chunkRequests, [requestsKey])

  // One selector per request, created once: a selector created on every render returns a new result every time.
  const selectors = useMemo(() => requests.map(request => api.endpoints.dataObjectGetVisibleFieldValuesForRelation.select(request.args)), [requests])
  const results = useAppSelector(state => selectors.map(select => select(state as ValuesQueryState)), shallowEqual)

  const subscriptions = useRef(new Map<string, ValuesSubscription>())
  // Changes when refetchAll() released the subscriptions, so the queue requests the chunks again.
  const [refetchRound, setRefetchRound] = useState(0)

  const isSettled = (index: number): boolean => results[index].isSuccess || results[index].isError
  // Includes the request id: a refetch can settle before its pending state is rendered, the settled flags alone stay the same then.
  const settledKey = results.map((result, index) => isSettled(index) ? `1${result.requestId ?? ''}` : '0').join(',')

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

      subscriptions.current.set(request.key, dispatch(api.endpoints.dataObjectGetVisibleFieldValuesForRelation.initiate(request.args, { forceRefetch: true })))
      running++
    })
  }, [requests, settledKey, refetchRound])

  useEffect(() => () => {
    subscriptions.current.forEach(subscription => { subscription.unsubscribe() })
    subscriptions.current.clear()
  }, [])

  // A refetch of data already shown (e.g. after a data object save invalidated the grids) runs in the background.
  const isLoading = results.some(result => isUndefined(result.data) && !result.isError)
  const isError = results.some(result => result.isError)
  const totalCount = sumBy(requests, request => request.elementKeys.length)

  // The last loaded values of each related element are kept until its request returns again, wherever the
  // request boundaries moved to (a row added or removed before it). Values of another language or field
  // are never kept.
  const contextKey = JSON.stringify([classId ?? null, relationField ?? null, locale])
  const previousValues = useRef<{ contextKey: string, byElement: Map<string, GridColumnData[]> }>({ contextKey, byElement: new Map() })
  useEffect(() => {
    if (previousValues.current.contextKey !== contextKey) {
      previousValues.current = { contextKey, byElement: new Map() }
    }
    const relationKeys = new Set(requests.flatMap(request => request.elementKeys))
    previousValues.current.byElement.forEach((_, key) => {
      if (!relationKeys.has(key)) {
        previousValues.current.byElement.delete(key)
      }
    })
    results.forEach(result => {
      result.data?.items.forEach(item => {
        previousValues.current.byElement.set(getItemKey(item), item.columns)
      })
    })
  }, [results, requests, contextKey])

  const { valuesByElement, loadedCount } = useMemo(() => {
    // Safe: the ref is only written in the effect above, after a render, and a render with the same inputs reads the same value.
    const kept = previousValues.current.contextKey === contextKey ? previousValues.current.byElement : new Map<string, GridColumnData[]>()
    const values = new Map<string, GridColumnData[]>()
    let loaded = 0

    results.forEach((result, index) => {
      if (!isUndefined(result.data)) {
        result.data.items.forEach(item => values.set(getItemKey(item), item.columns))
        loaded += requests[index].elementKeys.length

        return
      }

      requests[index].elementKeys.forEach(key => {
        const keptColumns = kept.get(key)
        if (!isUndefined(keptColumns) && !values.has(key)) {
          values.set(key, keptColumns)
          loaded++
        }
      })
    })

    return { valuesByElement: values, loadedCount: loaded }
  }, [results, requests, contextKey])

  // Every request is tracked once on failure, also when another one failed before.
  const trackedErrors = useRef(new WeakSet<object>())
  useEffect(() => {
    results.forEach(result => {
      if (result.isError && !isNil(result.error) && !trackedErrors.current.has(result.error)) {
        trackedErrors.current.add(result.error)
        trackError(new ApiError(result.error))
      }
    })
  }, [results])

  const refetchAll = (): void => {
    subscriptions.current.forEach(subscription => { subscription.unsubscribe() })
    subscriptions.current.clear()
    setRefetchRound(round => round + 1)
  }

  return { isLoading, isError, valuesByElement, loadedCount, totalCount, refetchAll }
}
