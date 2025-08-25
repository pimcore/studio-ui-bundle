/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useState, useEffect, useContext } from 'react'
import { DocumentContext } from '@Pimcore/modules/document/document-provider'
import { getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'

export const useAreablockTypesVisibility = (): boolean => {
  const { id: documentId } = useContext(DocumentContext)
  const [hasAreablocks, setHasAreablocks] = useState(false)

  useEffect(() => {
    const checkAreablocks = async (): Promise<void> => {
      try {
        const { document: documentApi } = getPimcoreStudioApi()

        // Check if iframe is available (less strict - don't require ready state)
        if (!documentApi.isIframeAvailable(documentId)) {
          setHasAreablocks(false)
          return
        }

        // Get the iframe API and check for areablock types
        const iframeApi = documentApi.getIframeApi(documentId)
        const areablockTypes = await iframeApi.documentEditable.getAreablockTypes()

        setHasAreablocks(areablockTypes.length > 0)
      } catch (error) {
        console.warn('Could not check areablock types:', error)
        setHasAreablocks(false)
      }
    }

    // Set up listener for iframe ready event
    try {
      const { document: documentApi } = getPimcoreStudioApi()
      documentApi.onReady(documentId, () => {
        void checkAreablocks()
      })
    } catch (error) {
      console.warn('Could not set up iframe ready listener:', error)
    }

    // Poll for iframe availability
    const pollForIframe = setInterval(() => {
      try {
        const { document: documentApi } = getPimcoreStudioApi()
        if (documentApi.isIframeAvailable(documentId)) {
          clearInterval(pollForIframe)
          void checkAreablocks()
        }
      } catch (error) {
        console.warn('Error during iframe polling:', error)
        clearInterval(pollForIframe)
      }
    }, 500)

    // Clear interval after 10 seconds to avoid infinite polling
    setTimeout(() => {
      clearInterval(pollForIframe)
    }, 10000)

    return () => {
      clearInterval(pollForIframe)
    }
  }, [documentId])

  return hasAreablocks
}
