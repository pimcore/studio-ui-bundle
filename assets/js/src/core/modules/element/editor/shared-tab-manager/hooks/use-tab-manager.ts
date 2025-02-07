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

import { TabManagerContext } from '@Pimcore/modules/element/editor/shared-tab-manager/tab-manager-context'
import { useContext } from 'react'
import { type TabManager } from '@Pimcore/modules/element/editor/tab-manager/tab-manager'
import _ from 'lodash'

export const useTabManager = (): TabManager => {
  const context = useContext(TabManagerContext)

  if (_.isEmpty(context)) {
    throw new Error('useTabManager must be used within TabManagerProvider')
  }

  return context.tabManager!
}
