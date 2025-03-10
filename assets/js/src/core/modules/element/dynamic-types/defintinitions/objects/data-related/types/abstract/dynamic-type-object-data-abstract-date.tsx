/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React from 'react'
import dayjs from 'dayjs'
import cn from 'classnames'
import { type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract } from '../../dynamic-type-object-data-abstract'
import { DatePicker } from '@Pimcore/components/date-picker/date-picker'
import type { FormInstance } from 'antd'
import type { NamePath } from 'rc-field-form/es/interface'
import { toCssDimension } from '@Pimcore/utils/css'

export type AbstractDateObjectDataDefinition = AbstractObjectDataDefinition & {
  defaultValue?: number | string | null
  useCurrentDate?: boolean | null
  respectTimezone?: boolean | null
  outputType?: 'timestamp' | 'dateString'
  outputFormat?: string
  showTime?: boolean
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
