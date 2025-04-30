/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext } from 'react'
import { GeneralFiltersConfigContext, type GeneralFiltersConfigContextProps } from './general-filters-config-provider'

export interface UseGeneralFiltersConfigReturn extends GeneralFiltersConfigContextProps {}
export const useGeneralFiltersConfig = (): UseGeneralFiltersConfigReturn => {
  const context = useContext(GeneralFiltersConfigContext)

  return context
}
