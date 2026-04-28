/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
import { isNumber } from 'lodash'
import { formatDateTime } from '@Pimcore/utils/date-time'
import { type DynamicTypeFieldFilterAbstract } from '../../../field-filters/dynamic-type-field-filter-abstract'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'

export type DatetimeObjectDataDefinition = AbstractDateObjectDataDefinition & {
  columnType: 'date' | 'bigint(20)'
}

export class DynamicTypeObjectDataDatetime extends DynamicTypeObjectDataAbstractDate {
  id: string = 'datetime'
  gridCellEditMode: EditMode = 'edit-modal'

  dynamicTypeFieldFilterType: DynamicTypeFieldFilterAbstract = container.get(serviceIds['DynamicTypes/FieldFilter/Datetime'])

  getObjectDataComponent (props: DatetimeObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return super.getObjectDataComponent({
      ...props,
      className: props.className,
      outputType: 'dateString',
      outputFormat: 'YYYY-MM-DD HH:mm',
      showTime: { format: 'HH:mm' }
    })
  }

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const value = props.cellProps.getValue()

    return <GridCellPreviewWrapper>{(isNumber(value) || typeof value === 'string') ? formatDateTime({ timestamp: value, dateStyle: 'short', timeStyle: 'short' }) : ''}</GridCellPreviewWrapper>
  }
}
