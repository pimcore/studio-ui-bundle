import React from 'react'
import { Toolbar as ToolbarView } from '@Pimcore/components/toolbar/toolbar'
import { tabs } from '@Pimcore/modules/asset/tab/utils/tab-registry'

export const Toolbar = (): React.JSX.Element => {
  return (
    <ToolbarView
      defaultActiveKey={'1'}
      items={tabs}
      showLabelIfActive={true}
    />
  )
}
