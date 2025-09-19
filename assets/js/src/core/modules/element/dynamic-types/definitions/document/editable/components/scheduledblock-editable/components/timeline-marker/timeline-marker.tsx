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
import { DatePicker, Dropdown, Icon, useFormModal, Box, type DropdownProps } from '@sdk/components'
import { Popover, Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import dayjs, { type Dayjs } from 'dayjs'
import cn from 'classnames'
import { isNil } from 'lodash'
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
  const { confirm } = useFormModal()

  const [modifyPopoverOpen, setModifyPopoverOpen] = useState<boolean>(false)
  const [markerDropdownOpen, setMarkerDropdownOpen] = useState<boolean>(false)
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false)
  const [shouldCloseAfterChange, setShouldCloseAfterChange] = useState<boolean>(false)

  const handleOpenModifyPopover = (): void => {
    setMarkerDropdownOpen(false)
    setModifyPopoverOpen(true)
    setTimeout(() => { setDatePickerOpen(true) }, 100)
  }

  const handleModifyCancel = useCallback(() => {
    setModifyPopoverOpen(false)
    setDatePickerOpen(false)
    setShouldCloseAfterChange(false)
  }, [])

  const handleModifyDateChange = useCallback((newDateTime: Dayjs | null) => {
    if (!isNil(newDateTime)) {
      setShouldCloseAfterChange(true)
      onModifyDateChange(entry.key, newDateTime)
    }
  }, [entry.key, onModifyDateChange])

  useEffect(() => {
    if (shouldCloseAfterChange) {
      const timer = setTimeout(() => {
        handleModifyCancel()
      }, 50)

      return () => { clearTimeout(timer) }
    }
  }, [shouldCloseAfterChange, handleModifyCancel])

  const getMarkerDropdownItems = (): DropdownProps['menu']['items'] => [
    {
      key: 'modify',
      label: t('modify'),
      icon: <Icon value="edit" />,
      onClick: handleOpenModifyPopover
    },
    {
      key: 'delete',
      label: t('delete'),
      icon: <Icon value="trash" />,
      onClick: () => {
        confirm({
          title: t('scheduled-block.delete-confirmation'),
          onOk: () => { onDeleteEntry(entry.key) }
        })
      }
    }
  ]

  const modifyPopoverContent = (
    <Box padding="extra-small">
      <DatePicker
        format="YYYY-MM-DD HH:mm"
        onChange={ handleModifyDateChange }
        onOpenChange={ (open) => {
          setDatePickerOpen(open)
          if (!open) {
            setTimeout(() => {
              if (modifyPopoverOpen) {
                handleModifyCancel()
              }
            }, 100)
          }
        } }
        open={ datePickerOpen }
        showTime={ {
          format: 'HH:mm',
          hideDisabledOptions: true
        } }
        style={ { width: '100%' } }
        value={ dayjs.unix(entry.date) }
      />
    </Box>
  )

  return (
    <Popover
      content={ modifyPopoverContent }
      onOpenChange={ (open) => {
        if (!open) {
          setDatePickerOpen(false)
          handleModifyCancel()
        }
      } }
      open={ modifyPopoverOpen }
      placement="top"
      trigger={ [] }
    >
      <Tooltip
        placement="top"
        title={ formatDateTime({ timestamp: entry.date, dateStyle: 'medium', timeStyle: 'short' }) }
      >
        <Dropdown
          menu={ { items: getMarkerDropdownItems() } }
          onOpenChange={ setMarkerDropdownOpen }
          open={ markerDropdownOpen }
          trigger={ ['contextMenu'] }
        >
          <div
            className={ styles.markerOverlay }
            onClick={ (e) => {
              e.stopPropagation()
              onEntryClick(entry)
            } }
            onContextMenu={ (e) => {
              e.preventDefault()
              e.stopPropagation()
              setMarkerDropdownOpen(!markerDropdownOpen)
            } }
            onKeyDown={ (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                e.stopPropagation()
                onEntryClick(entry)
              }
            } }
            role="button"
            tabIndex={ 0 }
          >
            <div
              className={ cn(styles.markerCircleBase, styles.markerCircle, {
                [styles.markerCircleActive]: isActive
              }) }
            />
            <div className={ styles.markerTime }>
              {timeLabel}
            </div>
          </div>
        </Dropdown>
      </Tooltip>
    </Popover>
  )
}
