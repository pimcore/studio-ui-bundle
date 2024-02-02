import { type IJsonModel } from 'flexlayout-react'

export const getInitialModelJson = (): IJsonModel => {
  return {
    global: {
      tabEnableRename: false,
      tabSetEnableMaximize: false
    },

    layout: {
      type: 'row',
      weight: 100,
      children: [
        {
          id: 'main',
          type: 'row',
          children: [
            {
              type: 'tabset',
              id: 'main_tabset',
              enableDeleteWhenEmpty: false,
              weight: 50,
              selected: 0,
              children: []
            },

            {
              type: 'tabset',
              id: 'bottom_tabset',
              enableDeleteWhenEmpty: false,
              weight: 50,
              height: 200,
              selected: 0,
              children: []
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
            name: 'actions',
            component: 'widget-manager-actions',
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
            name: 'actions',
            component: 'widget-manager-actions',
            enableClose: false
          }
        ]
      }
    ]
  }
}
