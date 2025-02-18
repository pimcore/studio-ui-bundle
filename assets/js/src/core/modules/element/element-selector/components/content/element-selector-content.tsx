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

import React, { useMemo } from 'react'
import { useElementSelectorHelper } from '../../provider/element-selector/use-element-selector-helper'
import { AssetSelectorListing } from '@Pimcore/modules/asset/element-selector/asset-selector-listing'
import { Button } from '@Pimcore/components/button/button'
import { type ITabsProps, Tabs } from '@Pimcore/components/tabs/tabs'
import { useGlobalRowSelection } from '../../provider/global-row-selection/use-global-row-selection'
import { DataObjectSelectorListing } from '@Pimcore/modules/data-object/element-selector/data-object-selector-listing'
import { useAreaControl } from '../../provider/area-control/use-area-control'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'

export const ElementSelectorContent = (): React.JSX.Element => {
  const helper = useElementSelectorHelper()
  const { onFinish, areas } = helper.config
  const { getSelectedData } = useGlobalRowSelection()
  const { activeArea, setActiveArea } = useAreaControl()

  const tabItems: ITabsProps['items'] = []

  if (areas?.asset === true) {
    tabItems.push({
      key: elementTypes.asset,
      label: 'Assets',
      forceRender: true,
      children: <div style={ { height: '500px' } }>
        <AssetSelectorListing />
      </div>
    })
  }

  if (areas?.object === true) {
    tabItems.push({
      key: elementTypes.dataObject,
      label: 'Objects',
      forceRender: true,
      children: <div style={ { height: '500px' } }>
        <DataObjectSelectorListing />
      </div>
    })
  }

  if (areas?.document === true) {
    tabItems.push({
      key: elementTypes.document,
      label: 'Documents',
      forceRender: true,
      children: <div style={ { height: '500px' } }>
        @todo
      </div>
    })
  }

  const onButtonFinishClick = (): void => {
    if (onFinish !== undefined) {
      onFinish({ data: getSelectedData() })
    }

    helper.close()
  }

  // @todo translations
  return useMemo(() => (
    <>
      { tabItems.length === 0 && <p>No areas configured</p> }
      { tabItems.length === 1 && tabItems[0].children }
      { tabItems.length > 1 && (
      <Tabs
        activeKey={ activeArea }
        items={ tabItems }
        onChange={ setActiveArea }
      />
      ) }
      <Button onClick={ onButtonFinishClick } >Finish</Button>
    </>
  ), [tabItems, activeArea])
}
