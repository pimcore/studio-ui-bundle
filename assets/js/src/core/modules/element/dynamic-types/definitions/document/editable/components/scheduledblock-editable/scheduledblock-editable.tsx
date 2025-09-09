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
import { DatePicker, Slider } from 'antd'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { DynamicEditablesRenderer } from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/edit/components/editables-renderer/dynamic-editables-renderer'
import { useScheduledblockEditableStyles } from './scheduledblock-editable.styles'
import { useScheduledblockEditable } from './hooks/use-scheduledblock-editable'
import { ScheduledblockManager } from './utils/scheduledblock-manager'
import { scheduledblockValueUtils } from './utils/scheduledblock-utils'
import { TimelineMarker } from './components/timeline-marker/timeline-marker'
import { TimestampDropdown } from './components/timestamp-dropdown/timestamp-dropdown'
import dayjs, { type Dayjs } from 'dayjs'
import { useTranslation } from 'react-i18next'
import { setScheduledblockOperation } from '../../types/dynamic-type-document-editable-scheduledblock'

const SLIDER_RANGE: [number, number] = [0, 86400]

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

  const timestampToSliderValue = useCallback((timestamp: number, dateStart: number): number => {
    return timestamp - dateStart
  }, [])

  const sliderValueToTimestamp = useCallback((sliderValue: number, dateStart: number): number => {
    return dateStart + sliderValue
  }, [])

  const formatTime = useCallback((timestamp: number): string => {
    return dayjs.unix(timestamp).format('HH:mm')
  }, [])

  const loadTimestampsForDate = useCallback((date: Dayjs) => {
    const dateStart = date.startOf('day').unix()
    const dateEnd = date.endOf('day').unix()

    const validEntries = isArray(value) ? value : []
    const dayEntries = scheduledblockValueUtils.getTimestampsForDate(validEntries, dateStart, dateEnd)

    const marks: Record<number, string> = {}
    dayEntries.forEach(entry => {
      const sliderValue = timestampToSliderValue(entry.date, dateStart)
      marks[sliderValue] = formatTime(entry.date)
    })

    setSliderMarks(marks)

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
  }, [value, currentTimestamp, timestampToSliderValue, formatTime, showElementByKey, hideAllElements])

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
    const timestamp = sliderValueToTimestamp(sliderValue, dateStart)
    
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
  }, [])

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

          <TimestampDropdown
            value={value}
            disabled={disabled}
            onJumpToEntry={handleJumpToEntry}
            onCleanupTimestamps={cleanupTimestamps}
          />
        </div>
      </div>

      <div className={ styles.blockContent }>
        <DynamicEditablesRenderer editableDefinitions={ dynamicEditables } />
      </div>
    </div>
  )
}
