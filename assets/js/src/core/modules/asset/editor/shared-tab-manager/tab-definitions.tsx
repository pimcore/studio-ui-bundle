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
import React from 'react'
import type { IEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTab'
import { ComponentRenderer } from '@Pimcore/modules/app/component-registry/component-renderer'
import { componentConfig } from '@Pimcore/modules/app/component-registry/component-config'

export const TAB_EMBEDDED_METADATA: IEditorTab = {
  key: 'embedded-metadata',
  label: 'asset.asset-editor-tabs.embedded-metadata',
  children: <ComponentRenderer component={ componentConfig.asset.editor.tab.embeddedMetadata.name } />,
  icon: <Icon value={ 'embedded-metadata' } />,
  isDetachable: true
}

export const TAB_CUSTOM_METADATA: IEditorTab = {
  key: 'custom-metadata',
  label: 'asset.asset-editor-tabs.custom-metadata',
  children: <ComponentRenderer component={ componentConfig.asset.editor.tab.customMetadata.name } />,
  icon: <Icon value={ 'custom-metadata' } />,
  isDetachable: true
}

export const TAB_VERSIONS: IEditorTab = {
  key: 'versions',
  label: 'version.label',
  workspacePermission: 'versions',
  children: <ComponentRenderer component={ componentConfig.asset.editor.tab.versions.name } />,
  icon: <Icon value={ 'history' } />,
  isDetachable: true
}
