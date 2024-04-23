import { ImageView } from '@Pimcore/components/grid/columns/views/image-view'
import { type Asset } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { useAsset } from '@Pimcore/modules/asset/hooks/use-asset'
import { type CellContext } from '@tanstack/react-table'
import React from 'react'

interface PreviewContainerProps {
  cellInfo: CellContext<Asset, string | undefined> | undefined
}

const PreviewContainer = (props: PreviewContainerProps): React.JSX.Element => {
  const { openAsset } = useAsset()

  function openAssetWidget (): void {
    if (props.cellInfo !== undefined) {
      const asset = props.cellInfo.row.original

      openAsset({
        name: asset.filename!,
        icon: asset.iconName ?? 'file-question-02',

        config: {
          id: asset.id!
        }
      })
    }
  }

  return (
    <>
      {props.cellInfo?.row.original.type === 'image' && (
        <ImageView
          onClick={ openAssetWidget }
          src={ props.cellInfo.getValue()! }
          style={ { cursor: 'pointer' } }
        />
      )}
    </>
  )
}

export { PreviewContainer }
