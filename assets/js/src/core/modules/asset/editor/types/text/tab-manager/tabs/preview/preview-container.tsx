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
import { useGetAssetDataTextByIdQuery } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { useStyle } from '@Pimcore/modules/asset/editor/types/text/tab-manager/tabs/preview/preview-container.styles'
import { isSet } from '@Pimcore/utils/helpers'

const PreviewContainer = (): React.JSX.Element => {
  const assetContext = useContext(AssetContext)
  const { data } = useGetAssetDataTextByIdQuery({ id: assetContext.id! })
  const { styles } = useStyle()

  return (
    <div className={ styles.relativeContainer }>
      { isSet(data) && (
      <PreviewView
        src={ data!.data }
      />
      ) }
    </div>
  )
}

export { PreviewContainer }
