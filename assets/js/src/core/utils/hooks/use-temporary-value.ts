/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { isNull } from 'lodash'
import { motionDuration } from '@Pimcore/utils/motion'

/**
 * Holds a value for a short moment and resets it to null afterwards, e.g. to show which action
 * was just confirmed. Setting a value again restarts the timer, clearing resets it right away.
 */
export const useTemporaryValue = <T>(duration: number = motionDuration.confirmation): [T | null, (value: T) => void, () => void] => {
  const [value, setValue] = useState<T | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (!isNull(timeoutRef.current)) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  const show = useCallback((nextValue: T): void => {
    if (!isNull(timeoutRef.current)) {
      clearTimeout(timeoutRef.current)
    }

    setValue(nextValue)

    timeoutRef.current = setTimeout(() => {
      setValue(null)
      timeoutRef.current = null
    }, duration)
  }, [duration])

  const clear = useCallback((): void => {
    if (!isNull(timeoutRef.current)) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    setValue(null)
  }, [])

  return [value, show, clear]
}
