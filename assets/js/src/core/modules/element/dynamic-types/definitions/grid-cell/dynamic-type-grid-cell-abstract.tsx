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
import { DynamicTypeAbstract } from '../../registry/dynamic-type-registry-abstract'
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { injectable } from 'inversify'

export interface AbstractGridCellDefinition extends DefaultCellProps {}

// @todo check for copy and paste handler implementation
@injectable()
export abstract class DynamicTypeGridCellAbstract extends DynamicTypeAbstract {
  abstract readonly id: string
  abstract getGridCellComponent (props: AbstractGridCellDefinition): ReactElement<AbstractGridCellDefinition>
}
