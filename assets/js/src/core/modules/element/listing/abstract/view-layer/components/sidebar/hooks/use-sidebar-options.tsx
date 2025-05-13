/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type SidebarProps } from '@Pimcore/components/sidebar/sidebar'

export interface UseSidebarOptionsReturn {
  getProps: () => SidebarProps
}

export const useSidebarOptions = (): UseSidebarOptionsReturn => {
  const getProps: UseSidebarOptionsReturn['getProps'] = () => {
    return {
      entries: []
    }
  }

  return {
    getProps
  }
}
