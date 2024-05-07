import React from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { EditTabContainer } from '@Pimcore/modules/asset/editor/documentT/tab-manager/tabs/edit-container'
import { EmbeddedMetadataTabContainer } from '@Pimcore/modules/asset/editor/document/tab-manager/tabs/embedded-metadata-container'
import { CustomMetadataTabContainer } from '@Pimcore/modules/asset/editor/document/tab-manager/tabs/custom-metadata-container'
import { VersionsTabContainer } from '@Pimcore/modules/asset/editor/document/tab-manager/tabs/versions-container'
import { ScheduleTabContainer } from '@Pimcore/modules/asset/editor/document/tab-manager/tabs/schedule-container'
import { DependenciesTabContainer } from '@Pimcore/modules/asset/editor/document/tab-manager/tabs/dependencies-container'
import { NotesAndEventsTabContainer } from '@Pimcore/modules/asset/editor/document/tab-manager/tabs/notes-and-events-container'
import { WorkflowTabContainer } from '@Pimcore/modules/asset/editor/document/tab-manager/tabs/workflow-container'
import { TagsTabContainer } from '@Pimcore/modules/asset/editor/document/tab-manager/tabs/tags-container'
import { DocumentTabManager } from './tab-manager/document-tab-manager'
import { PreviewContainer } from './tab-manager/tabs/preview/preview-container'

export const documentTabManager = new DocumentTabManager()

documentTabManager.register({
  key: 'view',
  label: 'asset.asset-editor-tabs.view',
  children: <PreviewContainer />,
  icon: <Icon name={ 'image-05' } />
})

documentTabManager.register({
  key: 'edit',
  label: 'asset.asset-editor-tabs.edit',
  children: <EditTabContainer />,
  icon: <Icon name={ 'edit' } />
})

documentTabManager.register({
  key: 'embedded-metadata',
  label: 'asset.asset-editor-tabs.embedded-metadata',
  children: <EmbeddedMetadataTabContainer />,
  icon: <Icon name={ 'data-sheet' } />
})

documentTabManager.register({
  key: 'custom-metadata',
  label: 'asset.asset-editor-tabs.custom-metadata',
  children: <CustomMetadataTabContainer />,
  icon: <Icon name={ 'data-management-2' } />
})

documentTabManager.register({
  key: 'versions',
  label: 'asset.asset-editor-tabs.versions',
  children: <VersionsTabContainer />,
  icon: <Icon name={ 'history-outlined' } />
})

documentTabManager.register({
  key: 'schedule',
  label: 'asset.asset-editor-tabs.schedule',
  children: <ScheduleTabContainer />,
  icon: <Icon name={ 'schedule-outlined' } />
})

documentTabManager.register({
  key: 'dependencies',
  label: 'asset.asset-editor-tabs.dependencies',
  children: <DependenciesTabContainer />,
  icon: <Icon name={ 'hierarchy' } />
})

documentTabManager.register({
  key: 'notes-events',
  label: 'asset.asset-editor-tabs.notes-events',
  children: <NotesAndEventsTabContainer />,
  icon: <Icon name={ 'view-details' } />
})

documentTabManager.register({
  key: 'tags',
  label: 'asset.asset-editor-tabs.tag',
  children: <TagsTabContainer />,
  icon: <Icon name={ 'tag-two-tone' } />
})

documentTabManager.register({
  key: 'workflow',
  label: 'asset.asset-editor-tabs.workflow',
  children: <WorkflowTabContainer />,
  icon: <Icon name={ 'workflow' } />
})
