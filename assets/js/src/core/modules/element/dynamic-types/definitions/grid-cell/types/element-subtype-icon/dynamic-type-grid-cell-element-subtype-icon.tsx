/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactElement } from 'react'
import { type AbstractGridCellDefinition, DynamicTypeGridCellAbstract } from '../../dynamic-type-grid-cell-abstract'
import { injectable } from 'inversify'
import { ElementSubtypeIconCell, type ElementSubtypeIconCellProps } from '../../components/element-subtype-icon-cell/element-subtype-icon-cell'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'

export interface ElementSubtypeIconGridCellConfig {
  elementType: ElementType
}

@injectable()
export class DynamicTypeGridCellElementSubtypeIcon extends DynamicTypeGridCellAbstract {
  readonly id = 'element-subtype-icon'

  getGridCellComponent (props: AbstractGridCellDefinition): ReactElement<AbstractGridCellDefinition> {
    const config = props.column.columnDef.meta?.config as ElementSubtypeIconGridCellConfig | undefined

    if (config?.elementType === undefined) {
      throw new Error('ElementSubtypeIconCell requires elementType in column meta config')
    }

    const cellProps: ElementSubtypeIconCellProps = {
      ...props,
      elementType: config.elementType
    }

    return <ElementSubtypeIconCell { ...cellProps } />
  }
}
