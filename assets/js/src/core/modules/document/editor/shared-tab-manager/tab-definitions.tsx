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
import type { IEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTab'
import { Icon } from '@Pimcore/components/icon/icon'
import { EditContainer } from './tabs/edit/edit-container'
import { VersionsTabContainer } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-container/versions-container'
import { ComparisonView } from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/versions/comparison-view/comparison-view'
import { SingleView } from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/versions/single-view/single-view'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'

export const TAB_EDIT: IEditorTab = {
  key: 'edit',
  label: 'edit.label',
  children: <EditContainer />,
  icon: <Icon value={ 'edit-pen' } />,
  isDetachable: true
}

export const TAB_VERSIONS: IEditorTab = {
  key: 'versions',
  label: 'version.label',
  children: (
    <VersionsTabContainer
      ComparisonViewComponent={ ComparisonView }
      SingleViewComponent={ SingleView }
    />
  ),
  icon: <Icon value={ 'history' } />,
  isDetachable: true,
  hidden: (element): boolean => {
    return !checkElementPermission(element.permissions, 'versions')
  }
}
