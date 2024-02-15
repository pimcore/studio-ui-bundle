import React from 'react'
import { ViewTab } from '@Pimcore/modules/asset/toolbar/tabs/container/view'
import { EditTab } from '@Pimcore/modules/asset/toolbar/tabs/container/edit'
import { registerTab } from '@Pimcore/modules/asset/tab/utils/tab-registry'
import { Icon } from '@Pimcore/components/icon/icon'
import { EmbeddedMetadataTab } from '@Pimcore/modules/asset/toolbar/tabs/container/embeddedMetadata'
import { CustomMetadataTab } from '@Pimcore/modules/asset/toolbar/tabs/container/customMetadata'
import { VersionsTab } from '@Pimcore/modules/asset/toolbar/tabs/container/versions'
import { ScheduleTab } from '@Pimcore/modules/asset/toolbar/tabs/container/schedule'
import { DependenciesTab } from '@Pimcore/modules/asset/toolbar/tabs/container/dependencies'
import { NotesAndEventsTab } from '@Pimcore/modules/asset/toolbar/tabs/container/notes-and-events'
import { WorkflowTab } from '@Pimcore/modules/asset/toolbar/tabs/container/workflow'
import { TagsTab } from '@Pimcore/modules/asset/toolbar/tabs/container/tags'

registerTab({
  key: 'view',
  label: ('view'),
  children: <ViewTab />,
  icon: <Icon name={'view'} />
})

registerTab({
  key: 'edit',
  label: ('edit'),
  children: <EditTab />,
  icon: <Icon name={'edit'} />
})

registerTab({
  key: 'embedded-metadata',
  label: ('embedded metadata'),
  children: <EmbeddedMetadataTab />,
  icon: <Icon name={'embedded-metadata'} />
})

registerTab({
  key: 'custom-metadata',
  label: ('custom metadata'),
  children: <CustomMetadataTab />,
  icon: <Icon name={'custom-metadata'} />
})

registerTab({
  key: 'versions',
  label: ('versions'),
  children: <VersionsTab />,
  icon: <Icon name={'versions'} />
})

registerTab({
  key: 'schedule',
  label: ('schedule'),
  children: <ScheduleTab />,
  icon: <Icon name={'schedule'} />
})

registerTab({
  key: 'dependencies',
  label: ('dependencies'),
  children: <DependenciesTab />,
  icon: <Icon name={'dependencies'} />
})

registerTab({
  key: 'notes-and-events',
  label: ('notes & events'),
  children: <NotesAndEventsTab />,
  icon: <Icon name={'notes-events'} />
})

registerTab({
  key: 'tags',
  label: ('tag'),
  children: <TagsTab />,
  icon: <Icon name={'tag'} />
})

registerTab({
  key: 'workflow',
  label: ('workflow'),
  children: <WorkflowTab />,
  icon: <Icon name={'workflow'} />
})
