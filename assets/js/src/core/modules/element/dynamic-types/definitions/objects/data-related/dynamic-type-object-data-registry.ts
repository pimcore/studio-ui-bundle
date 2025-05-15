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
import { DynamicTypeRegistryAbstract } from '../../../registry/dynamic-type-registry-abstract'
import { type DynamicTypeObjectDataAbstract } from './dynamic-type-object-data-abstract'

@injectable()
export class DynamicTypeObjectDataRegistry extends DynamicTypeRegistryAbstract<DynamicTypeObjectDataAbstract> {}
