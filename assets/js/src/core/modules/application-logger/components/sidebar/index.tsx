/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Icon } from '@Pimcore/components/icon/icon'
import { ApplicationLoggerSidebarManager } from './application-logger-sidebar-manager'
import { FilterTabContainer } from './tabs/filter/filter-tab-container'
import React from 'react'

export const sidebarManager = new ApplicationLoggerSidebarManager()

sidebarManager.registerEntry({
  key: 'filter',
  icon: <Icon
    options={ { width: '16px', height: '16px' } }
    value={ 'filter' }
        />,
  component: <FilterTabContainer />
})
