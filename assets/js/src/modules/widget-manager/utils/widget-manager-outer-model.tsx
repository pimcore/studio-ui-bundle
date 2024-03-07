import i18n from '@Pimcore/app/i18n'
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
          height: 200,
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
            name: i18n.t('asset.asset-tree.title'),
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
            name: i18n.t('asset.asset-tree.title'),
            component: 'asset-tree',
            enableClose: false,
            config: {
              id: 288
            }
          }
        ]
      }
    ]
  }
}
