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

import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'
import {
  EmbeddedMetadataTabContainer
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/embedded-metadata/embedded-metadata-container'
import {
  CustomMetadataTabContainer
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/custom-metadata-container'
import type { IEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTab'
import {
  VersionsTabContainer
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-container/versions-container'
import {
  ComparisonView
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/comparison-view/comparison-view'
import { SingleView } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/single-view/single-view'

export const TAB_EMBEDDED_METADATA: IEditorTab = {
  key: 'embedded-metadata',
  label: 'asset.asset-editor-tabs.embedded-metadata',
  children: <EmbeddedMetadataTabContainer />,
  icon: <Icon value={ 'embedded-metadata' } />,
  isDetachable: true
}

export const TAB_CUSTOM_METADATA: IEditorTab = {
  key: 'custom-metadata',
  label: 'asset.asset-editor-tabs.custom-metadata',
  children: <CustomMetadataTabContainer />,
  icon: <Icon value={ 'custom-metadata' } />,
  isDetachable: true
}

export const TAB_VERSIONS: IEditorTab = {
  key: 'versions',
  label: 'version.label',
  workspacePermission: 'versions',
  children: <VersionsTabContainer
    ComparisonViewComponent={ ComparisonView }
    SingleViewComponent={ SingleView }
            />,
  icon: <Icon value={ 'history' } />,
  isDetachable: true
}
