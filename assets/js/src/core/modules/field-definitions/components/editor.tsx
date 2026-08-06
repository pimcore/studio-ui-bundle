/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { AreaProvider, type AreaProviderProps } from '@Pimcore/modules/field-definitions/components/editor/area-provider'
import { ItemsProvider } from '@Pimcore/modules/field-definitions/components/editor/items/provider'
import { SettingsProvider, type SettingsProviderProps } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { EditorView } from '@Pimcore/modules/field-definitions/components/editor/view'
import { type DynamicTypeFieldDefinitionRegistry } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-registry'
import React from 'react'

export interface EditorProps {
  area: AreaProviderProps['area']
  AddModal?: SettingsProviderProps['AddModal']
  useItemsQuery: SettingsProviderProps['useItemsQuery']
  useItemsDeleteMutation?: SettingsProviderProps['useItemsDeleteMutation']
  useDetailGeneralSettingsQuery: SettingsProviderProps['useDetailGeneralSettingsQuery']
  useDetailLayoutQuery?: SettingsProviderProps['useDetailLayoutQuery']
  useDetailLayoutAccessor?: SettingsProviderProps['useDetailLayoutAccessor']
  useDetailUpdateMutation: SettingsProviderProps['useDetailUpdateMutation']
  GeneralSettingsFormFields: SettingsProviderProps['GeneralSettingsFormFields']
  LayoutProvider?: SettingsProviderProps['LayoutProvider']
  useLayout?: SettingsProviderProps['useLayout']
  fieldDefinitionRegistry?: DynamicTypeFieldDefinitionRegistry
  customLayouts?: SettingsProviderProps['customLayouts']
  importExportConfig?: SettingsProviderProps['importExportConfig']
  hideTreeExpanders?: SettingsProviderProps['hideTreeExpanders']
  view?: React.JSX.Element
}

export const Editor = (props: EditorProps): React.JSX.Element => {
  const {
    area,
    view = <EditorView />,
    ...rest
  } = props

  return (
    <AreaProvider area={ area }>
      <SettingsProvider
        { ...rest }
      >
        <ItemsProvider>
          {view}
        </ItemsProvider>
      </SettingsProvider>
    </AreaProvider>
  )
}
