/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
