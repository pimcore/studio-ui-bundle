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
import {
  DynamicTypeObjectDataAbstractNumeric
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/abstract/dynamic-type-object-data-abstract-numeric'
import { type EditMode, type GetGridCellDefinitionProps } from '../dynamic-type-object-data-abstract'
import { Numeric } from '../../grid-cell-preview/numeric/numeric'
import { type DynamicTypeFieldFilterAbstract } from '@sdk/modules/element'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'

export class DynamicTypeObjectDataNumeric extends DynamicTypeObjectDataAbstractNumeric {
  id: string = 'numeric'
  gridCellEditMode: EditMode = 'edit-modal'
  dynamicTypeFieldFilterType: DynamicTypeFieldFilterAbstract = container.get(serviceIds['DynamicTypes/FieldFilter/Number'])

  /** A value that is not empty and does not parse as a finite number cannot be shown in the number input. */
  canReadValue (value: unknown): boolean {
    if (value === null || value === undefined || value === '') {
      return true
    }

    return (typeof value === 'number' || typeof value === 'string') && Number.isFinite(Number(value))
  }

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const value = props.cellProps.getValue()

    return (
      <Numeric value={ value } />
    )
  }
}
