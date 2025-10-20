/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable } from 'inversify'
import { DynamicTypeGridCellDataObjectAdapter } from '../data-object-adapter/dynamic-type-grid-cell-data-object-adapter'

@injectable()
export class DynamicTypeGridCellClassificationStore extends DynamicTypeGridCellDataObjectAdapter {
  id = 'dataobject.classificationstore'
}
