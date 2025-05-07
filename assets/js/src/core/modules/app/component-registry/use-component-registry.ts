/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useInjection } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type ComponentRegistry } from './component-registry'

export function useComponentRegistry (): ComponentRegistry {
  return useInjection<ComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])
}
