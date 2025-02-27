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
import cn from 'classnames'
import {
  type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/dynamic-type-object-data-abstract'
import { DatePicker } from '@Pimcore/components/date-picker/date-picker'
import { toCssDimension } from '@Pimcore/utils/css'

export type TimeObjectDataDefinition = AbstractObjectDataDefinition

export class DynamicTypeObjectDataTime extends DynamicTypeObjectDataAbstract {
  id: string = 'time'

  getObjectDataComponent (props: TimeObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <DatePicker.TimePicker
        className={ cn('w-full', props.className) }
        disabled={ props.noteditable === true }
        inherited={ props.inherited }
        outputFormat={ 'HH:mm' }
        outputType="dateString"
        showSecond={ false }
        style={ { maxWidth: toCssDimension(props.defaultFieldWidth.small) } }
        value={ props.value }
      />
    )
  }
}
