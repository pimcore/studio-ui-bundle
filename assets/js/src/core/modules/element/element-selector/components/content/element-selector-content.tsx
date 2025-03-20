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

import React, { useEffect, useMemo } from 'react'
import { useElementSelectorHelper } from '../../provider/element-selector/use-element-selector-helper'
import { AssetSelectorListing } from '@Pimcore/modules/asset/element-selector/asset-selector-listing'
import { type ITabsProps, Tabs } from '@Pimcore/components/tabs/tabs'
import { DataObjectSelectorListing } from '@Pimcore/modules/data-object/element-selector/data-object-selector-listing'
import { useAreaControl } from '../../provider/area-control/use-area-control'
import { type ElementType, elementTypes } from '@Pimcore/types/enums/element/element-type'

export const ElementSelectorContent = (): React.JSX.Element => {
  const helper = useElementSelectorHelper()
  const { areas } = helper.config
  const { activeArea, setActiveArea } = useAreaControl()

  const tabItems: ITabsProps['items'] = []

  if (areas?.asset === true) {
    tabItems.push({
      key: elementTypes.asset,
      label: 'Assets',
      forceRender: true,
      children: <div style={ { height: '65vh' } }>
        <AssetSelectorListing />
      </div>
    })
  }

  if (areas?.object === true) {
    tabItems.push({
      key: elementTypes.dataObject,
      label: 'Objects',
      forceRender: true,
      children: <div style={ { height: '65vh' } }>
        <DataObjectSelectorListing />
      </div>
    })
  }

  if (areas?.document === true) {
    tabItems.push({
      key: elementTypes.document,
      label: 'Documents',
      forceRender: true,
      children: <div style={ { height: '65vh' } }>
        @todo
      </div>
    })
  }

  useEffect(() => {
    console.log({ activeArea, tabItems })
    if (tabItems.length > 0 && activeArea === undefined) {
      setActiveArea(tabItems[0].key as unknown as ElementType)
    }
  }, [])

  console.log({ activeArea, tabItems })

  // @todo translations
  return useMemo(() => (
    <>
      { tabItems.length === 0 && <p>No areas configured</p> }
      { tabItems.length === 1 && tabItems[0].children }
      { tabItems.length > 1 && (
      <Tabs
        activeKey={ activeArea }
        items={ tabItems }
        noPadding
        noTabBarMargin
        onChange={ setActiveArea }
      />
      ) }
    </>
  ), [tabItems, activeArea])
}
