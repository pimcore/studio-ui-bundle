/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useState } from 'react'
import { DatePicker, Dropdown, Modal, Popover } from 'antd'
import { useTranslation } from 'react-i18next'
import dayjs, { type Dayjs } from 'dayjs'
import { type ScheduledblockEntry } from '../../scheduledblock-editable'

export interface TimelineMarkerProps {
  entry: ScheduledblockEntry
  markerPosition: number
  onModifyDateChange: (entryKey: string, newDateTime: Dayjs | null) => void
  onEntryClick: (entry: ScheduledblockEntry) => void
  onDeleteEntry: (entryKey: string) => void
  markerOverlayClassName: string
}

export const TimelineMarker = ({
  entry,
  markerPosition,
  onModifyDateChange,
  onEntryClick,
  onDeleteEntry,
  markerOverlayClassName
}: TimelineMarkerProps): React.JSX.Element => {
  const { t } = useTranslation()

  // Internal state for this marker's interactions
  const [modifyPopoverOpen, setModifyPopoverOpen] = useState<boolean>(false)
  const [markerDropdownOpen, setMarkerDropdownOpen] = useState<boolean>(false)
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false)
  const [isDatePickerClosing, setIsDatePickerClosing] = useState<boolean>(false)

  // Handle opening modify popover
  const handleOpenModifyPopover = useCallback(() => {
    setMarkerDropdownOpen(false)
    setModifyPopoverOpen(true)
    // Auto-open the DatePicker when popover opens
    setTimeout(() => setDatePickerOpen(true), 100)
  }, [])

  // Handle modify cancel (close popover)
  const handleModifyCancel = useCallback(() => {
    setModifyPopoverOpen(false)
    setDatePickerOpen(false)
    setIsDatePickerClosing(false)
  }, [])

  // Handle modify date change
  const handleModifyDateChange = useCallback((newDateTime: Dayjs | null) => {
    if (newDateTime) {
      onModifyDateChange(entry.key, newDateTime)
      // Close the popover after modification
      handleModifyCancel()
    }
  }, [entry.key, onModifyDateChange, handleModifyCancel])

  // Create dropdown menu items for marker interaction
  const getMarkerDropdownItems = useCallback(() => [
    {
      key: 'modify',
      label: t('modify'),
      icon: 'edit',
      onClick: handleOpenModifyPopover
    },
    {
      key: 'delete',
      label: t('delete'),
      icon: 'trash',
      danger: true,
      onClick: () => {
        Modal.confirm({
          title: t('scheduled-block-really-delete-entry'),
          onOk: () => onDeleteEntry(entry.key)
        })
      }
    }
  ], [t, entry.key, handleOpenModifyPopover, onDeleteEntry])

  // Create popover content for modify functionality
  const modifyPopoverContent = (
    <div style={{ padding: '8px' }}>
      <DatePicker
        value={dayjs.unix(entry.date)}
        onChange={handleModifyDateChange}
        showTime={{
          format: 'HH:mm',
          hideDisabledOptions: true
        }}
        format="YYYY-MM-DD HH:mm"
        placeholder={t('select-date-and-time')}
        style={{ width: '200px' }}
        open={datePickerOpen}
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
      content={modifyPopoverContent}
      title={t('modify-scheduled-block-time')}
      trigger={[]}
      open={modifyPopoverOpen}
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
        open={markerDropdownOpen}
        onOpenChange={setMarkerDropdownOpen}
        menu={{ items: getMarkerDropdownItems() }}
        trigger={['contextMenu']}
      >
        <div 
          className={markerOverlayClassName}
          style={{ left: `${markerPosition}%` }}
          onClick={(e) => {
            e.stopPropagation()
            // Left click - activate the entry (normal behavior)
            onEntryClick(entry)
          }}
          onContextMenu={(e) => {
            e.preventDefault()
            e.stopPropagation()
            // Right click - show context menu
            setMarkerDropdownOpen(!markerDropdownOpen)
          }}
        />
      </Dropdown>
    </Popover>
  )
}
