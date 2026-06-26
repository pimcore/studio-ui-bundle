/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useState } from 'react'
import { isNil } from 'lodash'
import { type DocumentEditableApi } from '@Pimcore/app/public-api/document-editor-iframe/editable-data/editable-data'

/**
 * Reads the "highlight editable elements" toggle from the iframe-local document editable API
 * and subscribes to changes. The toolbar button in the parent window pushes new values into
 * this API (via the public document API bridge), which notifies the subscribed overlays so
 * they re-render with the highlight styling applied.
 */
export const useHighlightEditables = (): boolean => {
  const getApi = (): DocumentEditableApi | undefined => {
    return (window as any).PimcoreDocumentEditor?.documentEditable
  }

  const [highlightEditables, setHighlightEditables] = useState<boolean>(() => getApi()?.getHighlightEditables() ?? false)

  useEffect(() => {
    const api = getApi()

    if (isNil(api)) {
      return
    }

    setHighlightEditables(api.getHighlightEditables())

    return api.subscribeHighlightEditables(setHighlightEditables)
  }, [])

  return highlightEditables
}
