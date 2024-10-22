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

import React, { type ReactElement } from 'react'
import { type AbstractGridCellDefinition, DynamicTypeGridCellAbstract } from '../../dynamic-type-grid-cell-abstract'
import { TextCell } from '../../components/text/text-cell'
import { injectable } from 'inversify'

@injectable()
export class DynamicTypeGridCellText extends DynamicTypeGridCellAbstract {
  readonly id = 'input'

  getGridCellComponent (props: AbstractGridCellDefinition): ReactElement<AbstractGridCellDefinition> {
    return <TextCell { ...props } />
  }
}