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
import { type Asset } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { useAssetHelper } from '@Pimcore/modules/asset/hooks/use-asset-helper'
import { type CellContext } from '@tanstack/react-table'
import React from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import {
  useStyle
} from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/components/asset-preview/asset-preview-cell.styles'
import { onKeyEnterExecuteClick } from '@Pimcore/utils/helpers'
import { Button } from '@Pimcore/components/button/button'

type PreviewContainerProps = CellContext<Asset, string | undefined> | undefined

const AssetPreviewCell = (props: PreviewContainerProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { openAsset } = useAssetHelper()

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

  const renderPreview = (props: any): React.JSX.Element => {
    if ('thumbnail' in props && props.thumbnail !== null) {
      return (
        <ImageView
          onClick={ openAssetWidget }
          src={ props.thumbnail }
          style={ { cursor: 'pointer' } }
        />
      )
    } else if ('icon' in props) {
      return (
        <Button
          icon={ <Icon
            { ...props.icon }
            options={ { width: 50, height: 50 } }
                 /> }
          onClick={ openAssetWidget }
          onKeyDown={ onKeyEnterExecuteClick }
          type={ 'link' }
        />
      )
    }

    return <></>
  }

  return (
    <div className={ styles.cell }>
      {props?.getValue() !== undefined && (
        renderPreview(props.getValue())
      )}
    </div>
  )
}

export { AssetPreviewCell }
