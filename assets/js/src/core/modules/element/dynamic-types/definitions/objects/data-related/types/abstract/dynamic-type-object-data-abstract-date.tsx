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
import { Form } from '@Pimcore/components/form/form'
import { GridCellPreviewWrapper } from '../../../grid-cell-preview/grid-cell-cell-preview-wrapper/grid-cell-preview-wrapper'
import type { FormInstance } from 'antd'
import type { NamePath } from 'rc-field-form/es/interface'
import { toCssDimension } from '@Pimcore/utils/css'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'
import { formatDate, formatDateTime } from '@Pimcore/utils/date-time'
import { type AbstractBatchEditDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/dynamic-type-batch-edit-abstract'
import { type BatchEdit } from '@Pimcore/modules/data-object/listing/batch-actions/batch-edit-modal/batch-edit-provider'

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

  /**
   * The data-object date and datetime types own their batch-edit too — exposing a tz-aware picker
   * with the right `outputFormat` / `showTime` derived from this field's runtime config. Asset
   * metadata datetime keeps using the generic batch-edit component since it doesn't load the
   * ObjectDataRegistry, so the resolver falls back to that.
   */
  getBatchEditComponent ({ batchEdit }: AbstractBatchEditDefinition): React.ReactElement<AbstractBatchEditDefinition> {
    return <DateObjectBatchEditComponent batchEdit={ batchEdit } />
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
 * Tz-aware batch-edit picker for the `date` and `datetime` object-data fields. Mirrors the editor's
 * DatePicker semantics so a value batch-set through this modal round-trips identically to one
 * entered through the detail editor.
 */
const DateObjectBatchEditComponent = ({ batchEdit }: { batchEdit: BatchEdit }): React.ReactElement => {
  const { key, type } = batchEdit
  const fieldDefinition = (batchEdit.config as { fieldDefinition?: { columnType?: string, respectTimezone?: boolean | null } } | undefined)?.fieldDefinition
  const isDateOnly = type === 'date'
  const respectTimezone = isFieldRespectTimezone(type, fieldDefinition)
  const outputFormat = respectTimezone
    ? undefined
    : (isDateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm')

  return (
    <Form.Item name={ key }>
      <DatePicker
        outputFormat={ outputFormat }
        outputType='dateString'
        respectTimezone={ respectTimezone }
        showTime={ isDateOnly ? undefined : { format: 'HH:mm' } }
      />
    </Form.Item>
  )
}

/**
 * Shared grid-cell preview for the `date` and `datetime` object-data fields. Renders the value in
 * the configured server timezone when `respectTimezone` is false (wall-clock semantics), and in
 * the browser timezone when true (absolute-instant semantics).
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
