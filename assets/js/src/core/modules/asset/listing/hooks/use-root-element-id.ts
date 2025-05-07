/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type UseElementIdReturn } from '@Pimcore/modules/element/listing/abstract/settings/settings-provider'

export const useRootElementId = (): UseElementIdReturn => {
  // @todo do not hard code the root id
  const getId: UseElementIdReturn['getId'] = () => 1

  return {
    getId
  }
}
