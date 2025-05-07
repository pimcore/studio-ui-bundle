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
import {
  type ILayoutSelectionContext,
  LayoutSelectionContext
} from '@Pimcore/modules/data-object/editor/toolbar/context-menu/provider/layout-selection-provider'

export interface UseLanguageSelectionReturn extends ILayoutSelectionContext {}

export const useLayoutSelection = (): UseLanguageSelectionReturn => {
  return useContext(LayoutSelectionContext)
}
