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
import { componentConfig } from '@Pimcore/modules/app/component-registry/component-registry'
import type { IEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTab'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { ComponentRenderer } from '@sdk/modules/app'
import React from 'react'

export const TAB_VERSIONS: IEditorTab = {
  key: 'versions',
  label: 'version.label',
  children: <ComponentRenderer component={ componentConfig.dataObject.editor.tab.versions.name } />,
  icon: <Icon value={ 'history' } />,
  isDetachable: true,
  hidden: (element): boolean => {
    return !checkElementPermission(element.permissions, 'versions')
  }
}

export const TAB_PREVIEW: IEditorTab = {
  key: 'preview',
  label: 'preview.label',
  children: <ComponentRenderer component={ componentConfig.dataObject.editor.tab.preview.name } />,
  icon: <Icon value={ 'preview' } />,
  isDetachable: true,
  hidden: (element): boolean => {
    return !(element.hasPreview!)
  }
}
