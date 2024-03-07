import { type IJsonModel } from 'flexlayout-react'

export const getInitialModelJson = (): IJsonModel => {
  return {
    global: {
      tabEnableRename: false,
      tabSetEnableMaximize: false
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
          children: []
        }
      ]
    }
  }
}
