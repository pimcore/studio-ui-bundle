/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useState, useRef, useCallback, useEffect } from 'react'
import { isEqual } from 'lodash'

export interface UseControlledStateReturn<T> {
  /** Current local state value */
  value: T
  /** Update value and notify parent via onChange. Use this for all internal changes. */
  handleChange: (newValue: T) => void
}

/**
 * Manages local state that stays in sync with a controlled `propValue` from a parent,
 * while preventing echo loops caused by debounced or asynchronous onChange callbacks.
 *
 * Problem it solves:
 * When a component owns local state and emits changes via `onChange`, the parent may
 * feed the value back through props after a delay (e.g. debounced forms). Without
 * protection, stale echoed values overwrite the user's current input.
 *
 * How it works:
 * - Tracks the last value emitted via `onChange` in a ref.
 * - When `propValue` changes, compares it against the last emitted value.
 * - If they match, it's an echo — ignored.
 * - If they differ, it's a genuine external update — synced to local state.
 *
 * @param propValue - The controlled value from props
 * @param onChange - Callback to notify the parent of changes
 */
export function useControlledState<T> (
  propValue: T,
  onChange?: (value: T) => void
): UseControlledStateReturn<T> {
  const [value, setValue] = useState<T>(propValue)
  const lastEmittedValue = useRef<T>(propValue)

  useEffect(() => {
    if (!isEqual(propValue, lastEmittedValue.current) && !isEqual(propValue, value)) {
      setValue(propValue)
      lastEmittedValue.current = propValue
    }
  }, [propValue, value])

  const handleChange = useCallback((newValue: T) => {
    lastEmittedValue.current = newValue
    setValue(newValue)
    onChange?.(newValue)
  }, [onChange])

  return { value, handleChange }
}
