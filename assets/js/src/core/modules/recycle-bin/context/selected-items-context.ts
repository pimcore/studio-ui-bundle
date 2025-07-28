/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createSelectedRowsContext } from '@Pimcore/components/grid/contexts/selected-rows-context'
import { type RowSelectionState } from '@tanstack/react-table'

export const {
  SelectedRowsProvider,
  useSelectedRowsContext
} = createSelectedRowsContext<RowSelectionState>()
