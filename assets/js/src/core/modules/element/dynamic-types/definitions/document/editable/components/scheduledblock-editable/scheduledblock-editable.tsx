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

import React, { useMemo, useCallback, useState, useEffect, useRef } from 'react'
import { isArray, isNil } from 'lodash'
import { DatePicker, Dropdown, Modal, Slider, TimePicker, Popover } from 'antd'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { DynamicEditablesRenderer } from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/edit/components/editables-renderer/dynamic-editables-renderer'
import { useScheduledblockEditableStyles } from './scheduledblock-editable.styles'
import { useScheduledblockEditable } from './hooks/use-scheduledblock-editable'
import { ScheduledblockManager } from './utils/scheduledblock-manager'
import { scheduledblockValueUtils } from './utils/scheduledblock-utils'
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
  const [sliderMarks, setSliderMarks] = useState<Record<number, string>>({})
  const [sliderRange, setSliderRange] = useState<[number, number]>([0, 86400])
  const [markerDropdownOpen, setMarkerDropdownOpen] = useState<string | null>(null)
  const [modifyPopoverOpen, setModifyPopoverOpen] = useState<string | null>(null)
  const [modifyingEntry, setModifyingEntry] = useState<ScheduledblockEntry | null>(null)
  const [newTime, setNewTime] = useState<Dayjs | null>(null)
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false)
  const [isDatePickerClosing, setIsDatePickerClosing] = useState<boolean>(false)
  const isJumpingRef = useRef<boolean>(false)

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
    cleanupTimestamps,
    getActiveElementTimestamp
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
  const loadTimestampsForDate = useCallback((date: Dayjs, skipAutoSelect: boolean = false) => {
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
    setSliderRange([0, 86400]) // 24 hours in seconds

    // Skip auto-selection if requested (e.g., when jumping to specific item)
    if (skipAutoSelect) return

    // Show first element of the day or latest previous
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
  }, [value, timestampToSliderValue, formatTime, showElementByKey, hideAllElements])

  // Handle date change
  const handleDateChange = useCallback((date: Dayjs | null) => {
    if (isNil(date)) return
    setSelectedDate(date)
    loadTimestampsForDate(date)
  }, [loadTimestampsForDate])

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
    setCurrentTimestamp(newTimestamp)
    
    // Update the DOM element's date attribute
    const element = scheduledblockManager.findElementByKey(entryKey)
    if (element) {
      scheduledblockManager.setElementDate(element, newTimestamp)
    }
  }, [disabled, value, onChange, scheduledblockManager, setScheduledblockOperationType])

  // Open modify popover
  const openModifyPopover = useCallback((entryKey: string) => {
    const validEntries = isArray(value) ? value : []
    const entry = validEntries.find(e => e.key === entryKey)
    
    if (entry) {
      setModifyingEntry(entry)
      const entryTime = dayjs.unix(entry.date)
      setNewTime(entryTime)
      setModifyPopoverOpen(entryKey)
      // Auto-open the DatePicker when popover opens
      setTimeout(() => setDatePickerOpen(true), 100)
    }
  }, [value])

  // Handle modify confirm via DatePicker change
  const handleModifyDateChange = useCallback((newDateTime: Dayjs | null) => {
    if (modifyingEntry && newDateTime) {
      const newTimestamp = newDateTime.unix()
      const oldTimestamp = modifyingEntry.date
      const entryDate = dayjs.unix(oldTimestamp)
      const dayChanged = !entryDate.isSame(newDateTime, 'day')
      
      // Apply the modification
      handleModifyEntry(modifyingEntry.key, newTimestamp)
      
      // Close popover and reset state
      setModifyPopoverOpen(null)
      setModifyingEntry(null)
      setNewTime(null)
      setDatePickerOpen(false)
      setIsDatePickerClosing(false)
      
      if (dayChanged) {
        // Day changed - use the EXACT same logic as dropdown click
        isJumpingRef.current = true // Set flag to prevent auto-selection
        setSelectedDate(newDateTime)
        loadTimestampsForDate(newDateTime, true) // Skip auto-select
        showElementByKey(modifyingEntry.key)
        setCurrentTimestamp(newTimestamp)
      } else {
        // Same day - just reactivate the updated item
        setCurrentTimestamp(newTimestamp)
        showElementByKey(modifyingEntry.key)
        // Refresh the current day timeline to update marker position
        loadTimestampsForDate(selectedDate, true)
      }
    }
  }, [modifyingEntry, handleModifyEntry, loadTimestampsForDate, showElementByKey, selectedDate])

  // Handle modify cancel (close popover)
  const handleModifyCancel = useCallback(() => {
    setModifyPopoverOpen(null)
    setModifyingEntry(null)
    setNewTime(null)
    setDatePickerOpen(false)
    setIsDatePickerClosing(false)
  }, [])

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

      // If this was the current entry, clear current timestamp
      if (currentTimestamp === entryToDelete.date) {
        setCurrentTimestamp(null)
        hideAllElements()
      }
    }
    
    setMarkerDropdownOpen(null)
  }, [disabled, value, onChange, scheduledblockManager, removeBlock, currentTimestamp, hideAllElements, setScheduledblockOperationType])

  // Create dropdown menu items for marker interaction
  const getMarkerDropdownItems = useCallback((entryKey: string) => [
    {
      key: 'modify',
      label: t('modify'),
      icon: 'edit',
      onClick: () => {
        setMarkerDropdownOpen(null)
        openModifyPopover(entryKey)
      }
    },
    {
      key: 'delete',
      label: t('delete'),
      icon: 'trash',
      danger: true,
      onClick: () => {
        Modal.confirm({
          title: t('scheduled-block-really-delete-entry'),
          onOk: () => handleDeleteEntry(entryKey)
        })
      }
    }
  ], [t, openModifyPopover, handleDeleteEntry])

  // Create dropdown menu items
  const getDropdownItems = useCallback(() => {
    const validEntries = isArray(value) ? value : []
    const sortedEntries = scheduledblockValueUtils.sortByDate(validEntries)

    const jumpItems = sortedEntries.map(entry => ({
      key: `jump-${entry.key}`,
      label: formatDateTime(entry.date),
      onClick: () => {
        const entryDate = dayjs.unix(entry.date)
        isJumpingRef.current = true // Set flag to prevent auto-selection
        setSelectedDate(entryDate)
        loadTimestampsForDate(entryDate, true) // Skip auto-select
        showElementByKey(entry.key)
        setCurrentTimestamp(entry.date)
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
  }, [value, formatDateTime, loadTimestampsForDate, showElementByKey, cleanupTimestamps, t])

  // Initialize on mount and when value changes
  useEffect(() => {
    // Determine if we should skip auto-selection but STILL rebuild marks
    const skipAutoSelect = isJumpingRef.current

    // Check if we have a stored date to restore (only on initial mount – when value length changes from 0 -> n or first run)
    // We still want to honor skipAutoSelect if a jump is in progress
    const documentId = (window as any).editWindow?.document?.id
    if (!skipAutoSelect && documentId) {
      const tmpStoreId = `pimcore_scheduled_block_tmp_date_${documentId}_${editableName}`
      const globalManager = (window.top as any)?.pimcore?.globalmanager
      if (globalManager?.get && globalManager.get(tmpStoreId)) {
        const storedDate = globalManager.get(tmpStoreId)
        globalManager.remove(tmpStoreId)
        setSelectedDate(dayjs(storedDate))
        loadTimestampsForDate(dayjs(storedDate), false)
        return
      }
    }

    // Always rebuild marks when value or selectedDate changes.
    // When jumping we skip auto-selection but still need the newly modified entry reflected.
    loadTimestampsForDate(selectedDate, skipAutoSelect)

    // Reset jump flag AFTER rebuilding with the (possibly) new value
    if (isJumpingRef.current) {
      isJumpingRef.current = false
    }
  }, [editableName, selectedDate, loadTimestampsForDate])

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
              max={ sliderRange[1] }
              min={ sliderRange[0] }
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

              const markerPosition = (Number(sliderValue) / sliderRange[1]) * 100

              // Create popover content for modify functionality
              const modifyPopoverContent = (
                <div style={{ padding: '8px' }}>
                  <DatePicker
                    value={modifyingEntry?.key === entry.key ? newTime : dayjs.unix(entry.date)}
                    onChange={handleModifyDateChange}
                    showTime={{
                      format: 'HH:mm',
                      hideDisabledOptions: true
                    }}
                    format="YYYY-MM-DD HH:mm"
                    placeholder={t('select-date-and-time')}
                    style={{ width: '200px' }}
                    open={modifyPopoverOpen === entry.key && datePickerOpen}
                    onOpenChange={(open) => {
                      if (!open) {
                        // DatePicker is closing - set flag to prevent popover interference
                        setIsDatePickerClosing(true)
                        setDatePickerOpen(false)
                        // Close everything after a brief delay to ensure DatePicker finishes its closing
                        setTimeout(() => {
                          handleModifyCancel()
                        }, 50)
                      } else {
                        setDatePickerOpen(true)
                        setIsDatePickerClosing(false)
                      }
                    }}
                    autoFocus
                  />
                </div>
              )

              return (
                <Popover
                  key={`popover-${entry.key}`}
                  content={modifyPopoverContent}
                  title={t('modify-scheduled-block-time')}
                  trigger={[]}
                  open={modifyPopoverOpen === entry.key}
                  onOpenChange={(open) => {
                    if (!open && !isDatePickerClosing) {
                      // Only handle popover closing if DatePicker isn't already handling the close
                      setDatePickerOpen(false)
                      handleModifyCancel()
                    }
                  }}
                  placement="top"
                >
                  <Dropdown
                    key={entry.key}
                    open={markerDropdownOpen === entry.key}
                    onOpenChange={(open) => setMarkerDropdownOpen(open ? entry.key : null)}
                    menu={{ items: getMarkerDropdownItems(entry.key) }}
                    trigger={['contextMenu']}
                  >
                    <div 
                      className={styles.markerOverlay}
                      style={{ left: `${markerPosition}%` }}
                      onClick={(e) => {
                        e.stopPropagation()
                        // Left click - activate the entry (normal behavior)
                        showElementByKey(entry.key)
                        setCurrentTimestamp(entry.date)
                      }}
                      onContextMenu={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        // Right click - show context menu
                        setMarkerDropdownOpen(markerDropdownOpen === entry.key ? null : entry.key)
                      }}
                    />
                  </Dropdown>
                </Popover>
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
