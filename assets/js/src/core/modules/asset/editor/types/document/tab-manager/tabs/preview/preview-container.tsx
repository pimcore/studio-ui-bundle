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

import React, { useContext, useEffect, useState } from 'react'
import { PreviewView } from './preview-view'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { ContentToolbarSidebarLayout } from '@Pimcore/components/content-toolbar-sidebar-layout/content-toolbar-sidebar-layout'

const PreviewContainer = (): React.JSX.Element => {
  const assetContext = useContext(AssetContext)
  const [docURL, setDocURL] = useState('')

  useEffect(() => {
    if (docURL !== '') {
      return
    }

    fetch(`http://localhost/studio/api/assets/${assetContext.id!}/document/stream/pdf-preview`)
      .then(async (response) => await response.blob())
      .then((docBlob) => {
        const docURL = URL.createObjectURL(docBlob)
        setDocURL(docURL)
      })
      .catch((err) => {
        console.error(err)
      })
  })

  if (docURL === '') {
    <div>Loading ...</div>
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
