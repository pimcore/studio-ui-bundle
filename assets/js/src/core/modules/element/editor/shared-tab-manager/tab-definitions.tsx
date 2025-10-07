/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Icon } from '@Pimcore/components/icon/icon'
import type { IEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTab'
import { componentConfig, ComponentRenderer } from '@sdk/modules/app'
import React from 'react'
import { checkElementPermission } from '../../permissions/permission-helper'

export const TAB_PROPERTIES: IEditorTab = {
  key: 'properties',
  label: 'properties.label',
  workspacePermission: 'properties',
  children: <ComponentRenderer component={ componentConfig.element.editor.tab.properties.name } />,
  icon: <Icon value={ 'settings' } />,
  isDetachable: true
}
export const TAB_SCHEDULE: IEditorTab = {
  key: 'schedule',
  label: 'schedule.label',
  workspacePermission: 'settings',
  children: <ComponentRenderer component={ componentConfig.element.editor.tab.schedule.name } />,
  icon: <Icon value={ 'schedule' } />,
  isDetachable: true,
  hidden: (element): boolean => {
    return !checkElementPermission(element.permissions, 'versions') ||
      !checkElementPermission(element.permissions, 'settings')
  }
}
export const TAB_DEPENDENCIES: IEditorTab = {
  key: 'dependencies',
  label: 'dependencies.label',
  children: <ComponentRenderer component={ componentConfig.element.editor.tab.dependencies.name } />,
  icon: <Icon value={ 'dependencies' } />,
  isDetachable: true
}
export const TAB_WORKFLOW: IEditorTab = {
  key: 'workflow',
  label: 'workflow.label',
  userPermission: 'workflow_details',
  children: <ComponentRenderer component={ componentConfig.element.editor.tab.workflow.name } />,
  icon: <Icon value={ 'workflow' } />,
  isDetachable: true
}
export const TAB_NOTES_AND_EVENTS: IEditorTab = {
  key: 'notes-events',
  label: 'notes-and-events.label',
  userPermission: 'notes_events',
  children: <ComponentRenderer component={ componentConfig.element.editor.tab.notesAndEvents.name } />,
  icon: <Icon value={ 'notes-events' } />,
  isDetachable: true
}
export const TAB_TAGS: IEditorTab = {
  key: 'tags',
  label: 'tags.label',
  userPermission: 'tags_assignment',
  children: <ComponentRenderer component={ componentConfig.element.editor.tab.tags.name } />,
  icon: <Icon value={ 'tag' } />,
  isDetachable: true
}
