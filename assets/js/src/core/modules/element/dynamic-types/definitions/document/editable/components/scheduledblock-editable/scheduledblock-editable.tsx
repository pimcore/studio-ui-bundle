/**
 * Thiimport React, { useMemo, useCallback, useState, useEffect, useRef } from 'react'
import { isArray, isNil } from 'lodash'
import { DatePicker, Dropdown, Modal, Popover, Slider, TimePicker } from 'antd'ource file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo, useCallback, useState, useEffect } from 'react'
import { isArray, isNil } from 'lodash'
import { DatePicker } from 'antd'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useScheduledblockEditableStyles } from './scheduledblock-editable.styles'
import { useScheduledblockEditable } from './hooks/use-scheduledblock-editable'
import { ScheduledblockManager } from './utils/scheduledblock-manager'
import { scheduledblockValueUtils } from './utils/scheduledblock-utils'
import { TimestampDropdown } from './components/timestamp-dropdown/timestamp-dropdown'
import { Timeline } from './components/timeline/timeline'
import dayjs, { type Dayjs } from 'dayjs'
import { useTranslation } from 'react-i18next'
import { setScheduledblockOperation } from '../../types/dynamic-type-document-editable-scheduledblock'

export interface ScheduledblockEditableConfig {
  limit?: number
  class?: string
  reload?: boolean
}

export interface ScheduledblockEntry {
  key: string
  date: number
}

export type ScheduledblockValue = ScheduledblockEntry[]

export interface ScheduledblockEditableProps {
  value?: ScheduledblockValue
  onChange?: (value: ScheduledblockValue) => void
  config?: ScheduledblockEditableConfig
  className?: string
  editableName: string
  containerRef?: React.RefObject<HTMLDivElement>
  disabled?: boolean
  isInherited?: boolean
}

export const ScheduledblockEditable = ({
  value = [],
  onChange,
  config,
  className,
  editableName,
  containerRef,
  disabled = false,
  isInherited = false
}: ScheduledblockEditableProps): React.JSX.Element => {
  const { styles } = useScheduledblockEditableStyles()
  const { t } = useTranslation()

  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs())
  const [currentTimestamp, setCurrentTimestamp] = useState<number | null>(null)

  const setScheduledblockOperationType = useCallback((operationType: 'modify' | 'add' | 'delete' | null) => {
    setScheduledblockOperation(editableName, operationType)
  }, [editableName])

  const scheduledblockManager = useMemo(() => {
    return new ScheduledblockManager(editableName, containerRef)
  }, [editableName, containerRef])

  const {
    addBlock,
    removeBlock,
    activeElement,
    showElementByKey,
    hideAllElements,
    cleanupTimestamps
  } = useScheduledblockEditable({
    scheduledblockManager,
    value,
    onChange,
    config,
    disabled
  })

  const loadTimestampsForDate = useCallback((date: Dayjs) => {
    const dateStart = date.startOf('day').unix()
    const dateEnd = date.endOf('day').unix()

    const validEntries = isArray(value) ? value : []
    const dayEntries = scheduledblockValueUtils.getTimestampsForDate(validEntries, dateStart, dateEnd)

    const isCurrentTimestampOnThisDay = currentTimestamp && 
      currentTimestamp >= dateStart && 
      currentTimestamp <= dateEnd

    if (isCurrentTimestampOnThisDay) {
      return
    }

    if (dayEntries.length > 0) {
      const firstEntry = dayEntries[0]
      showElementByKey(firstEntry.key)
      setCurrentTimestamp(firstEntry.date)
    } else {
      const latestPrevious = scheduledblockValueUtils.getLatestPreviousEntry(validEntries, dateStart)
      if (latestPrevious) {
        showElementByKey(latestPrevious.key)
        setCurrentTimestamp(latestPrevious.date)
      } else {
        hideAllElements()
        setCurrentTimestamp(null)
      }
    }
  }, [value, currentTimestamp, showElementByKey, hideAllElements])

  const handleDateChange = useCallback((date: Dayjs | null) => {
    if (isNil(date)) return
    setSelectedDate(date)
  }, [])

  const handleModifyEntry = useCallback((entryKey: string, newTimestamp: number) => {
    if (disabled) return

    setScheduledblockOperationType('modify')
    const validEntries = isArray(value) ? value : []
    const updatedEntries = validEntries.map(entry => 
      entry.key === entryKey 
        ? { ...entry, date: newTimestamp }
        : entry
    )

    onChange?.(updatedEntries)
    
    const element = scheduledblockManager.findElementByKey(entryKey)
    if (element) {
      scheduledblockManager.setElementDate(element, newTimestamp)
    }
  }, [disabled, value, onChange, scheduledblockManager, setScheduledblockOperationType])

  const handleModifyDateChange = useCallback((entryKey: string, newDateTime: Dayjs | null) => {
    if (newDateTime) {
      const validEntries = isArray(value) ? value : []
      const entry = validEntries.find(e => e.key === entryKey)
      
      if (entry) {
        const newTimestamp = newDateTime.unix()
        const oldTimestamp = entry.date
        const entryDate = dayjs.unix(oldTimestamp)
        const dayChanged = !entryDate.isSame(newDateTime, 'day')
        
        handleModifyEntry(entryKey, newTimestamp)
        
        if (dayChanged) {
          setTimeout(() => {
            setSelectedDate(newDateTime)
            setCurrentTimestamp(newTimestamp)
            showElementByKey(entryKey)
          }, 0)
        } else {
          loadTimestampsForDate(selectedDate)
          setCurrentTimestamp(newTimestamp)
          showElementByKey(entryKey)
        }
      }
    }
  }, [value, handleModifyEntry, loadTimestampsForDate, showElementByKey, selectedDate])

  const handleSliderChange = useCallback((sliderValue: number) => {
    const dateStart = selectedDate.startOf('day').unix()
    const timestamp = dateStart + sliderValue
    
    const validEntries = isArray(value) ? value : []
    const dayEntries = scheduledblockValueUtils.getTimestampsForDate(
      validEntries, 
      dateStart, 
      selectedDate.endOf('day').unix()
    )

    const closestEntry = dayEntries.reduce((closest, entry) => {
      const closestDiff = Math.abs(closest.date - timestamp)
      const entryDiff = Math.abs(entry.date - timestamp)
      return entryDiff < closestDiff ? entry : closest
    }, dayEntries[0])

    if (closestEntry) {
      showElementByKey(closestEntry.key)
      setCurrentTimestamp(closestEntry.date)
    }
  }, [selectedDate, value, showElementByKey])

  const handleAddBlock = useCallback(() => {
    setScheduledblockOperationType('add')
    const newDate = selectedDate.toDate()
    addBlock(newDate)
  }, [selectedDate, addBlock, setScheduledblockOperationType])

  const handleDeleteEntry = useCallback((entryKey: string) => {
    if (disabled) return

    setScheduledblockOperationType('delete')
    const validEntries = isArray(value) ? value : []
    const entryToDelete = validEntries.find(entry => entry.key === entryKey)
    
    if (entryToDelete) {
      const element = scheduledblockManager.findElementByKey(entryKey)
      if (element) {
        removeBlock(element)
      }

      const updatedEntries = validEntries.filter(entry => entry.key !== entryKey)
      onChange?.(updatedEntries)

      if (currentTimestamp === entryToDelete.date) {
        setCurrentTimestamp(null)
        hideAllElements()
      }
    }
  }, [disabled, value, onChange, scheduledblockManager, removeBlock, currentTimestamp, hideAllElements, setScheduledblockOperationType])

  const handleJumpToEntry = useCallback((entryDate: Dayjs, entryKey: string) => {
    setSelectedDate(entryDate)
    setCurrentTimestamp(entryDate.unix())
    showElementByKey(entryKey)
  }, [showElementByKey])

  useEffect(() => {
    loadTimestampsForDate(selectedDate)
  }, [selectedDate, loadTimestampsForDate])

  return (
    <div className={ `${styles.scheduledblockContainer} ${className ?? ''}` }>
      <div className={ styles.controlsContainer }>
        <div className={ styles.datePickerContainer }>
          <DatePicker
            disabled={ disabled }
            onChange={ handleDateChange }
            value={ selectedDate }
          />
        </div>

        <Timeline
          value={value}
          selectedDate={selectedDate}
          currentTimestamp={currentTimestamp}
          disabled={disabled}
          onSliderChange={handleSliderChange}
          onModifyDateChange={handleModifyDateChange}
          onEntryClick={(clickedEntry) => {
            showElementByKey(clickedEntry.key)
            setCurrentTimestamp(clickedEntry.date)
          }}
          onDeleteEntry={handleDeleteEntry}
        />

        <div className={ styles.buttonsContainer }>
          <IconButton
            disabled={ disabled }
            icon={{ value: 'plus' }}
            onClick={ handleAddBlock }
            title={ t('add-scheduled-block') }
          />

          <TimestampDropdown
            value={value}
            disabled={disabled}
            onJumpToEntry={handleJumpToEntry}
            onCleanupTimestamps={cleanupTimestamps}
          />
        </div>
      </div>
    </div>
  )
}
