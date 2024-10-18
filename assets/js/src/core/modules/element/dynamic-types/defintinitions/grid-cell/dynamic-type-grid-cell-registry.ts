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

import { type ReactElement } from 'react'
import { type AbstractGridCellDefinition, type DynamicTypeCellColumnAbstract } from './dynamic-type-grid-cell-abstract'
import { injectable } from 'inversify'
import { DynamicTypeRegistryAbstract } from '../../registry/dynamic-type-registry-abstract'

@injectable()
export class DynamicTypeFieldFilterRegistry extends DynamicTypeRegistryAbstract<DynamicTypeCellColumnAbstract> {
  getComponent (id: string, props: AbstractGridCellDefinition): ReactElement<AbstractGridCellDefinition> {
    return this.getDynamicType(id).getGridColumnComponent(props)
  }
}
