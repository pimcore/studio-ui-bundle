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
import { TreeIdContext, type ITreeIdContext } from './tree-id-provider'

export const useTreeId = (allowEmptyContext: boolean = false): ITreeIdContext => {
  const context = useContext(TreeIdContext)

  if (context === undefined) {
    if (allowEmptyContext) {
      return { treeId: '' }
    }
    throw new Error('useTreeId must be used within a TreeIdProvider')
  }

  return context
}
