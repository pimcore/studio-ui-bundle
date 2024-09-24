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
import { VersionsTabContainer } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/versions-container'
import {
  NotesAndEventsTabContainer
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-container'
import { TagsTabContainer } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/tags-container'
import { WorkflowTabContainer } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/workflow/workflow-container'
import type { IEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTab'

export const TAB_EMBEDDED_METADATA: IEditorTab = {
  key: 'embedded-metadata',
  label: 'asset.asset-editor-tabs.embedded-metadata',
  children: <EmbeddedMetadataTabContainer />,
  icon: <Icon name={ 'data-sheet' } />,
  isDetachable: true
}

export const TAB_CUSTOM_METADATA: IEditorTab = {
  key: 'custom-metadata',
  label: 'asset.asset-editor-tabs.custom-metadata',
  children: <CustomMetadataTabContainer />,
  icon: <Icon name={ 'data-management-2' } />,
  isDetachable: true
}

export const TAB_VERSIONS: IEditorTab = {
  key: 'versions',
  label: 'asset.asset-editor-tabs.versions',
  children: <VersionsTabContainer />,
  icon: <Icon name={ 'history-outlined' } />,
  isDetachable: true
}

export const TAB_NOTES_AND_EVENTS: IEditorTab = {
  key: 'notes-events',
  label: 'asset.asset-editor-tabs.notes-events',
  children: <NotesAndEventsTabContainer />,
  icon: <Icon name={ 'view-details' } />,
  isDetachable: true
}

export const TAB_TAGS: IEditorTab = {
  key: 'tags',
  label: 'asset.asset-editor-tabs.tag',
  children: <TagsTabContainer />,
  icon: <Icon name={ 'tag-two-tone' } />,
  isDetachable: true
}

export const TAB_WORKFLOW: IEditorTab = {
  key: 'workflow',
  label: 'asset.asset-editor-tabs.workflow',
  children: <WorkflowTabContainer />,
  icon: <Icon name={ 'workflow' } />,
  isDetachable: true
}
