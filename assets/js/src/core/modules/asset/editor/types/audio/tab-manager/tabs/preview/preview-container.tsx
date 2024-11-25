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

import React, { useContext } from 'react'
import { PreviewView } from './preview-view'
import { useAssetGetByIdQuery } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import {
  ContentLayout
} from '@Pimcore/components/content-layout/content-layout'

const PreviewContainer = (): React.JSX.Element => {
  const assetContext = useContext(AssetContext)
  const { data } = useAssetGetByIdQuery({ id: assetContext.id })

  return (
    <ContentLayout>
      <PreviewView
        src={ data!.fullPath! }
      />
    </ContentLayout>
  )
}

export { PreviewContainer }
