/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { addCacheBusterToUrl } from '@Pimcore/utils/url-cache-buster'

/**
 * Creates a preview URL for a document with the necessary preview parameters
 */
export const createPreviewUrl = (baseUrl: string, addPreviewParameters: boolean = true): string => {
  const urlObj = new URL(baseUrl, window.location.origin)
  
  if (addPreviewParameters) {
    urlObj.searchParams.set('pimcore_preview', 'true')
    urlObj.searchParams.set('pimcore_studio_preview', 'true')
  }
  
  const url = urlObj.toString()
  
  if (addPreviewParameters) {
    return addCacheBusterToUrl(url, '_dc')
  }
  
  return url
}
