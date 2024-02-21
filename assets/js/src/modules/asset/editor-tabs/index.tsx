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

export const assetEditorTabManager = new AssetEditorTabManager()

assetEditorTabManager.register({
  key: 'view',
  label: ('view'),
  children: <ViewTab />,
  icon: <Icon name={'image-05'} />
})

assetEditorTabManager.register({
  key: 'edit',
  label: ('edit'),
  children: <EditTab />,
  icon: <Icon name={'edit'} />
})

assetEditorTabManager.register({
  key: 'embedded-metadata',
  label: ('embedded metadata'),
  children: <EmbeddedMetadataTab />,
  icon: <Icon name={'data_sheet'} />
})

assetEditorTabManager.register({
  key: 'custom-metadata',
  label: ('custom metadata'),
  children: <CustomMetadataTab />,
  icon: <Icon name={'data-management-2'} />
})

assetEditorTabManager.register({
  key: 'versions',
  label: ('versions'),
  children: <VersionsTab />,
  icon: <Icon name={'historyOutlined'} />
})

assetEditorTabManager.register({
  key: 'schedule',
  label: ('schedule'),
  children: <ScheduleTab />,
  icon: <Icon name={'scheduleOutlined'} />
})

assetEditorTabManager.register({
  key: 'dependencies',
  label: ('dependencies'),
  children: <DependenciesTab />,
  icon: <Icon name={'hierarchy'} />
})

assetEditorTabManager.register({
  key: 'notes-and-events',
  label: ('notes & events'),
  children: <NotesAndEventsTab />,
  icon: <Icon name={'view_details'} />
})

assetEditorTabManager.register({
  key: 'tags',
  label: ('tag'),
  children: <TagsTab />,
  icon: <Icon name={'tagTwoTone'} />
})

assetEditorTabManager.register({
  key: 'workflow',
  label: ('workflow'),
  children: <WorkflowTab />,
  icon: <Icon name={'workflow'} />
})
