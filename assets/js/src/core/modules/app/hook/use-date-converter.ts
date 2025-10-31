/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback } from 'react'
import { useSettings } from '@sdk/modules/app'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'

// Extend dayjs with timezone support
dayjs.extend(utc)
dayjs.extend(timezone)

interface UseDateConverterResult {
  convertToTimestamp: (dateString: string, asMilliseconds?: boolean, respectServerTimezone?: boolean) => number | null
}

export const useDateConverter = (): UseDateConverterResult => {
  const { timezone } = useSettings()

  const convertToTimestamp = useCallback((dateString: string, asMilliseconds: boolean = false, respectServerTimezone: boolean = true): number | null => {
    if (!isNonEmptyString(dateString)) {
      return null
    }
    try {
      let dayjsDate: dayjs.Dayjs

      if (respectServerTimezone && isNonEmptyString(timezone)) {
        dayjsDate = dayjs.tz(dateString, timezone)
      } else {
        dayjsDate = dayjs(dateString)
      }

      return asMilliseconds ? dayjsDate.valueOf() : dayjsDate.unix()
    } catch (error) {
      console.error('Failed to convert date string to timestamp:', error)
      return null
    }
  }, [timezone])

  return {
    convertToTimestamp
  }
}
