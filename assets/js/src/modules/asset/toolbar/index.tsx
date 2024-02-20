import React from 'react'
import { ViewTab } from '@Pimcore/modules/asset/toolbar/tabs/container/view'
import { EditTab } from '@Pimcore/modules/asset/toolbar/tabs/container/edit'
import { Icon } from '@Pimcore/components/icon/icon'
import { EmbeddedMetadataTab } from '@Pimcore/modules/asset/toolbar/tabs/container/embeddedMetadata'
import { CustomMetadataTab } from '@Pimcore/modules/asset/toolbar/tabs/container/customMetadata'
import { VersionsTab } from '@Pimcore/modules/asset/toolbar/tabs/container/versions'
import { ScheduleTab } from '@Pimcore/modules/asset/toolbar/tabs/container/schedule'
import { DependenciesTab } from '@Pimcore/modules/asset/toolbar/tabs/container/dependencies'
import { NotesAndEventsTab } from '@Pimcore/modules/asset/toolbar/tabs/container/notes-and-events'
import { WorkflowTab } from '@Pimcore/modules/asset/toolbar/tabs/container/workflow'
import { TagsTab } from '@Pimcore/modules/asset/toolbar/tabs/container/tags'
import { AssetTabManager } from '@Pimcore/modules/tab-manager/utils/asset-tab-manager'

const assetTabManager = new AssetTabManager()

assetTabManager.register({
  key: 'view',
  label: ('view'),
  children: <ViewTab />,
  icon: <Icon name={'image-05'} />
})

assetTabManager.register({
  key: 'edit',
  label: ('edit'),
  children: <EditTab />,
  icon: <Icon name={'edit'} />
})

assetTabManager.register({
  key: 'embedded-metadata',
  label: ('embedded metadata'),
  children: <EmbeddedMetadataTab />,
  icon: <Icon name={'data_sheet'} />
})

assetTabManager.register({
  key: 'custom-metadata',
  label: ('custom metadata'),
  children: <CustomMetadataTab />,
  icon: <Icon name={'data-management-2'} />
})

assetTabManager.register({
  key: 'versions',
  label: ('versions'),
  children: <VersionsTab />,
  icon: <Icon name={'historyOutlined'} />
})

assetTabManager.register({
  key: 'schedule',
  label: ('schedule'),
  children: <ScheduleTab />,
  icon: <Icon name={'scheduleOutlined'} />
})

assetTabManager.register({
  key: 'dependencies',
  label: ('dependencies'),
  children: <DependenciesTab />,
  icon: <Icon name={'hierarchy'} />
})

assetTabManager.register({
  key: 'notes-and-events',
  label: ('notes & events'),
  children: <NotesAndEventsTab />,
  icon: <Icon name={'view_details'} />
})

assetTabManager.register({
  key: 'tags',
  label: ('tag'),
  children: <TagsTab />,
  icon: <Icon name={'tagTwoTone'} />
})

assetTabManager.register({
  key: 'workflow',
  label: ('workflow'),
  children: <WorkflowTab />,
  icon: <Icon name={'workflow'} />
})
