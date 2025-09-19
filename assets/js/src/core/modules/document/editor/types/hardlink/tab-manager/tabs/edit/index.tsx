/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { type IEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTab'
import { Icon } from '@Pimcore/components/icon/icon'
import { HardlinkEditContainer } from './hardlink-edit-container'

export const TAB_HARDLINK_EDIT: IEditorTab = {
  key: 'edit',
  label: 'edit.label',
  children: <HardlinkEditContainer />,
  icon: <Icon value="edit" />
}
