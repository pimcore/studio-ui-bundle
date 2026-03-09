/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useClassCustomLayoutUpdateMutation } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { useGeneralSettings } from '@Pimcore/modules/field-definitions/components/editor/items/detail/general-settings-provider'
import { useCustomLayoutLayout } from '@Pimcore/modules/field-definitions/components/editor/custom-layout/items/detail/layout-provider'
import { type AnyMutationHook } from 'types/react-query'

export const useCustomLayoutUpdateMutation: AnyMutationHook = (options) => {
  const [fetch, result] = useClassCustomLayoutUpdateMutation(options)
  const { getLayout } = useCustomLayoutLayout()
  const { generalSettings } = useGeneralSettings()

  const decoratedFetch = (): ReturnType<typeof fetch> => {
    return fetch({
      customLayoutId: String(generalSettings!.id),
      customLayoutUpdate: {
        configuration: {
          children: getLayout()!.children ?? []
        },
        values: {
          ...generalSettings!
        }
      }
    })
  }

  return [decoratedFetch, result]
}
