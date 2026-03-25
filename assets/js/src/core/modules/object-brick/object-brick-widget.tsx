/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { Editor } from '@Pimcore/modules/field-definitions/components/editor'
import {
  useClassObjectBrickDeleteMutation,
  useClassObjectBrickGetByKeyQuery,
  useClassObjectBrickGetLayoutByKeyQuery,
  useClassObjectBrickGetTreeQuery
} from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import { ObjectBrickAddModal } from '@Pimcore/modules/object-brick/components/object-brick-editor/add-modal'
import { ObjectBrickGeneralSettingsFormFields } from '@Pimcore/modules/object-brick/components/object-brick-editor/general-settings-form-fields'
import { useObjectBrickUpdate } from '@Pimcore/modules/object-brick/components/object-brick-editor/use-object-brick-update'
import { type ImportExportConfig } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { type ConfigurationPartial } from '@Pimcore/modules/field-definitions/components/editor/items/provider'
import { ObjectBrickCustomLayoutEditor } from '@Pimcore/modules/object-brick/components/object-brick-editor/custom-layouts/custom-layout-editor'
import { ObjectBrickLayoutProvider } from '@Pimcore/modules/object-brick/object-brick-layout-provider'
import { LayoutProvider as DefaultLayoutProvider } from '@Pimcore/modules/field-definitions/components/editor/items/detail/layout-provider'
import { useSettings } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { type LayoutProviderProps } from '@Pimcore/modules/field-definitions/utils/layout-provider-factory'
import { type AnyMutationHook, type AnyQueryHook } from 'types/react-query'

// Wrapper: accepts { id } (where id == key), maps to backend { key }, and injects id into result
const useObjectBrickGetByKeyQuery: AnyQueryHook = (args: { id: string | number }) => {
  const key = String(args.id)
  const result = useClassObjectBrickGetByKeyQuery({ key })

  if (result.data !== undefined) {
    return {
      ...result,
      data: {
        ...result.data,
        // Inject id so the general settings form field name="id" works
        id: result.data.key
      }
    }
  }

  return result
}

// Wrapper: accepts { id } (where id == key), maps to backend { key }
const useObjectBrickGetLayoutByKeyQuery: AnyQueryHook = (args: { id: string | number }) => {
  const key = String(args.id)
  return useClassObjectBrickGetLayoutByKeyQuery({ key })
}

// Wrapper: uses the tree endpoint and flattens folders+items into a flat ConfigurationPartial list.
// Icons come from the API; 'area-brick' is the fallback when the API returns no value.
const useObjectBrickCollectionQuery: AnyQueryHook = () => {
  const result = useClassObjectBrickGetTreeQuery()

  const mappedData = useMemo(() => {
    if (result.data === undefined || !('items' in result.data)) return undefined

    const mappedItems: ConfigurationPartial[] = []

    for (const node of result.data.items) {
      if ('children' in node) {
        // Folder node — flatten its children; each child already carries its group name
        for (const child of node.children) {
          mappedItems.push({
            id: child.key,
            name: child.name,
            group: child.group ?? undefined,
            icon: { value: (child.icon?.value !== undefined && child.icon.value !== '') ? child.icon.value : 'object-bricks' }
          })
        }
      } else {
        // Leaf node at top level (no group)
        mappedItems.push({
          id: node.key,
          name: node.name,
          group: node.group ?? undefined,
          icon: { value: (node.icon?.value !== undefined && node.icon.value !== '') ? node.icon.value : 'object-bricks' }
        })
      }
    }

    return { ...result.data, items: mappedItems }
  }, [result.data])

  if (mappedData !== undefined) {
    return { ...result, data: mappedData } as any
  }

  return result
}
// Wrapper: maps delete to use key (id) as the key arg
const useObjectBrickDeleteMutation: AnyMutationHook = (...args) => {
  const [deleteFn, result] = useClassObjectBrickDeleteMutation(...args)

  const wrappedDelete = (arg: { id: string | number }): ReturnType<typeof deleteFn> => {
    return deleteFn({ key: String(arg.id) })
  }

  return [wrappedDelete as any, result]
}

const objectBrickImportExportConfig: ImportExportConfig = {
  getExportUrl: (id) => `${getPrefix()}/class/object-brick/${String(id)}/export`,
  getImportUrl: (id) => `${getPrefix()}/class/object-brick/${String(id)}/import`
}

/**
 * Dual layout provider: feeds the same layout data into both the singleton
 * context (used by inner editor components like DetailSave, DetailSidebar,
 * etc.) AND the OB-specific isolated context (read by DetailParentTree via
 * customLayouts.parent.useLayout in the custom layout editor).
 *
 * This prevents the custom layout editor's parent tree from accidentally
 * reading the class definition editor's layout when both editors are open.
 */
const ObjectBrickDualLayoutProvider = ({ children, ...rest }: Omit<LayoutProviderProps, 'fieldDefinitionRegistry'>): React.JSX.Element => {
  const { fieldDefinitionRegistry } = useSettings()

  return (
    <DefaultLayoutProvider { ...rest }>
      <ObjectBrickLayoutProvider
        { ...rest }
        fieldDefinitionRegistry={ fieldDefinitionRegistry }
      >
        {children}
      </ObjectBrickLayoutProvider>
    </DefaultLayoutProvider>
  )
}

export const ObjectBrickWidget = (): React.JSX.Element => {
  return (
    <Editor
      AddModal={ ObjectBrickAddModal }
      GeneralSettingsFormFields={ ObjectBrickGeneralSettingsFormFields }
      LayoutProvider={ ObjectBrickDualLayoutProvider }
      area={ ['objectbrick'] }
      customLayouts={ {
        ModalContent: <ObjectBrickCustomLayoutEditor />
      } }
      importExportConfig={ objectBrickImportExportConfig }
      useDetailGeneralSettingsQuery={ useObjectBrickGetByKeyQuery }
      useDetailLayoutQuery={ useObjectBrickGetLayoutByKeyQuery }
      useDetailUpdateMutation={ useObjectBrickUpdate }
      useItemsDeleteMutation={ useObjectBrickDeleteMutation }
      useItemsQuery={ useObjectBrickCollectionQuery }
    />
  )
}
