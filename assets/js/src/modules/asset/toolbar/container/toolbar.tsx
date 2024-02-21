import React from 'react'
import { Toolbar as ToolbarView } from '@Pimcore/components/toolbar/toolbar'
import { assetEditorTabManager } from '@Pimcore/modules/asset/toolbar'

export const Toolbar = (): React.JSX.Element => {
  const tabs = assetEditorTabManager.getTabs()

  return (
    <ToolbarView
      defaultActiveKey={'1'}
      items={tabs}
      showLabelIfActive={true}
    />
  )
}
