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
import { UnsavedChangesProvider, useOptionalUnsavedChanges } from '@Pimcore/modules/field-definitions/components/editor/unsaved-changes-provider'
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

  // A nested editor (e.g. the custom layout editor opened from within the
  // class editor's modal) joins the surrounding unsaved-changes scope, so
  // that the guard around that modal sees the nested editor's modifications.
  const inheritedUnsavedChanges = useOptionalUnsavedChanges()

  const content = (
    <ItemsProvider>
      {view}
    </ItemsProvider>
  )

  return (
    <AreaProvider area={ area }>
      <SettingsProvider
        { ...rest }
      >
        {inheritedUnsavedChanges === undefined
          ? <UnsavedChangesProvider>{content}</UnsavedChangesProvider>
          : content}
      </SettingsProvider>
    </AreaProvider>
  )
}
