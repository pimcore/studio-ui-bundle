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
  type ISaveContext, SaveContext
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/save-provider/save-provider'

export const useSaveContext = (): ISaveContext => {
  const context = useContext(SaveContext)
  if (context === undefined) {
    throw new Error('useSaveContext must be used within a SaveProvider')
  }
  return context
}
