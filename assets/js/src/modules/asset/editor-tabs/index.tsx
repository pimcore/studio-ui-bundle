import React from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { EditTabContainer } from '@Pimcore/modules/asset/editor-tabs/tabs/edit-container'
import { EmbeddedMetadataTabContainer } from '@Pimcore/modules/asset/editor-tabs/tabs/embedded-metadata-container'
import { CustomMetadataTabContainer } from '@Pimcore/modules/asset/editor-tabs/tabs/custom-metadata-container'
import { VersionsTabContainer } from '@Pimcore/modules/asset/editor-tabs/tabs/versions-container'
import { ScheduleTabContainer } from '@Pimcore/modules/asset/editor-tabs/tabs/schedule-container'
import { DependenciesTabContainer } from '@Pimcore/modules/asset/editor-tabs/tabs/dependencies-container'
import { NotesAndEventsTabContainer } from '@Pimcore/modules/asset/editor-tabs/tabs/notes-and-events-container'
import { WorkflowTabContainer } from '@Pimcore/modules/asset/editor-tabs/tabs/workflow-container'
import { TagsTabContainer } from '@Pimcore/modules/asset/editor-tabs/tabs/tags-container'
import { AssetEditorTabManager } from '@Pimcore/modules/editor-tab-manager/utils/asset-tab-manager'
import { PreviewContainer } from '../types/image/tabs/preview-container'

export const assetEditorTabManager = new AssetEditorTabManager()

assetEditorTabManager.register({
  key: 'view',
  label: 'asset.asset-editor-tabs.view',
  children: <PreviewContainer />,
  icon: <Icon name={'image-05'} />
})

assetEditorTabManager.register({
  key: 'edit',
  label: 'asset.asset-editor-tabs.edit',
  children: <EditTabContainer />,
  icon: <Icon name={'edit'} />
})

assetEditorTabManager.register({
  key: 'embedded-metadata',
  label: 'asset.asset-editor-tabs.embedded-metadata',
  children: <EmbeddedMetadataTabContainer />,
  icon: <Icon name={'data-sheet'} />
})

assetEditorTabManager.register({
  key: 'custom-metadata',
  label: 'asset.asset-editor-tabs.custom-metadata',
  children: <CustomMetadataTabContainer />,
  icon: <Icon name={'data-management-2'} />
})

assetEditorTabManager.register({
  key: 'versions',
  label: 'asset.asset-editor-tabs.versions',
  children: <VersionsTabContainer />,
  icon: <Icon name={'history-outlined'} />
})

assetEditorTabManager.register({
  key: 'schedule',
  label: 'asset.asset-editor-tabs.schedule',
  children: <ScheduleTabContainer />,
  icon: <Icon name={'schedule-outlined'} />
})

assetEditorTabManager.register({
  key: 'dependencies',
  label: 'asset.asset-editor-tabs.dependencies',
  children: <DependenciesTabContainer />,
  icon: <Icon name={'hierarchy'} />
})

assetEditorTabManager.register({
  key: 'notes-events',
  label: 'asset.asset-editor-tabs.notes-events',
  children: <NotesAndEventsTabContainer />,
  icon: <Icon name={'view-details'} />
})

assetEditorTabManager.register({
  key: 'tags',
  label: 'asset.asset-editor-tabs.tag',
  children: <TagsTabContainer />,
  icon: <Icon name={'tag-two-tone'} />
})

assetEditorTabManager.register({
  key: 'workflow',
  label: 'asset.asset-editor-tabs.workflow',
  children: <WorkflowTabContainer />,
  icon: <Icon name={'workflow'} />
})
