/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type IJsonModel } from 'flexlayout-react'

// keeps a splitter from collapsing a tabset to a weight of 0, which would hide it for good
export const TAB_SET_MIN_SIZE = 100

export const getInitialModelJson = (): IJsonModel => {
  return {
    global: {
      tabEnableRename: false,
      tabSetEnableMaximize: false,
      tabSetMinWidth: TAB_SET_MIN_SIZE,
      tabSetMinHeight: TAB_SET_MIN_SIZE,
      enableUseVisibility: true
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
