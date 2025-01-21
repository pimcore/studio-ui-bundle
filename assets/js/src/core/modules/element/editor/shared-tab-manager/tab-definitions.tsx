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
  PropertiesContainer
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-container'
import type { IEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTab'
import { ScheduleTabContainer } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/schedule/schedule-container'
import {
  DependenciesTabContainer
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/dependencies/dependencies-container'
import { WorkflowTabContainer } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-container'
import {
  NotesAndEventsTabContainer
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-container'
import { TagsTabContainer } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-container'

export const TAB_PROPERTIES: IEditorTab = {
  key: 'properties',
  label: 'properties.label',
  workspacePermission: 'properties',
  children: <PropertiesContainer />,
  icon: <Icon value={ 'settings' } />,
  isDetachable: true
}
export const TAB_SCHEDULE: IEditorTab = {
  key: 'schedule',
  label: 'schedule.label',
  workspacePermission: 'settings',
  children: <ScheduleTabContainer />,
  icon: <Icon value={ 'schedule' } />,
  isDetachable: true
}
export const TAB_DEPENDENCIES: IEditorTab = {
  key: 'dependencies',
  label: 'dependencies.label',

  children: <DependenciesTabContainer />,
  icon: <Icon value={ 'dependencies' } />,
  isDetachable: true
}
export const TAB_WORKFLOW: IEditorTab = {
  key: 'workflow',
  label: 'workflow.label',
  userPermission: 'workflow_details',
  children: <WorkflowTabContainer />,
  icon: <Icon value={ 'workflow' } />,
  isDetachable: true
}
export const TAB_NOTES_AND_EVENTS: IEditorTab = {
  key: 'notes-events',
  label: 'notes-and-events.label',
  userPermission: 'notes_events',
  children: <NotesAndEventsTabContainer />,
  icon: <Icon value={ 'notes-events' } />,
  isDetachable: true
}
export const TAB_TAGS: IEditorTab = {
  key: 'tags',
  label: 'tags.label',
  userPermission: 'tags_assignment',
  children: <TagsTabContainer />,
  icon: <Icon value={ 'tag' } />,
  isDetachable: true
}
