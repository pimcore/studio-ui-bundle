import React from 'react'
import { ViewTab } from '@Pimcore/modules/asset/editor-tabs/tabs/container/view'
import { EditTab } from '@Pimcore/modules/asset/editor-tabs/tabs/container/edit'
import { Icon } from '@Pimcore/components/icon/icon'
import { EmbeddedMetadataTab } from '@Pimcore/modules/asset/editor-tabs/tabs/container/embeddedMetadata'
import { CustomMetadataTab } from '@Pimcore/modules/asset/editor-tabs/tabs/container/customMetadata'
import { VersionsTab } from '@Pimcore/modules/asset/editor-tabs/tabs/container/versions'
import { ScheduleTab } from '@Pimcore/modules/asset/editor-tabs/tabs/container/schedule'
import { DependenciesTab } from '@Pimcore/modules/asset/editor-tabs/tabs/container/dependencies'
import { NotesAndEventsTab } from '@Pimcore/modules/asset/editor-tabs/tabs/container/notes-and-events'
import { WorkflowTab } from '@Pimcore/modules/asset/editor-tabs/tabs/container/workflow'
import { TagsTab } from '@Pimcore/modules/asset/editor-tabs/tabs/container/tags'
import { AssetEditorTabManager } from '@Pimcore/modules/editor-tab-manager/utils/asset-tab-manager'
import i18n from '@Pimcore/app/i18n'

export const assetEditorTabManager = new AssetEditorTabManager()

assetEditorTabManager.register({
  key: 'view',
  label: i18n.t('asset.asset-editor-tabs.view'),
  children: <ViewTab />,
  icon: <Icon name={'image-05'} />
})

assetEditorTabManager.register({
  key: 'edit',
  label: i18n.t('asset.asset-editor-tabs.edit'),
  children: <EditTab />,
  icon: <Icon name={'edit'} />
})

assetEditorTabManager.register({
  key: 'embedded-metadata',
  label: i18n.t('asset.asset-editor-tabs.embedded-metadata'),
  children: <EmbeddedMetadataTab />,
  icon: <Icon name={'data-sheet'} />
})

assetEditorTabManager.register({
  key: 'custom-metadata',
  label: i18n.t('asset.asset-editor-tabs.custom-metadata'),
  children: <CustomMetadataTab />,
  icon: <Icon name={'data-management-2'} />
})

assetEditorTabManager.register({
  key: 'versions',
  label: i18n.t('asset.asset-editor-tabs.versions'),
  children: <VersionsTab />,
  icon: <Icon name={'history-outlined'} />
})

assetEditorTabManager.register({
  key: 'schedule',
  label: i18n.t('asset.asset-editor-tabs.schedule'),
  children: <ScheduleTab />,
  icon: <Icon name={'schedule-outlined'} />
})

assetEditorTabManager.register({
  key: 'dependencies',
  label: i18n.t('asset.asset-editor-tabs.dependencies'),
  children: <DependenciesTab />,
  icon: <Icon name={'hierarchy'} />
})

assetEditorTabManager.register({
  key: 'notes-events',
  label: i18n.t('asset.asset-editor-tabs.notes-events'),
  children: <NotesAndEventsTab />,
  icon: <Icon name={'view-details'} />
})

assetEditorTabManager.register({
  key: 'tags',
  label: i18n.t('asset.asset-editor-tabs.tag'),
  children: <TagsTab />,
  icon: <Icon name={'tag-two-tone'} />
})

assetEditorTabManager.register({
  key: 'workflow',
  label: i18n.t('asset.asset-editor-tabs.workflow'),
  children: <WorkflowTab />,
  icon: <Icon name={'workflow'} />
})
