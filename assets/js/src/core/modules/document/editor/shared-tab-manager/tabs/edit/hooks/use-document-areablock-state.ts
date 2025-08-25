/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useAppSelector } from '@Pimcore/app/store'
import { selectDocumentHasAreablocks, selectDocumentAreablockTypes, type AreablockTypeEntry } from '@Pimcore/modules/document/document-editor-slice'
import { useContext } from 'react'
import { DocumentContext } from '@Pimcore/modules/document/document-provider'

export interface DocumentAreablockState {
  areablockTypes: AreablockTypeEntry[]
  hasAreablocks: boolean
}

/**
 * Hook to track areablock state for a document.
 * This hook subscribes to Redux state changes and triggers re-renders
 * when the areablock state changes for the current document.
 */
export const useDocumentAreablockState = (): DocumentAreablockState => {
  const { id: documentId } = useContext(DocumentContext)
  const areablockTypes = useAppSelector((state) => {
    if (documentId === undefined) {
      return []
    }
    return selectDocumentAreablockTypes(state, documentId)
  })

  const hasAreablocks = useAppSelector((state) => {
    if (documentId === undefined) {
      return false
    }
    return selectDocumentHasAreablocks(state, documentId)
  })

  console.log('useDocumentAreablockState called:', { documentId, hasAreablocks, areablockTypesCount: areablockTypes.length })

  return {
    areablockTypes,
    hasAreablocks
  }
}
