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

export class DynamicTypeObjectDataNumeric extends DynamicTypeObjectDataAbstractNumeric {
  id: string = 'numeric'
  gridCellEditMode: EditMode = 'edit-modal'

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const value = props.cellProps.getValue()

    return (
      <Numeric value={ value } />
    )
  }
}
