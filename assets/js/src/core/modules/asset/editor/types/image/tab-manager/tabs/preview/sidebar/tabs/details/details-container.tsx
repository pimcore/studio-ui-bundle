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
import {
  type Image,
  useDownloadImageByFormatQuery,
  useGetAssetByIdQuery
} from '@Pimcore/modules/asset/asset-api-slice.gen'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import {
  AssetEditorSidebarDetailsView
} from '@Pimcore/modules/asset/editor/types/image/tab-manager/tabs/preview/sidebar/tabs/details/details-view'

const DetailContainer = (): React.JSX.Element => {
  const [downloadImageByFormat] = useDownloadImageByFormatQuery()

  const assetContext = useContext(AssetContext)
  const { data } = useGetAssetByIdQuery({ id: assetContext.id! })
  const imageData = data! as Image

  return (
    <AssetEditorSidebarDetailsView
      height={ imageData.height }
      onClickCustomDownload={ async () => {
        await downloadImageByFormat({

        })
      } }
      onClickDownloadByFormat={ async (format) => {
        await downloadImageByFormat({
          id: assetContext.id,
          format
        })
      } }
      width={ imageData.width }
    />
  )
}

export { DetailContainer }
