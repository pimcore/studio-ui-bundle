import React from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { EditTabContainer } from '@Pimcore/modules/asset/editor/image/tab-manager/tabs/edit-container'
import { EmbeddedMetadataTabContainer } from '@Pimcore/modules/asset/editor/image/tab-manager/tabs/embedded-metadata-container'
import { CustomMetadataTabContainer } from '@Pimcore/modules/asset/editor/image/tab-manager/tabs/custom-metadata-container'
import { VersionsTabContainer } from '@Pimcore/modules/asset/editor/image/tab-manager/tabs/versions-container'
import { ScheduleTabContainer } from '@Pimcore/modules/asset/editor/image/tab-manager/tabs/schedule-container'
import { DependenciesTabContainer } from '@Pimcore/modules/asset/editor/image/tab-manager/tabs/dependencies-container'
import { NotesAndEventsTabContainer } from '@Pimcore/modules/asset/editor/image/tab-manager/tabs/notes-and-events-container'
import { WorkflowTabContainer } from '@Pimcore/modules/asset/editor/image/tab-manager/tabs/workflow-container'
import { TagsTabContainer } from '@Pimcore/modules/asset/editor/image/tab-manager/tabs/tags-container'
import { ImageTabManager } from './tab-manager/image-tab-manager'
import { PreviewContainer } from './tab-manager/tabs/preview/preview-container'

export const imageTabManager = new ImageTabManager()

imageTabManager.register({
  key: 'view',
  label: 'asset.asset-editor-tabs.view',
  children: <PreviewContainer />,
  icon: <Icon name={ 'image-05' } />
})

imageTabManager.register({
  key: 'edit',
  label: 'asset.asset-editor-tabs.edit',
  children: <EditTabContainer />,
  icon: <Icon name={ 'edit' } />
})

imageTabManager.register({
  key: 'embedded-metadata',
  label: 'asset.asset-editor-tabs.embedded-metadata',
  children: <EmbeddedMetadataTabContainer />,
  icon: <Icon name={ 'data-sheet' } />
})

imageTabManager.register({
  key: 'custom-metadata',
  label: 'asset.asset-editor-tabs.custom-metadata',
  children: <CustomMetadataTabContainer />,
  icon: <Icon name={ 'data-management-2' } />
})

imageTabManager.register({
  key: 'versions',
  label: 'asset.asset-editor-tabs.versions',
  children: <VersionsTabContainer />,
  icon: <Icon name={ 'history-outlined' } />
})

imageTabManager.register({
  key: 'schedule',
  label: 'asset.asset-editor-tabs.schedule',
  children: <ScheduleTabContainer />,
  icon: <Icon name={ 'schedule-outlined' } />
})

imageTabManager.register({
  key: 'dependencies',
  label: 'asset.asset-editor-tabs.dependencies',
  children: <DependenciesTabContainer />,
  icon: <Icon name={ 'hierarchy' } />
})

imageTabManager.register({
  key: 'notes-events',
  label: 'asset.asset-editor-tabs.notes-events',
  children: <NotesAndEventsTabContainer />,
  icon: <Icon name={ 'view-details' } />
})

imageTabManager.register({
  key: 'tags',
  label: 'asset.asset-editor-tabs.tag',
  children: <TagsTabContainer />,
  icon: <Icon name={ 'tag-two-tone' } />
})

imageTabManager.register({
  key: 'workflow',
  label: 'asset.asset-editor-tabs.workflow',
  children: <WorkflowTabContainer />,
  icon: <Icon name={ 'workflow' } />
})
