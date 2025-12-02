/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { PreviewView } from './preview-view'
import {
  ContentLayout
} from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { useAsset } from '@Pimcore/modules/asset/hooks/use-asset'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { fetchBlobWithPolling } from '@Pimcore/utils/polling-helper'
import { useAssetCustomSettingsGetByIdQuery } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { UnsafePdfView } from './unsafe-pdf-view'
import { has } from 'lodash'

const PreviewContainer = (): React.JSX.Element => {
  const { id } = useAsset()
  const { isLoading, asset } = useAssetDraft(id)
  const [docURL, setDocURL] = useState('')
  const [hasError, setHasError] = useState(false)

  const { data: customSettings, isLoading: isLoadingCustomSettings } = useAssetCustomSettingsGetByIdQuery({ id })

  const dynamicSettings = customSettings?.items?.dynamicCustomSettings as any
  const isUnsafePdf = has(dynamicSettings, 'document_pdf_scan_status') && dynamicSettings.document_pdf_scan_status === 'unsafe'

  useEffect(() => {
    if (isLoading || isLoadingCustomSettings || isUnsafePdf) {
      return
    }

    fetchBlobWithPolling({
      url: `${getPrefix()}/assets/${id}/document/stream/pdf-preview`,
      throwOnError: true,
      onSuccess: (blob) => {
        setDocURL(URL.createObjectURL(blob))
      }
    }).catch(() => { setHasError(true) })
  }, [id, isLoading, isLoadingCustomSettings, isUnsafePdf])

  if (isLoading || isLoadingCustomSettings) {
    return <Content loading />
  }

  if (isUnsafePdf || hasError) {
    return (
      <ContentLayout>
        <UnsafePdfView
          assetId={ id }
          fullPath={ asset?.fullPath ?? '' }
        />
      </ContentLayout>
    )
  }

  if (docURL === '') {
    return <Content loading />
  }

  return (
    <ContentLayout>
      <PreviewView
        src={ docURL }
      />
    </ContentLayout>
  )
}

export { PreviewContainer }
