/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { type ISidebarEntry } from '@Pimcore/modules/element/sidebar/sidebar-manager'
import { type IDocumentContext } from '@Pimcore/modules/document/document-provider'
import {
  ContentSettingsSidebar
} from '../sidebar/tabs/content-settings/content-settings-sidebar'
import {
  AreablockTypesSidebar
} from '../sidebar/tabs/areablock-types/areablock-types-sidebar'
import {
  NavigationSidebar
} from '../sidebar/tabs/navigation/navigation-sidebar'
import {
  DocumentConfigurationSidebar
} from '../sidebar/tabs/document-configuration/document-configuration-sidebar'
import { checkAreablockTypesVisibility } from '../sidebar/visibility/areablock-types-visibility'

export const SIDEBAR_AREABLOCK_TYPES: ISidebarEntry<IDocumentContext> = {
  key: 'areablock-types',
  icon: <Icon value="new" />,
  component: <AreablockTypesSidebar />,
  tooltip: 'add-areas',
  isVisible: checkAreablockTypesVisibility
}

export const SIDEBAR_CONTENT_SETTINGS: ISidebarEntry<IDocumentContext> = {
  key: 'content-settings',
  icon: <Icon value="content-settings" />,
  component: <ContentSettingsSidebar />,
  tooltip: 'content-settings'
}

export const SIDEBAR_NAVIGATION: ISidebarEntry<IDocumentContext> = {
  key: 'navigation',
  icon: <Icon value="navigation" />,
  component: <NavigationSidebar />,
  tooltip: 'navigation.sidebar-title'
}

export const SIDEBAR_DOCUMENT_CONFIGURATION: ISidebarEntry<IDocumentContext> = {
  key: 'document-configuration',
  icon: <Icon value="document-configurations" />,
  component: <DocumentConfigurationSidebar />,
  tooltip: 'document-configuration.sidebar-title'
}
