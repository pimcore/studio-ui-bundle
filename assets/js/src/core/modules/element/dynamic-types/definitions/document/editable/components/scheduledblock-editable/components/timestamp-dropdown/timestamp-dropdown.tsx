/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback } from 'react'
import { Dropdown, Modal } from 'antd'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useTranslation } from 'react-i18next'
import dayjs, { type Dayjs } from 'dayjs'
import { isArray } from 'lodash'
import { scheduledblockValueUtils } from '../../utils/scheduledblock-utils'
import { type ScheduledblockValue, type ScheduledblockEntry } from '../../scheduledblock-editable'
import { formatDateTime } from '@sdk/utils'

export interface TimestampDropdownProps {
  value: ScheduledblockValue
  disabled?: boolean
  onJumpToEntry: (entryDate: Dayjs, entryKey: string) => void
  onCleanupTimestamps: (deleteAll: boolean) => void
}

export const TimestampDropdown = ({
  value,
  disabled = false,
  onJumpToEntry,
  onCleanupTimestamps
}: TimestampDropdownProps): React.JSX.Element => {
  const { t } = useTranslation()

  const getDropdownItems = useCallback(() => {
    const validEntries = isArray(value) ? value : []
    const sortedEntries = scheduledblockValueUtils.sortByDate(validEntries)

    const jumpItems = sortedEntries.map(entry => ({
      key: `jump-${entry.key}`,
      label: formatDateTime({ timestamp: entry.date, dateStyle: 'medium', timeStyle: 'short' }),
      onClick: () => {
        const entryDate = dayjs.unix(entry.date)
        onJumpToEntry(entryDate, entry.key)
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
            onOk: () => onCleanupTimestamps(false)
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
            onOk: () => onCleanupTimestamps(true)
          })
        }
      }
    ]
  }, [value, formatDateTime, onJumpToEntry, onCleanupTimestamps, t])

  return (
    <Dropdown
      disabled={disabled}
      menu={{ items: getDropdownItems() }}
      trigger={['click']}
    >
      <IconButton
        icon={{ value: 'clock' }}
        title={t('jump-to-timestamp')}
      />
    </Dropdown>
  )
}
