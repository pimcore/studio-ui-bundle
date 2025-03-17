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
  type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract,
  type EditMode,
  type GetGridCellDefinitionProps
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/dynamic-type-object-data-abstract'
import { DatePicker } from '@Pimcore/components/date-picker/date-picker'
import { toCssDimension } from '@Pimcore/utils/css'
import { GridCellPreviewWrapper } from '../../grid-cell-preview/grid-cell-cell-preview-wrapper/grid-cell-preview-wrapper'
import { formatDate } from '@Pimcore/utils/date-time'
import { isEmpty, isString } from 'lodash'

export type DateRangeObjectDataDefinition = AbstractObjectDataDefinition

export class DynamicTypeObjectDataDateRange extends DynamicTypeObjectDataAbstract {
  id: string = 'dateRange'
  gridCellEditMode: EditMode = 'edit-modal'

  getObjectDataComponent (props: DateRangeObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <DatePicker.RangePicker
        className={ cn('w-full', props.className) }
        disabled={ props.noteditable === true }
        inherited={ props.inherited }
        outputType={ 'dateString' }
        style={ { maxWidth: toCssDimension(props.defaultFieldWidth.medium) } }
        value={ props.value }
      />
    )
  }

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const value = props.cellProps.getValue()
    const [start, end] = value ?? []
    const rangeValues: string[] = []

    if (isString(start) && !isEmpty(start)) {
      rangeValues.push(formatDate(start))
    }
    if (isString(end) && !isEmpty(end)) {
      rangeValues.push(formatDate(end))
    }

    return <GridCellPreviewWrapper>{rangeValues.join(' - ')}</GridCellPreviewWrapper>
  }
}
