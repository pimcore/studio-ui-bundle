/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useClassFieldCollectionUpdateMutation } from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import { useGeneralSettings } from '@Pimcore/modules/field-definitions/components/editor/items/detail/general-settings-provider'
import { useLayout } from '@Pimcore/modules/field-definitions/components/editor/items/detail/layout-provider'
import { type AnyMutationHook } from 'types/react-query'

export const useFieldCollectionUpdate: AnyMutationHook = (options) => {
  const [fetch, result] = useClassFieldCollectionUpdateMutation(options)
  const { getLayout } = useLayout()
  const { generalSettings } = useGeneralSettings()

  const decoratedFetch = (): ReturnType<typeof fetch> => {
    // generalSettings.id holds the field collection key (mapped in the items query)
    const key = (generalSettings as any)?.id as string

    return fetch({
      key,
      fieldCollectionUpdate: {
        configuration: {
          children: getLayout()!.children ?? []
        },
        values: {
          ...generalSettings
        }
      }
    })
  }

  return [decoratedFetch, result]
}
