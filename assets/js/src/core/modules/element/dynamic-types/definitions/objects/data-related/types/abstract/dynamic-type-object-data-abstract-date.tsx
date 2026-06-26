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
import dayjs from 'dayjs'
import cn from 'classnames'
import { isNumber } from 'lodash'
import { type PickerProps } from 'antd/lib/date-picker/generatePicker/interface'
import { type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract } from '../../dynamic-type-object-data-abstract'
import { DatePicker } from '@Pimcore/components/date-picker/date-picker'
import { GridCellPreviewWrapper } from '../../../grid-cell-preview/grid-cell-cell-preview-wrapper/grid-cell-preview-wrapper'
import type { FormInstance } from 'antd'
import type { NamePath } from 'rc-field-form/es/interface'
import { toCssDimension } from '@Pimcore/utils/css'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'
import { formatDate, formatDateTime } from '@Pimcore/utils/date-time'

export type AbstractDateObjectDataDefinition = AbstractObjectDataDefinition & {
  defaultValue?: number | string | null
  useCurrentDate?: boolean | null
  respectTimezone?: boolean | null
  outputType?: 'timestamp' | 'dateString'
  outputFormat?: string
  showTime?: PickerProps['showTime']
}

const getDefaultValue = (props: AbstractDateObjectDataDefinition): number | string | dayjs.Dayjs | undefined => {
  if (props.useCurrentDate === true) {
    return dayjs()
  }
  if (typeof props.defaultValue === 'number' || typeof props.defaultValue === 'string') {
    return props.defaultValue
  }

  return undefined
}

export abstract class DynamicTypeObjectDataAbstractDate extends DynamicTypeObjectDataAbstract {
  getObjectDataComponent (props: AbstractDateObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    const outputType = props.outputType ?? 'dateString'
    return (
      <DatePicker
        allowClear
        className={ cn('w-full', props.className) }
        disabled={ props.noteditable === true }
        inherited={ props.inherited }
        outputFormat={ props.respectTimezone !== false || outputType !== 'dateString' ? undefined : props.outputFormat }
        outputType={ outputType }
        respectTimezone={ props.respectTimezone ?? undefined }
        showTime={ props.showTime }
        style={ { maxWidth: toCssDimension(props.defaultFieldWidth.small) } }
        value={ props.value }
      />
    )
  }

  handleDefaultValue (props: AbstractDateObjectDataDefinition, form: FormInstance, fieldName: NamePath): void {
    const defaultValue = getDefaultValue(props)
    if (defaultValue === undefined) {
      return
    }
    if (form.getFieldValue(fieldName) === null) {
      form.setFieldValue(fieldName, defaultValue)
    }
  }
}

/**
 * Reads `respectTimezone` from a field's runtime config:
 *   - date field      → respect=true iff `columnType` is bigint(20) (or unknown), false if 'date'.
 *   - datetime field  → respect=true unless `respectTimezone` is explicitly false.
 */
export const isFieldRespectTimezone = (
  fieldType: string | undefined,
  fieldDefinition: { columnType?: string, respectTimezone?: boolean | null } | null | undefined
): boolean => {
  if (fieldType === 'date') {
    return fieldDefinition?.columnType !== 'date'
  }
  return fieldDefinition?.respectTimezone !== false
}

interface DateObjectGridCellPreviewProps {
  value: unknown
  respectTimezone: boolean
  showTime?: boolean
}

/**
 * Grid-cell preview for the `date` and `datetime` object-data fields. Renders in the server
 * timezone for wall-clock (`respectTimezone=false`) fields, browser timezone otherwise.
 */
export const DateObjectGridCellPreview = ({ value, respectTimezone, showTime = false }: DateObjectGridCellPreviewProps): React.ReactElement => {
  const { timezone } = useSettings()
  const serverTimezone = isNonEmptyString(timezone) ? timezone : undefined
  const timeZone = respectTimezone ? undefined : serverTimezone
  const formatted = (isNumber(value) || typeof value === 'string')
    ? (showTime
        ? formatDateTime({ timestamp: value, dateStyle: 'short', timeStyle: 'short', timeZone })
        : formatDate(value, timeZone))
    : ''

  return <GridCellPreviewWrapper>{formatted}</GridCellPreviewWrapper>
}
