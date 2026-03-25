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
  useClassFieldCollectionDeleteMutation,
  useClassFieldCollectionGetByKeyQuery,
  useClassFieldCollectionGetLayoutByKeyQuery,
  useClassFieldCollectionGetTreeQuery
} from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import { FieldCollectionAddModal } from '@Pimcore/modules/field-collection/components/field-collection-editor/add-modal'
import { FieldCollectionGeneralSettingsFormFields } from '@Pimcore/modules/field-collection/components/field-collection-editor/general-settings-form-fields'
import { useFieldCollectionUpdate } from '@Pimcore/modules/field-collection/components/field-collection-editor/use-field-collection-update'
import { type ImportExportConfig } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { type ConfigurationPartial } from '@Pimcore/modules/field-definitions/components/editor/items/provider'
import { type AnyMutationHook, type AnyQueryHook } from 'types/react-query'

// Wrapper: accepts { id } (where id == key), maps to backend { key }, and injects id into result
const useFieldCollectionGetByKeyQuery: AnyQueryHook = (args: { id: string | number }) => {
  const key = String(args.id)
  const result = useClassFieldCollectionGetByKeyQuery({ key })

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
const useFieldCollectionGetLayoutByKeyQuery: AnyQueryHook = (args: { id: string | number }) => {
  const key = String(args.id)
  return useClassFieldCollectionGetLayoutByKeyQuery({ key })
}

// Wrapper: uses the tree endpoint and flattens folders+items into a flat ConfigurationPartial list.
// Icons come from the API; 'field-collection-field' is the fallback when the API returns no value.
// TODO: The backend currently returns an incorrect icon value for field collections.
//       Once the backend is fixed, the fallback 'field-collection-field' will no longer be needed.
const useFieldCollectionCollectionQuery: AnyQueryHook = () => {
  const result = useClassFieldCollectionGetTreeQuery({})

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
            icon: { value: (child.icon?.value !== undefined && child.icon.value !== '') ? child.icon.value : 'field-collection-field' }
          })
        }
      } else {
        // Leaf node at top level (no group)
        mappedItems.push({
          id: node.key,
          name: node.name,
          group: node.group ?? undefined,
          icon: { value: (node.icon?.value !== undefined && node.icon.value !== '') ? node.icon.value : 'field-collection-field' }
        })
      }
    }

    return { ...result.data, items: mappedItems }
  }, [result.data])

  if (mappedData !== undefined) {
    return { ...result, data: mappedData } as any
  }  return result
}

// Wrapper: maps delete to use key (id) as the key arg
const useFieldCollectionDeleteMutation: AnyMutationHook = (...args) => {
  const [deleteFn, result] = useClassFieldCollectionDeleteMutation(...args)

  const wrappedDelete = (arg: { id: string | number }): ReturnType<typeof deleteFn> => {
    return deleteFn({ key: String(arg.id) })
  }

  return [wrappedDelete as any, result]
}

const fieldCollectionImportExportConfig: ImportExportConfig = {
  getExportUrl: (id) => `${getPrefix()}/class/field-collection/${String(id)}/export`,
  getImportUrl: (id) => `${getPrefix()}/class/field-collection/${String(id)}/import`
}

export const FieldCollectionWidget = (): React.JSX.Element => {
  return (
    <Editor
      AddModal={ FieldCollectionAddModal }
      GeneralSettingsFormFields={ FieldCollectionGeneralSettingsFormFields }
      area={ ['fieldcollection'] }
      importExportConfig={ fieldCollectionImportExportConfig }
      useDetailGeneralSettingsQuery={ useFieldCollectionGetByKeyQuery }
      useDetailLayoutQuery={ useFieldCollectionGetLayoutByKeyQuery }
      useDetailUpdateMutation={ useFieldCollectionUpdate }
      useItemsDeleteMutation={ useFieldCollectionDeleteMutation }
      useItemsQuery={ useFieldCollectionCollectionQuery }
    />
  )
}
