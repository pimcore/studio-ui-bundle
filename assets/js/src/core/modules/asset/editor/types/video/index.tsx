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

import React from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { EditTabContainer } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/edit-container'
import {
  EmbeddedMetadataTabContainer
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/embedded-metadata/embedded-metadata-container'
import {
  CustomMetadataTabContainer
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/custom-metadata-container'
import { VersionsTabContainer } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/versions-container'
import { ScheduleTabContainer } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/schedule/schedule-container'
import {
  DependenciesTabContainer
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/dependencies/dependencies-container'
import {
  NotesAndEventsTabContainer
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-container'
import { WorkflowTabContainer } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/workflow/workflow-container'
import { TagsTabContainer } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/tags-container'
import { type VideoTabManager } from './tab-manager/video-tab-manager'
import { PreviewContainer } from './tab-manager/tabs/preview/preview-container'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import {
  PropertiesContainer
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/properties/properties-container'

export const videoTabManager = container.get<VideoTabManager>(serviceIds['Asset/Editor/VideoTabManager'])

moduleSystem.registerModule({
  onInit: () => {
    videoTabManager.register({
      key: 'view',
      label: 'asset.asset-editor-tabs.view',
      children: <PreviewContainer />,
      icon: <Icon name={ 'image-05' } />
    })

    videoTabManager.register({
      key: 'edit',
      label: 'asset.asset-editor-tabs.edit',
      children: <EditTabContainer />,
      icon: <Icon name={ 'edit' } />
    })

    videoTabManager.register({
      key: 'embedded-metadata',
      label: 'asset.asset-editor-tabs.embedded-metadata',
      children: <EmbeddedMetadataTabContainer />,
      icon: <Icon name={ 'data-sheet' } />
    })

    videoTabManager.register({
      key: 'custom-metadata',
      label: 'asset.asset-editor-tabs.custom-metadata',
      children: <CustomMetadataTabContainer />,
      icon: <Icon name={ 'data-management-2' } />
    })

    videoTabManager.register({
      key: 'properties',
      label: 'asset.asset-editor-tabs.properties.text',
      children: <PropertiesContainer />,
      icon: <Icon name={ 'settings2' } />,
      isDetachable: true
    })

    videoTabManager.register({
      key: 'versions',
      label: 'asset.asset-editor-tabs.versions',
      children: <VersionsTabContainer />,
      icon: <Icon name={ 'history-outlined' } />
    })

    videoTabManager.register({
      key: 'schedule',
      label: 'asset.asset-editor-tabs.schedule',
      children: <ScheduleTabContainer />,
      icon: <Icon name={ 'schedule-outlined' } />,
      isDetachable: true
    })

    videoTabManager.register({
      key: 'dependencies',
      label: 'asset.asset-editor-tabs.dependencies',
      children: <DependenciesTabContainer />,
      icon: <Icon name={ 'hierarchy' } />
    })

    videoTabManager.register({
      key: 'notes-events',
      label: 'asset.asset-editor-tabs.notes-events',
      children: <NotesAndEventsTabContainer />,
      icon: <Icon name={ 'view-details' } />
    })

    videoTabManager.register({
      key: 'tags',
      label: 'asset.asset-editor-tabs.tag',
      children: <TagsTabContainer />,
      icon: <Icon name={ 'tag-two-tone' } />,
      isDetachable: true
    })

    videoTabManager.register({
      key: 'workflow',
      label: 'asset.asset-editor-tabs.workflow',
      children: <WorkflowTabContainer />,
      icon: <Icon name={ 'workflow' } />,
      isDetachable: true
    })
  }
})
