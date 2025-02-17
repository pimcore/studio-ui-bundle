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

import React from 'react'
import { useElementSelectorHelper } from '../../provider/element-selector/use-element-selector-helper'
import { AssetSelectorListing } from '@Pimcore/modules/asset/element-selector/asset-selector-listing'
import { Button } from '@Pimcore/components/button/button'
import { type ITabsProps, Tabs } from '@Pimcore/components/tabs/tabs'
import { useGlobalRowSelection } from '../../provider/global-row-selection/use-global-row-selection'

export const ElementSelectorContent = (): React.JSX.Element => {
  const helper = useElementSelectorHelper()
  const { onFinish, areas } = helper.config
  const { getSelectedData } = useGlobalRowSelection()

  const tabItems: ITabsProps['items'] = []

  if (areas?.asset === true) {
    tabItems.push({
      key: 'assets',
      label: 'Assets',
      children: <AssetSelectorListing />
    })
  }

  if (areas?.object === true) {
    tabItems.push({
      key: 'objects',
      label: 'Objects',
      children: '@todo'
    })
  }

  if (areas?.document === true) {
    tabItems.push({
      key: 'documents',
      label: 'Documents',
      children: '@todo'
    })
  }

  const onButtonFinishClick = (): void => {
    if (onFinish !== undefined) {
      onFinish({ data: getSelectedData() })
    }

    helper.close()
  }

  // @todo translations
  return (
    <>
      { tabItems.length === 0 && <p>No areas configured</p> }
      { tabItems.length === 1 && tabItems[0].children }
      { tabItems.length > 1 && <Tabs items={ tabItems } /> }
      <Button onClick={ onButtonFinishClick } >Finish</Button>
    </>
  )
}
