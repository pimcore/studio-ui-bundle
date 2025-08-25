/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import {
  DocumentEditorSidebarManager
} from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/edit/sidebar/sidebar-manager'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'
import {
  HelloWorldContainer
} from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/edit/sidebar/tabs/hello-world/hello-world-container'

export const sidebarManager = new DocumentEditorSidebarManager()

sidebarManager.registerEntry({
  key: 'hello-world',
  icon: <Icon
    options={ { width: '16px', height: '16px' } }
    value={ 'edit' }
        />,
  component: <HelloWorldContainer />,
  tooltip: 'Hello World'
})
