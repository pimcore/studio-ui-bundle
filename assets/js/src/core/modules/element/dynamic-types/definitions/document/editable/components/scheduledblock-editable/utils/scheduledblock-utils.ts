/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil, isArray } from 'lodash'
import { type ScheduledblockValue, type ScheduledblockEntry } from '../scheduledblock-editable'

/**
 * Utility functions for scheduledblock operations
 */
export const scheduledblockValueUtils = {
  /**
   * Filters editable names that belong to a specific scheduledblock and key
   */
  filterEditableNames: (allNames: string[], scheduledblockName: string, key: string): string[] => {
    const pattern = `${scheduledblockName}:${key}.`
    return allNames.filter(name => name.startsWith(pattern))
  },

  /**
   * Converts DOM elements to scheduledblock value format
   */
  elementsToScheduledblockValue: (elements: HTMLElement[]): ScheduledblockValue => {
    return elements.map(element => {
      const key = element.getAttribute('key')
      const dateStr = element.getAttribute('date')
      const date = dateStr !== null ? parseInt(dateStr, 10) : 0

      return {
        key: key ?? '0',
        date: date
      }
    }).filter(entry => !isNil(entry.key))
  },

  /**
   * Validates if value is a valid scheduledblock value
   */
  isValidScheduledblockValue: (value: any): value is ScheduledblockValue => {
    return isArray(value) && value.every(item =>
      typeof item === 'object' &&
      'key' in item &&
      'date' in item &&
      (typeof item.key === 'string' || typeof item.key === 'number') &&
      typeof item.date === 'number'
    )
  },

  /**
   * Gets timestamps for a specific date range
   */
  getTimestampsForDate: (entries: ScheduledblockEntry[], dateStart: number, dateEnd: number): ScheduledblockEntry[] => {
    return entries.filter(entry => entry.date >= dateStart && entry.date <= dateEnd)
  },

  /**
   * Gets the latest entry before a specific timestamp
   */
  getLatestPreviousEntry: (entries: ScheduledblockEntry[], timestamp: number): ScheduledblockEntry | null => {
    const previousEntries = entries.filter(entry => entry.date < timestamp)
    if (previousEntries.length === 0) return null

    return previousEntries.reduce((latest, current) => 
      current.date > latest.date ? current : latest
    )
  },

  /**
   * Sorts entries by date
   */
  sortByDate: (entries: ScheduledblockEntry[]): ScheduledblockEntry[] => {
    return [...entries].sort((a, b) => a.date - b.date)
  }
}

export { ScheduledblockManager } from './scheduledblock-manager'
