/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useContext, useEffect, useState } from 'react'
import { PreviewView } from './preview-view'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import {
  ContentLayout
} from '@Pimcore/components/content-layout/content-layout'
import { sidebarManager } from '@Pimcore/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar'
import { Sidebar } from '@Pimcore/components/sidebar/sidebar'
import { Content } from '@Pimcore/components/content/content'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { fetchBlobWithPolling } from '@Pimcore/utils/polling-helper'
import { VideoProvider, useVideoContext } from '@Pimcore/components/pimcore-video/video-provider'

const PreviewContainerInner = (): React.JSX.Element => {
  const [url, setUrl] = useState<string>('')
  const { id } = useContext(AssetContext)
  const { isLoading } = useAssetDraft(id)
  const { thumbnail } = useVideoContext()
  const sidebarEntries = sidebarManager.getEntries()
  const sidebarButtons = sidebarManager.getButtons()

  const setUrlByThumbnail = (name: string): void => {
    setUrl('')
    const url = `${getPrefix()}/assets/${id}/video/stream/${name}`

    fetchBlobWithPolling({
      url,
      onSuccess: (blob) => {
        const objectUrl = URL.createObjectURL(blob)
        setUrl(objectUrl)
      }
    }).catch(console.error)
  }

  useEffect(() => {
    if (isLoading) {
      return
    }
    setUrlByThumbnail(thumbnail)
  }, [thumbnail, isLoading])

  if (isLoading) {
    return <Content loading />
  }

  const poster = `${getPrefix()}/assets/${id}/video/stream/image-thumbnail?width=500&height=500&aspectRatio=true`

  return (
    <ContentLayout renderSidebar={
      <Sidebar
        buttons={ sidebarButtons }
        entries={ sidebarEntries }
      />
    }
    >
      {url === ''
        ? (
          <Content loading />
          )
        : (
          <PreviewView
            poster={ poster }
            src={ url }
          />
          )}

    </ContentLayout>
  )
}

const PreviewContainer = (): React.JSX.Element => {
  return (
    <VideoProvider>
      <PreviewContainerInner />
    </VideoProvider>
  )
}

export { PreviewContainer }
