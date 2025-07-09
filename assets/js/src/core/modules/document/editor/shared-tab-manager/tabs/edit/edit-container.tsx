/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { DocumentContext } from '@Pimcore/modules/document/document-provider'
import { useDocumentDraft } from '@Pimcore/modules/document/hooks/use-document-draft'
import React, { useContext, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Iframe, type IframeRef } from '../../../../../../components/iframe/iframe'
import { getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'
import { isNil } from 'lodash'

export const EditContainer = (): React.JSX.Element => {
  const { id } = useContext(DocumentContext)
  const { document: documentDraft } = useDocumentDraft(id)
  const { t } = useTranslation()
  const iframeRef = useRef<IframeRef>(null)

  const handleIframeLoad = useCallback(() => {
    const iframeElement = iframeRef.current?.getIframeElement()

    if (!isNil(iframeElement)) {
      try {
        const { document: documentApi } = getPimcoreStudioApi()
        documentApi.registerIframe(id, iframeElement, iframeRef)
      } catch (error) {
        console.warn('Could not register iframe:', error)
      }
    }
  }, [id])

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      try {
        const { document: documentApi } = getPimcoreStudioApi()
        documentApi.unregisterIframe(id)
      } catch (error) {
        console.warn('Could not unregister iframe:', error)
      }
    }
  }, [id])

  return (
    <Iframe
      onLoad={ handleIframeLoad }
      preserveScrollOnReload
      ref={ iframeRef }
      src={ `${documentDraft?.fullPath}?pimcore_editmode=true&pimcore_studio=true&documentId=${id}` }
      title={ `${t('edit.label')}-${id}` }
      useExternalReadyState
    />
  )
}
