/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { Slider } from 'antd'
import { isArray } from 'lodash'
import dayjs, { type Dayjs } from 'dayjs'
import { TimelineMarker } from '../timeline-marker/timeline-marker'
import { useTimelineStyles } from './timeline.styles'
import { type ScheduledblockValue, type ScheduledblockEntry } from '../../scheduledblock-editable'

const SLIDER_RANGE: [number, number] = [0, 86400]

export interface TimelineProps {
  value: ScheduledblockValue
  selectedDate: Dayjs
  sliderMarks: Record<number, string>
  currentSliderValue: number
  disabled?: boolean
  onSliderChange: (value: number) => void
  onModifyDateChange: (entryKey: string, newDateTime: Dayjs | null) => void
  onEntryClick: (entry: ScheduledblockEntry) => void
  onDeleteEntry: (entryKey: string) => void
}

export const Timeline = ({
  value,
  selectedDate,
  sliderMarks,
  currentSliderValue,
  disabled = false,
  onSliderChange,
  onModifyDateChange,
  onEntryClick,
  onDeleteEntry
}: TimelineProps): React.JSX.Element => {
  const { styles } = useTimelineStyles()

  const timestampToSliderValue = (timestamp: number, dateStart: number): number => {
    return timestamp - dateStart
  }

  const sliderValueToTimestamp = (sliderValue: number, dateStart: number): number => {
    return dateStart + sliderValue
  }

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderWrapper}>
        <Slider
          disabled={disabled}
          marks={sliderMarks}
          max={SLIDER_RANGE[1]}
          min={SLIDER_RANGE[0]}
          onChange={onSliderChange}
          step={1}
          value={currentSliderValue}
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
              onModifyDateChange={onModifyDateChange}
              onEntryClick={onEntryClick}
              onDeleteEntry={onDeleteEntry}
              markerOverlayClassName={styles.markerOverlay}
            />
          )
        })}
      </div>
    </div>
  )
}
