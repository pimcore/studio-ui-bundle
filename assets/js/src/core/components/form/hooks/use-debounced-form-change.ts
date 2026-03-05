/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useRef, useEffect, useMemo, useLayoutEffect } from 'react'
import { debounce, isNil, isEmpty } from 'lodash'
import { uuid } from '@Pimcore/utils/uuid'
import { useInjection } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DebouncedFormRegistry } from '../services/debounced-form-registry'
import { useDebouncedFormContext } from '../providers/debounced-form-provider'

export interface UseDebouncedFormChangeOptions {
  /**
   * If true, debouncing is disabled and the original callback is returned unchanged.
   */
  disabled?: boolean
  delay?: number
  /**
   * Field names that bypass debouncing and fire onChange immediately.
   */
  immediateFields?: string[]
  /**
   * Tag for registry coordination. Gets auto-resolved from DebouncedFormProvider if omitted.
   */
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
  const { disabled = false, delay = 300, immediateFields = [] } = options
  const resolvedTag = useDebouncedFormContext(options.tag)
  const registry = useInjection<DebouncedFormRegistry>(serviceIds.debouncedFormRegistry)

  const registryKey = useMemo(() => `${resolvedTag ?? 'default'}-${uuid()}`, [resolvedTag])

  const onFormChangeRef = useRef(onFormChange)
  useLayoutEffect(() => { onFormChangeRef.current = onFormChange }, [onFormChange])

  const debouncedChangeRef = useRef(
    debounce((changedValues: Record<string, any>, allValues: Record<string, any>) => {
      onFormChangeRef.current(changedValues, allValues)
    }, delay)
  )

  const handleFormChange = useCallback((changedValues: Record<string, any>, allValues: Record<string, any>) => {
    if (disabled) {
      onFormChange(changedValues, allValues)
      return
    }

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
    if (!isNil(resolvedTag) && !isEmpty(resolvedTag)) {
      registry.register(registryKey, flush, resolvedTag)
      return () => {
        registry.unregister(registryKey)
      }
    }
  }, [registry, registryKey, flush, resolvedTag])

  return {
    handleFormChange,
    flush
  }
}
