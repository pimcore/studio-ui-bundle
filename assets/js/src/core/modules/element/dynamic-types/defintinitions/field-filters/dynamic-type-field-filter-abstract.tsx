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

import { type GridColumnConfiguration } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { type ReactElement } from 'react'
import { type DynamicTypeAbstract } from '../../registry/dynamic-type-registry-abstract'

export interface AbstractFieldFilterDefinition {
  column: GridColumnConfiguration
}

export abstract class DynamicTypeFieldFilterAbstract implements DynamicTypeAbstract {
  abstract readonly id: string
  abstract getFieldFilterComponent (props: AbstractFieldFilterDefinition): ReactElement<AbstractFieldFilterDefinition>
}
