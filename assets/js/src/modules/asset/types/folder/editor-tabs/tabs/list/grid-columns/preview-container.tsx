import { type ApiAssetsGetCollectionItem } from '@Pimcore/modules/asset/asset-api'
import { ImageView } from '@Pimcore/modules/asset/grid/columns/views/image-view'
import { useAsset } from '@Pimcore/modules/asset/hooks/use-asset'
import { type CellContext } from '@tanstack/react-table'
import React from 'react'

interface PreviewContainerProps {
  cellInfo: CellContext<ApiAssetsGetCollectionItem, string | undefined> | undefined
}

const PreviewContainer = (props: PreviewContainerProps): React.JSX.Element => {
  const { openAsset } = useAsset()

  function openAssetWidget (): void {
    if (props.cellInfo !== undefined) {
      const asset = props.cellInfo.row.original

      openAsset({
        name: asset.filename,
        icon: 'folder',

        config: {
          id: asset.id!
        }
      })
    }
  }

  return (
    <>
      {props.cellInfo?.row.original.type === 'image' && (
        <ImageView style={{ cursor: 'pointer' }} onClick={openAssetWidget} src={props.cellInfo.getValue()!} />
      )}
    </>
  )
}

export { PreviewContainer }
