/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useRef, useEffect, useMemo } from 'react'
import { debounce, isNil, isEmpty } from 'lodash'
import { uuid } from '@Pimcore/utils/uuid'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DebouncedFormRegistry } from '../services/debounced-form-registry'

export interface UseDebouncedFormChangeOptions {
  delay?: number
  immediateFields?: string[]
  tag?: string
}

export interface UseDebouncedFormChangeReturn {
  handleFormChange: (changedValues: Record<string, any>, allValues: Record<string, any>) => void
  flush: () => void
}

export const useDebouncedFormChange = (
  onFormChange: (changedValues: Record<string, any>, allValues: Record<string, any>) => void,
  options: UseDebouncedFormChangeOptions = {}
): UseDebouncedFormChangeReturn => {
  const { delay = 300, immediateFields = [], tag } = options

  const registryKey = useMemo(() => `${tag ?? 'default'}-${uuid()}`, [tag])

  const debouncedChangeRef = useRef(
    debounce((changedValues: Record<string, any>, allValues: Record<string, any>) => {
      onFormChange(changedValues, allValues)
    }, delay)
  )

  const handleFormChange = useCallback((changedValues: Record<string, any>, allValues: Record<string, any>) => {
    const immediateChanges: Record<string, any> = {}
    const debouncedChanges: Record<string, any> = {}

    Object.entries(changedValues).forEach(([key, value]) => {
      if (immediateFields.includes(key)) {
        immediateChanges[key] = value
      } else {
        debouncedChanges[key] = value
      }
    })

    if (Object.keys(immediateChanges).length > 0) {
      onFormChange(immediateChanges, allValues)
    }

    if (Object.keys(debouncedChanges).length > 0) {
      debouncedChangeRef.current(debouncedChanges, allValues)
    }
  }, [onFormChange, immediateFields])

  const flush = useCallback(() => {
    debouncedChangeRef.current.flush()
  }, [])

  useEffect(() => {
    if (!isNil(tag) && !isEmpty(tag)) {
      const registry = container.get<DebouncedFormRegistry>(serviceIds.debouncedFormRegistry)
      registry.register(registryKey, flush, tag)
      return () => {
        registry.unregister(registryKey)
      }
    }
  }, [registryKey, flush, tag])

  return {
    handleFormChange,
    flush
  }
}
