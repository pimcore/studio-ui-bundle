/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { Slider } from 'antd'
import type { SliderMarks } from 'antd/es/slider'
import { isArray, isNil } from 'lodash'
import dayjs, { type Dayjs } from 'dayjs'
import { TimelineMarker } from '../timeline-marker/timeline-marker'
import { useStyles } from './timeline.styles'
import { scheduledblockValueUtils } from '../../utils/scheduledblock-utils'
import { type ScheduledblockValue, type ScheduledblockEntry } from '../../scheduledblock-editable'

const SLIDER_RANGE: [number, number] = [0, 86400]

export interface TimelineProps {
  value: ScheduledblockValue
  selectedDate: Dayjs
  currentTimestamp: number | null
  disabled?: boolean
  onSliderChange: (value: number) => void
  onModifyDateChange: (entryKey: string, newDateTime: Dayjs | null) => void
  onEntryClick: (entry: ScheduledblockEntry) => void
  onDeleteEntry: (entryKey: string) => void
}

export const Timeline = ({
  value,
  selectedDate,
  currentTimestamp,
  disabled = false,
  onSliderChange,
  onModifyDateChange,
  onEntryClick,
  onDeleteEntry
}: TimelineProps): React.JSX.Element => {
  const { styles } = useStyles()

  const formatTime = (timestamp: number): string => {
    return dayjs.unix(timestamp).format('HH:mm')
  }

  const timestampToSliderValue = (timestamp: number, dateStart: number): number => {
    return timestamp - dateStart
  }

  const sliderMarks = useMemo(() => {
    const dateStart = selectedDate.startOf('day').unix()
    const dateEnd = selectedDate.endOf('day').unix()
    const validEntries = isArray(value) ? value : []
    const dayEntries = scheduledblockValueUtils.getTimestampsForDate(validEntries, dateStart, dateEnd)

    const marks: SliderMarks = {}
    dayEntries.forEach(entry => {
      const sliderValue = timestampToSliderValue(entry.date, dateStart)
      const isActive = currentTimestamp === entry.date
      const timeLabel = formatTime(entry.date)

      marks[sliderValue] = {
        label: (
          <TimelineMarker
            entry={ entry }
            isActive={ isActive }
            key={ entry.key }
            onDeleteEntry={ onDeleteEntry }
            onEntryClick={ onEntryClick }
            onModifyDateChange={ onModifyDateChange }
            timeLabel={ timeLabel }
          />
        )
      }
    })

    return marks
  }, [value, selectedDate, currentTimestamp, onModifyDateChange, onEntryClick, onDeleteEntry])

  const currentSliderValue = useMemo(() => {
    if (isNil(currentTimestamp)) return undefined
    const currentDate = dayjs.unix(currentTimestamp)
    if (!currentDate.isSame(selectedDate, 'day')) return undefined
    const dateStart = selectedDate.startOf('day').unix()
    return timestampToSliderValue(currentTimestamp, dateStart)
  }, [currentTimestamp, selectedDate])

  return (
    <div className={ styles.sliderContainer }>
      <div className={ styles.sliderWrapper }>
        <Slider
          disabled={ disabled }
          marks={ sliderMarks }
          max={ SLIDER_RANGE[1] }
          min={ SLIDER_RANGE[0] }
          onChange={ onSliderChange }
          step={ 1 }
          value={ currentSliderValue ?? 0 }
        />
      </div>
    </div>
  )
}
