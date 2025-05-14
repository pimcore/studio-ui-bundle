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
import { DocumentContext } from '../document-provider'

export interface UseDocumentReturn {
  id: number | undefined
}

export const useDocument = (): UseDocumentReturn => {
  const { id } = useContext(DocumentContext)

  return {
    id
  }
}
