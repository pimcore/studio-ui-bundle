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

export const TAB_PROPERTIES: IEditorTab = {
  key: 'properties',
  label: 'properties.label',
  children: <PropertiesContainer />,
  icon: <Icon name={ 'settings2' } />,
  isDetachable: true
}
export const TAB_SCHEDULE: IEditorTab = {
  key: 'schedule',
  label: 'schedule.label',
  children: <ScheduleTabContainer />,
  icon: <Icon name={ 'schedule-outlined' } />,
  isDetachable: true
}
export const TAB_DEPENDENCIES: IEditorTab = {
  key: 'dependencies',
  label: 'dependencies.label',
  children: <DependenciesTabContainer />,
  icon: <Icon name={ 'hierarchy' } />,
  isDetachable: true
}
