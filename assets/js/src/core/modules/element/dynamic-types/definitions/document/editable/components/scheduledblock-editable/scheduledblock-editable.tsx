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
import { DatePicker, Dropdown, Modal, Slider } from 'antd'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { DynamicEditablesRenderer } from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/edit/components/editables-renderer/dynamic-editables-renderer'
import { useScheduledblockEditableStyles } from './scheduledblock-editable.styles'
import { useScheduledblockEditable } from './hooks/use-scheduledblock-editable'
import { ScheduledblockManager } from './utils/scheduledblock-manager'
import { scheduledblockValueUtils } from './utils/scheduledblock-utils'
import { TimelineMarker } from './components/timeline-marker/timeline-marker'
import dayjs, { type Dayjs } from 'dayjs'
import { useTranslation } from 'react-i18next'
import { setScheduledblockOperation } from '../../types/dynamic-type-document-editable-scheduledblock'

// Constants
const SLIDER_RANGE: [number, number] = [0, 86400] // 24 hours in seconds

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
  const [sliderMarks, setSliderMarks] = useState<Record<number, string>>({})

  // Track operation type for reloadOnChange decision
  const setScheduledblockOperationType = useCallback((operationType: 'modify' | 'add' | 'delete' | null) => {
    setScheduledblockOperation(editableName, operationType)
  }, [editableName])

  const scheduledblockManager = useMemo(() => {
    return new ScheduledblockManager(editableName, containerRef)
  }, [editableName, containerRef])

  const {
    dynamicEditables,
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

  // Convert timestamp to percentage for slider
  const timestampToSliderValue = useCallback((timestamp: number, dateStart: number): number => {
    return timestamp - dateStart
  }, [])

  // Convert slider value to timestamp
  const sliderValueToTimestamp = useCallback((sliderValue: number, dateStart: number): number => {
    return dateStart + sliderValue
  }, [])

  // Format time for display
  const formatTime = useCallback((timestamp: number): string => {
    return dayjs.unix(timestamp).format('HH:mm')
  }, [])

  // Format date and time for dropdown labels
  const formatDateTime = useCallback((timestamp: number): string => {
    return dayjs.unix(timestamp).format('YYYY-MM-DD HH:mm')
  }, [])

  // Load timestamps for selected date
  const loadTimestampsForDate = useCallback((date: Dayjs) => {
    const dateStart = date.startOf('day').unix()
    const dateEnd = date.endOf('day').unix()

    const validEntries = isArray(value) ? value : []
    const dayEntries = scheduledblockValueUtils.getTimestampsForDate(validEntries, dateStart, dateEnd)

    // Create slider marks for timestamps on this day
    const marks: Record<number, string> = {}
    dayEntries.forEach(entry => {
      const sliderValue = timestampToSliderValue(entry.date, dateStart)
      marks[sliderValue] = formatTime(entry.date)
    })

    setSliderMarks(marks)

    // Only auto-select if current timestamp is NOT within this day
    const isCurrentTimestampOnThisDay = currentTimestamp && 
      currentTimestamp >= dateStart && 
      currentTimestamp <= dateEnd

    if (isCurrentTimestampOnThisDay) {
      // Current entry is on this day - keep it active, no auto-selection
      return
    }

    // Current entry is not on this day - auto-select an appropriate entry
    if (dayEntries.length > 0) {
      const firstEntry = dayEntries[0]
      showElementByKey(firstEntry.key)
      setCurrentTimestamp(firstEntry.date)
    } else {
      // Show latest previous element if no elements on this day
      const latestPrevious = scheduledblockValueUtils.getLatestPreviousEntry(validEntries, dateStart)
      if (latestPrevious) {
        showElementByKey(latestPrevious.key)
        setCurrentTimestamp(latestPrevious.date)
      } else {
        hideAllElements()
        setCurrentTimestamp(null)
      }
    }
  }, [value, currentTimestamp, timestampToSliderValue, formatTime, showElementByKey, hideAllElements])

  // Handle date change
  const handleDateChange = useCallback((date: Dayjs | null) => {
    if (isNil(date)) return
    setSelectedDate(date)
    // Don't call loadTimestampsForDate here - let the useEffect handle it
  }, [])

  // Handle modify entry time (via popover)
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
    
    // Update the DOM element's date attribute
    const element = scheduledblockManager.findElementByKey(entryKey)
    if (element) {
      scheduledblockManager.setElementDate(element, newTimestamp)
    }
  }, [disabled, value, onChange, scheduledblockManager, setScheduledblockOperationType])

  // Open modify popover
  // Handle modify confirm via DatePicker change
  const handleModifyDateChange = useCallback((entryKey: string, newDateTime: Dayjs | null) => {
    if (newDateTime) {
      const validEntries = isArray(value) ? value : []
      const entry = validEntries.find(e => e.key === entryKey)
      
      if (entry) {
        const newTimestamp = newDateTime.unix()
        const oldTimestamp = entry.date
        const entryDate = dayjs.unix(oldTimestamp)
        const dayChanged = !entryDate.isSame(newDateTime, 'day')
        
        // Apply the modification
        handleModifyEntry(entryKey, newTimestamp)
        
        if (dayChanged) {
          // Day changed - jump to the new day
          setTimeout(() => {
            setSelectedDate(newDateTime)
            setCurrentTimestamp(newTimestamp)
            showElementByKey(entryKey)
          }, 0)
        } else {
          // Same day - refresh timeline
          loadTimestampsForDate(selectedDate)
          setCurrentTimestamp(newTimestamp)
          showElementByKey(entryKey)
        }
      }
    }
  }, [value, handleModifyEntry, loadTimestampsForDate, showElementByKey, selectedDate])

  // Handle slider change
  const handleSliderChange = useCallback((sliderValue: number) => {
    const dateStart = selectedDate.startOf('day').unix()
    const timestamp = sliderValueToTimestamp(sliderValue, dateStart)
    
    // Find the entry closest to this timestamp
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
  }, [selectedDate, sliderValueToTimestamp, value, showElementByKey])

  // Handle add block
  const handleAddBlock = useCallback(() => {
    setScheduledblockOperationType('add')
    const newDate = selectedDate.toDate()
    addBlock(newDate)
  }, [selectedDate, addBlock, setScheduledblockOperationType])

  // Handle delete entry
  const handleDeleteEntry = useCallback((entryKey: string) => {
    if (disabled) return

    setScheduledblockOperationType('delete')
    const validEntries = isArray(value) ? value : []
    const entryToDelete = validEntries.find(entry => entry.key === entryKey)
    
    if (entryToDelete) {
      // Find the DOM element and remove it
      const element = scheduledblockManager.findElementByKey(entryKey)
      if (element) {
        removeBlock(element)
      }

      // Update the value array
      const updatedEntries = validEntries.filter(entry => entry.key !== entryKey)
      onChange?.(updatedEntries)

      // If this was the current entry, hide all elements
      if (currentTimestamp === entryToDelete.date) {
        setCurrentTimestamp(null)
        hideAllElements()
      }
    }
  }, [disabled, value, onChange, scheduledblockManager, removeBlock, currentTimestamp, hideAllElements, setScheduledblockOperationType])

  // Create dropdown menu items
  const getDropdownItems = useCallback(() => {
    const validEntries = isArray(value) ? value : []
    const sortedEntries = scheduledblockValueUtils.sortByDate(validEntries)

    const jumpItems = sortedEntries.map(entry => ({
      key: `jump-${entry.key}`,
      label: formatDateTime(entry.date),
      onClick: () => {
        const entryDate = dayjs.unix(entry.date)
        setSelectedDate(entryDate)
        setCurrentTimestamp(entry.date)
        showElementByKey(entry.key)
      }
    }))

    if (jumpItems.length > 0) {
      jumpItems.push({ type: 'divider', key: 'divider' } as any)
    }

    return [
      ...jumpItems,
      {
        key: 'delete-past',
        label: t('scheduled-block-delete-all-in-past'),
        danger: true,
        onClick: () => {
          Modal.confirm({
            title: t('scheduled-block-really-delete-past'),
            onOk: () => cleanupTimestamps(false)
          })
        }
      },
      {
        key: 'delete-all',
        label: t('scheduled-block-delete-all'),
        danger: true,
        onClick: () => {
          Modal.confirm({
            title: t('scheduled-block-really-delete-all'),
            onOk: () => cleanupTimestamps(true)
          })
        }
      }
    ]
  }, [value, formatDateTime, showElementByKey, cleanupTimestamps, t])

  // Initialize on mount only (empty deps = runs once)
  useEffect(() => {
    loadTimestampsForDate(selectedDate)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Handle selectedDate changes (smart auto-selection based on current timestamp)
  useEffect(() => {
    loadTimestampsForDate(selectedDate)
  }, [selectedDate, loadTimestampsForDate])

  const currentSliderValue = useMemo(() => {
    if (isNil(currentTimestamp)) return 0
    const dateStart = selectedDate.startOf('day').unix()
    return timestampToSliderValue(currentTimestamp, dateStart)
  }, [currentTimestamp, selectedDate, timestampToSliderValue])

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

        <div className={ styles.sliderContainer }>
          <div className={ styles.sliderWrapper }>
            <Slider
              disabled={ disabled }
              marks={ sliderMarks }
              max={ SLIDER_RANGE[1] }
              min={ SLIDER_RANGE[0] }
              onChange={ handleSliderChange }
              step={ 1 }
              value={ currentSliderValue }
            />
            {/* Clickable markers overlay */}
            {Object.entries(sliderMarks).map(([sliderValue, timeLabel]) => {
              const validEntries = isArray(value) ? value : []
              const dateStart = selectedDate.startOf('day').unix()
              const timestamp = sliderValueToTimestamp(Number(sliderValue), dateStart)
              const entry = validEntries.find(e => e.date === timestamp)
              
              if (!entry) return null

              const markerPosition = (Number(sliderValue) / SLIDER_RANGE[1]) * 100

              return (
                <TimelineMarker
                  key={entry.key}
                  entry={entry}
                  markerPosition={markerPosition}
                  onModifyDateChange={handleModifyDateChange}
                  onEntryClick={(clickedEntry) => {
                    showElementByKey(clickedEntry.key)
                    setCurrentTimestamp(clickedEntry.date)
                  }}
                  onDeleteEntry={handleDeleteEntry}
                  markerOverlayClassName={styles.markerOverlay}
                />
              )
            })}
          </div>
        </div>

        <div className={ styles.buttonsContainer }>
          <IconButton
            disabled={ disabled }
            icon={{ value: 'plus' }}
            onClick={ handleAddBlock }
            title={ t('add-scheduled-block') }
          />

          <Dropdown
            disabled={ disabled }
            menu={{ items: getDropdownItems() }}
            trigger={ ['click'] }
          >
            <IconButton
              icon={{ value: 'clock' }}
              title={ t('jump-to-timestamp') }
            />
          </Dropdown>
        </div>
      </div>

      <div className={ styles.blockContent }>
        <DynamicEditablesRenderer editableDefinitions={ dynamicEditables } />
      </div>
    </div>
  )
}
