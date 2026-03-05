/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useMemo } from 'react'
import { isNil } from 'lodash'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { addCacheBusterToUrl } from '@Pimcore/utils/url-cache-buster'
import { type DocumentUrlProcessorRegistry, DocumentUrlContext } from '../services/processors/document-url-processor-registry'

/**
 * Custom hook that processes URL parameters using hook-based processors
 * This allows processors to use React hooks directly within the processor
 */
export const useDocumentUrlProcessor = (
  documentId: number,
  processorType: 'preview' | 'edit',
  baseUrl: string,
  baseParameters: Record<string, string> = {}
): string => {
  const registry = container.get<DocumentUrlProcessorRegistry>(
    serviceIds['Document/ProcessorRegistry/UrlProcessor']
  )

  return useMemo(() => {
    try {
      if (isNil(baseUrl) || baseUrl === '') {
        return ''
      }

      const context = new DocumentUrlContext(documentId, processorType, baseUrl, baseParameters)

      registry.executeProcessors(context)

      const url = new URL(baseUrl, window.location.origin)
      Object.entries(context.getParams()).forEach(([key, value]) => {
        url.searchParams.set(key, value)
      })

      return addCacheBusterToUrl(url.toString())
    } catch (error) {
      console.warn('Failed to process URL:', error)
      return ''
    }
  }, [documentId, processorType, baseUrl, baseParameters])
}

/**
 * Helper hook for preview URLs with standard preview parameters
 */
export const useDocumentPreviewUrlProcessor = (
  documentId: number,
  baseUrl: string,
  refreshKey?: number,
  forceDeviceType?: string,
  timestamp?: number
): string => {
  const baseParameters = useMemo(() => ({
    pimcore_preview: 'true',
    pimcore_studio_preview: 'true',
    ...(!isNil(forceDeviceType) && forceDeviceType !== '' ? { forceDeviceType } : {}),
    ...(!isNil(timestamp) ? { pimcore_override_output_timestamp: timestamp.toString() } : {})
  }), [refreshKey, forceDeviceType, timestamp])

  return useDocumentUrlProcessor(documentId, 'preview', baseUrl, baseParameters)
}
