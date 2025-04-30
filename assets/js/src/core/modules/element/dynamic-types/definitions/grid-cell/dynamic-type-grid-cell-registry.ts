/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ReactElement } from 'react'
import { type AbstractGridCellDefinition, type DynamicTypeGridCellAbstract } from './dynamic-type-grid-cell-abstract'
import { injectable } from 'inversify'
import { DynamicTypeRegistryAbstract } from '../../registry/dynamic-type-registry-abstract'

@injectable()
export class DynamicTypeGridCellRegistry extends DynamicTypeRegistryAbstract<DynamicTypeGridCellAbstract> {
  getGridCellComponent (id: string, props: AbstractGridCellDefinition): ReactElement<AbstractGridCellDefinition> {
    return this.getDynamicType(id).getGridCellComponent(props)
  }
}
