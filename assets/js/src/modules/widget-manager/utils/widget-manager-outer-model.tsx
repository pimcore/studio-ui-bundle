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

import { type IJsonModel } from 'flexlayout-react'

export const getInitialModelJson = (): IJsonModel => {
  return {
    global: {
      tabEnableRename: false,
      tabSetEnableMaximize: false,
      rootOrientationVertical: true
    },

    layout: {
      id: 'main',
      type: 'row',
      children: [
        {
          type: 'tabset',
          id: 'main_tabset',
          enableDeleteWhenEmpty: false,
          weight: 50,
          selected: 0,
          children: [
            {
              type: 'tab',
              component: 'inner-widget-manager',
              contentClassName: 'widget-manager-inner-container',
              enableClose: false
            }
          ],
          enableDrag: false,
          enableDrop: false,
          enableTabStrip: false
        },

        {
          type: 'tabset',
          id: 'bottom_tabset',
          enableDeleteWhenEmpty: false,
          weight: 50,
          height: 40,
          selected: 0,
          children: [
            {
              type: 'tab',
              name: 'Interconnected widget',
              component: 'example',
              enableClose: false
            }
          ]
        }
      ]
    },

    borders: [
      {
        type: 'border',
        location: 'left',
        size: 315,
        selected: 0,
        children: [
          {
            type: 'tab',
            icon: 'camera',
            name: 'asset.asset-tree.title',
            component: 'asset-tree',
            enableClose: false
          }
        ]
      },

      {
        type: 'border',
        location: 'right',
        size: 315,
        selected: 0,
        children: [
          {
            type: 'tab',
            icon: 'camera',
            name: 'asset.asset-tree.title',
            component: 'asset-tree',
            enableClose: false,
            config: {
              id: 288
            }
          },

          {
            type: 'tab',
            name: 'actions',
            component: 'widget-manager-actions',
            enableClose: false
          }
        ]
      }
    ]
  }
}
