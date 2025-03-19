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

import {
  type AbstractDateObjectDataDefinition,
  DynamicTypeObjectDataAbstractDate
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/abstract/dynamic-type-object-data-abstract-date'
import React from 'react'
import {
  type GetGridCellDefinitionProps,
  type AbstractObjectDataDefinition,
  type EditMode
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract'
import { GridCellPreviewWrapper } from '../../grid-cell-preview/grid-cell-cell-preview-wrapper/grid-cell-preview-wrapper'
import { formatDate } from '@Pimcore/utils/date-time'
import { isNumber } from 'lodash'

export type DateObjectDataDefinition = AbstractDateObjectDataDefinition & {
  columnType: 'date' | 'bigint(20)'
}

export class DynamicTypeObjectDataDate extends DynamicTypeObjectDataAbstractDate {
  id: string = 'date'
  gridCellEditMode: EditMode = 'edit-modal'

  getObjectDataComponent (props: DateObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return super.getObjectDataComponent({
      ...props,
      className: props.className,
      respectTimezone: props.columnType === 'bigint(20)',
      outputType: 'dateString',
      outputFormat: 'YYYY-MM-DD'
    })
  }

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const value = props.cellProps.getValue()

    return <GridCellPreviewWrapper>{isNumber(value) ? formatDate(value) : value}</GridCellPreviewWrapper>
  }
}
