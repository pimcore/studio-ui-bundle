/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useRef, useState } from 'react'
import { isBoolean } from 'lodash'
import { useAppDispatch } from '@sdk/app'
import { api as elementApi } from '@Pimcore/modules/element/element-api-slice.gen'
import { mapToElementType } from '@Pimcore/modules/element/utils/element-type'
import { getPublishedStateKey, type PublishedStateReference, type PublishedStates } from './published-state'

const MAX_CONCURRENT_LOOKUPS = 4

/**
 * Core does not send the published state of the elements in document relation editables, so it is
 * asked for per element. Only documents and data objects have a published state, and elements that
 * already carry one are not looked up. A failed lookup (e.g. no view permission) leaves the state
 * unknown (null) so nothing is marked as unpublished.
 */
export const useElementPublishedStates = (references: PublishedStateReference[]): PublishedStates => {
  const dispatch = useAppDispatch()
  const [states, setStates] = useState<PublishedStates>({})
  const requested = useRef<Set<string>>(new Set())

  const lookups = references.flatMap((reference) => {
    const key = getPublishedStateKey(reference)
    const elementType = mapToElementType(reference.type)

    if (key === null || elementType === null || elementType === 'asset' || isBoolean(reference.isPublished)) {
      return []
    }

    return [{ key, elementType, id: reference.id }]
  })
  const lookupSignature = lookups.map(({ key }) => key).join(',')

  useEffect(() => {
    const pending = lookups.filter(({ key }) => !requested.current.has(key))
    pending.forEach(({ key }) => requested.current.add(key))

    if (pending.length === 0) {
      return
    }

    const queue = [...pending]

    const lookupNext = async (): Promise<void> => {
      const lookup = queue.shift()

      if (lookup === undefined) {
        return
      }

      let isPublished: boolean | null = null

      try {
        const result = await dispatch(elementApi.endpoints.elementGetPublishedState.initiate(
          { elementType: lookup.elementType, id: lookup.id },
          { subscribe: false }
        )).unwrap()
        isPublished = result.isPublished
      } catch {
        isPublished = null
      }

      setStates((current) => ({ ...current, [lookup.key]: isPublished }))

      await lookupNext()
    }

    for (let worker = 0; worker < Math.min(MAX_CONCURRENT_LOOKUPS, pending.length); worker++) {
      void lookupNext()
    }
  }, [lookupSignature])

  return states
}
