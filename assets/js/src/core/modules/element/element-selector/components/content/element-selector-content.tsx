/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useMemo } from 'react'
import { useElementSelectorHelper } from '../../provider/element-selector/use-element-selector-helper'
import { AssetSelectorListing } from '@Pimcore/modules/asset/element-selector/asset-selector-listing'
import { type ITabsProps, Tabs } from '@Pimcore/components/tabs/tabs'
import { DataObjectSelectorListing } from '@Pimcore/modules/data-object/element-selector/data-object-selector-listing'
import { useAreaControl } from '../../provider/area-control/use-area-control'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import { DocumentSelectorListing } from '@Pimcore/modules/document/element-selector/document-selector-listing'
import { SelectionType } from '../../provider/element-selector/element-selector-provider'

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
        <DocumentSelectorListing />
      </div>
    })
  }

  const startTabs: NonNullable<ITabsProps['items']> = []

  for (const customTab of helper.config.customTabs ?? []) {
    const item: NonNullable<ITabsProps['items']>[number] = {
      // Prefixed so a caller's key cannot collide with a built-in area.
      key: `custom:${customTab.key}`,
      label: customTab.label,
      forceRender: true,
      children: <div style={ { height: '65vh' } }>
        { customTab.render({
          selectionType: helper.config.selectionType ?? SelectionType.Multiple,
          finish: (result) => {
            customTab.onFinish(result)
            helper.close()
          },
          close: helper.close
        }) }
      </div>
    }

    if (customTab.position === 'start') {
      startTabs.push(item)
    } else {
      tabItems.push(item)
    }
  }

  tabItems.unshift(...startTabs)

  useEffect(() => {
    if (tabItems.length > 0 && activeArea === undefined) {
      setActiveArea(tabItems[0].key)
    }
  }, [])

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
