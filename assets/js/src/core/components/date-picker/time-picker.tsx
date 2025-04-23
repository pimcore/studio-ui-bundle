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

import React, { useEffect } from 'react'
import { type Dayjs } from 'dayjs'
import {
  type DatePickerValueType,
  toDayJs,
  fromDayJs,
  type OutputType
} from './utils/date-picker-utils'
import { DatePicker } from 'antd'
import { type GenericTimePickerProps } from 'antd/es/date-picker/generatePicker/interface'
import cn from 'classnames'
import { useStyles } from '@Pimcore/components/date-picker/date-picker.styles'

export type TimePickerProps = GenericTimePickerProps & {
  value?: DatePickerValueType
  onChange?: (date: DatePickerValueType) => void
  outputType?: OutputType
  outputFormat?: string
  inherited?: boolean
}

export const TimePicker = (props: TimePickerProps): React.JSX.Element => {
  const outputFormat = props?.outputFormat ?? 'HH:mm:ss'

  const [value, setValue] = React.useState<Dayjs | null>(toDayJs(props.value, outputFormat))
  const { styles } = useStyles()

  useEffect(() => {
    if (props.onChange !== undefined) {
      props.onChange(fromDayJs(value, props.outputType, outputFormat))
    }
  }, [value, props.outputType, outputFormat])

  const OriginalTimePicker = DatePicker.TimePicker

  return (
    <OriginalTimePicker
      { ...props }
      onChange={ (date: Dayjs | null) => {
        setValue(date)
      } }
      popupClassName={ styles.datePickerDropdown }
      rootClassName={ cn(styles.datePicker, props.className, { [styles.inherited]: props.inherited }) }
      value={ value }
    />
  )
}
