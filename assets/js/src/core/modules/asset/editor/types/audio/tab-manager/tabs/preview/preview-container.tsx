/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
        src={ data!.fullPath }
      />
    </ContentLayout>
  )
}

export { PreviewContainer }
