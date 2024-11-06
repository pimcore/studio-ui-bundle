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

import { type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract } from '../dynamic-type-object-data-abstract'
import type { FormItemProps } from 'antd/es/form/FormItem'
import dayjs from 'dayjs'
import { DatePicker } from '@Pimcore/components/date-picker/date-picker'

export type DateObjectDataDefinition = AbstractObjectDataDefinition & {
  defaultValue: number | null
  useCurrentDate: boolean | null
  columnType: 'date' | 'bigint(20)'
}

const getInitialValue = (props: DateObjectDataDefinition): number | string | undefined => {
  if (props.useCurrentDate === true) {
    return isTimezoneEnabled(props) ? dayjs().unix() : dayjs().format('YYYY-MM-DD')
  }
  if (typeof props.defaultValue === 'number') {
    return props.defaultValue
  }

  return undefined
}

const isTimezoneEnabled = (props: DateObjectDataDefinition): boolean => {
  return props.columnType === 'bigint(20)'
}

export class DynamicTypeObjectDataDate extends DynamicTypeObjectDataAbstract {
  id: string = 'date'

  getObjectDataComponent (props: DateObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <DatePicker
        allowClear
        outputFormat={ isTimezoneEnabled(props) ? undefined : 'YYYY-MM-DD' }
        outputType="dateString"
      />
    )
  }

  getObjectDataFormItemProps (props: DateObjectDataDefinition): FormItemProps {
    return {
      ...super.getObjectDataFormItemProps(props),
      initialValue: getInitialValue(props)
    }
  }
}
