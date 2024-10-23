/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React, { useEffect, useState } from 'react'
import { PreviewView } from './preview-view'
import {
  ContentToolbarSidebarLayout
} from '@Pimcore/components/content-toolbar-sidebar-layout/content-toolbar-sidebar-layout'
import { Content } from '@Pimcore/components/content/content'
import { useAsset } from '@Pimcore/modules/asset/hooks/use-asset'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { fetchBlobWithPolling } from '@Pimcore/utils/polling-helper'

const PreviewContainer = (): React.JSX.Element => {
  const { id } = useAsset()
  const { isLoading } = useAssetDraft(id)
  const [docURL, setDocURL] = useState('')

  useEffect(() => {
    if (isLoading) {
      return
    }

    fetchBlobWithPolling({
      url: `${getPrefix()}/assets/${id}/document/stream/pdf-preview`,
      onSuccess: (blob) => {
        setDocURL(URL.createObjectURL(blob))
      }
    }).catch(console.error)
  }, [id, isLoading])

  if (docURL === '' || isLoading) {
    return <Content loading />
  }

  return (
    <ContentToolbarSidebarLayout>
      <PreviewView
        src={ docURL }
      />
    </ContentToolbarSidebarLayout>
  )
}

export { PreviewContainer }
