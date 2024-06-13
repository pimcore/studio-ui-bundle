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

import { ImageView } from '@Pimcore/components/grid/columns/views/image/image-view'
import { type Asset } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { useAsset } from '@Pimcore/modules/asset/hooks/use-asset'
import { type CellContext } from '@tanstack/react-table'
import React from 'react'

type PreviewContainerProps = CellContext<Asset, string | undefined> | undefined

const PreviewContainer = (props: PreviewContainerProps): React.JSX.Element => {
  const { openAsset } = useAsset()

  function openAssetWidget (): void {
    if (props !== undefined) {
      const asset = props.row.original

      openAsset({
        config: {
          id: asset.id
        }
      })
    }
  }

  return (
    <>
      {props?.row.original.type === 'image' && (
        <ImageView
          onClick={ openAssetWidget }
          src={ props.getValue()! }
          style={ { cursor: 'pointer' } }
        />
      )}
    </>
  )
}

export { PreviewContainer }
