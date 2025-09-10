/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useState, useEffect } from 'react'
import { DatePicker, Dropdown, Modal, Popover, Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import dayjs, { type Dayjs } from 'dayjs'
import cn from 'classnames'
import { type ScheduledblockEntry } from '../../scheduledblock-editable'
import { useStyles } from './timeline-marker.styles'
import { formatDateTime } from '@sdk/utils'

export interface TimelineMarkerProps {
  entry: ScheduledblockEntry
  onModifyDateChange: (entryKey: string, newDateTime: Dayjs | null) => void
  onEntryClick: (entry: ScheduledblockEntry) => void
  onDeleteEntry: (entryKey: string) => void
  timeLabel: string
  isActive?: boolean
}

export const TimelineMarker = ({
  entry,
  onModifyDateChange,
  onEntryClick,
  onDeleteEntry,
  timeLabel,
  isActive = false
}: TimelineMarkerProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  const [modifyPopoverOpen, setModifyPopoverOpen] = useState<boolean>(false)
  const [markerDropdownOpen, setMarkerDropdownOpen] = useState<boolean>(false)
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false)
  const [shouldCloseAfterChange, setShouldCloseAfterChange] = useState<boolean>(false)

  const handleOpenModifyPopover = useCallback(() => {
    setMarkerDropdownOpen(false)
    setModifyPopoverOpen(true)
    setTimeout(() => setDatePickerOpen(true), 100)
  }, [])

  const handleModifyCancel = useCallback(() => {
    setModifyPopoverOpen(false)
    setDatePickerOpen(false)
    setShouldCloseAfterChange(false)
  }, [])

  const handleModifyDateChange = useCallback((newDateTime: Dayjs | null) => {
    if (newDateTime) {
      setShouldCloseAfterChange(true)
      onModifyDateChange(entry.key, newDateTime)
    }
  }, [entry.key, onModifyDateChange])

  useEffect(() => {
    if (shouldCloseAfterChange) {
      const timer = setTimeout(() => {
        handleModifyCancel()
      }, 50)
      
      return () => clearTimeout(timer)
    }
  }, [shouldCloseAfterChange, handleModifyCancel])

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
          setDatePickerOpen(open)
          if (!open) {
            setTimeout(() => {
              if (modifyPopoverOpen) {
                handleModifyCancel()
              }
            }, 100)
          }
        }}
        autoFocus
      />
    </div>
  )

  return (
    <Popover
      content={modifyPopoverContent}
      trigger={[]}
      open={modifyPopoverOpen}
      onOpenChange={(open) => {
        if (!open) {
          setDatePickerOpen(false)
          handleModifyCancel()
        }
      }}
      placement="top"
    >
      <Tooltip 
        title={formatDateTime({ timestamp: entry.date, dateStyle: 'medium', timeStyle: 'short' })}
        placement="top"
      >
        <Dropdown
          open={markerDropdownOpen}
          onOpenChange={setMarkerDropdownOpen}
          menu={{ items: getMarkerDropdownItems() }}
          trigger={['contextMenu']}
        >
        <div 
          className={styles.markerOverlay}
          onClick={(e) => {
            e.stopPropagation()
            onEntryClick(entry)
          }}
          onContextMenu={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setMarkerDropdownOpen(!markerDropdownOpen)
          }}
        >
          <div 
            className={cn(styles.markerCircleBase, styles.markerCircle, {
              [styles.markerCircleActive]: isActive
            })}
          />
          <div className={styles.markerTime}>
            {timeLabel}
          </div>
        </div>
      </Dropdown>
      </Tooltip>
    </Popover>
  )
}
