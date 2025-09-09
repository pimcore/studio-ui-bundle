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
import { DynamicTypeRegistryAbstract } from '@Pimcore/modules/element/dynamic-types/registry/dynamic-type-registry-abstract'
import {
  type DynamicTypeDefinitionAbstract
} from '@Pimcore/modules/reports/dynamic-types/definitions/definition-adapters/dynamic-type-definition-abstract'

@injectable()
export class DynamicTypeDefinitionRegistry extends DynamicTypeRegistryAbstract<DynamicTypeDefinitionAbstract> {}
