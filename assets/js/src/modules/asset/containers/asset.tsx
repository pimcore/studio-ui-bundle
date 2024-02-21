import React from 'react'
import { useAssetDraft } from '../hooks/use-asset-draft'
import AssetProvider from '@Pimcore/modules/asset/context/asset-context'
import { EditorTabs } from '@Pimcore/modules/asset/editor-tabs/container/editor-tabs'

export interface AssetProps {
  id: string
}

const Asset = (props: AssetProps): React.JSX.Element => {
  const { id } = props
  const { isLoading, isError, asset } = useAssetDraft(id)

  if (isError) {
    return <div>Error</div>
  }

  if (isLoading || asset === undefined) {
    return <div>Loading...</div>
  }

  return (
    <AssetProvider asset={asset}>
      <EditorTabs />
    </AssetProvider>
  )
}

export { Asset }
