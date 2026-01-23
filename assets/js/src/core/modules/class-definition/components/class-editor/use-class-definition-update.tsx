/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useClassDefinitionUpdateMutation } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { useGeneralSettings } from '@Pimcore/modules/field-definitions/components/editor/items/detail/general-settings-provider'
import { useLayout } from '@Pimcore/modules/field-definitions/components/editor/items/detail/layout-provider'
import { type AnyMutationHook } from 'types/react-query'

export const useClassDefinitionUpdate: AnyMutationHook = (options) => {
  const [fetch, result] = useClassDefinitionUpdateMutation(options)
  const { getLayout } = useLayout()
  const { generalSettings } = useGeneralSettings()

  const decoratedFetch = (): ReturnType<typeof fetch> => {
    return fetch({
      id: generalSettings!.id,
      classDefinitionUpdate: {
        configuration: {
          children: getLayout().children ?? []
        },
        values: {
          ...generalSettings!,
          // @todo check how to handle new icon types with backend
          icon: ''
        }
      }
    })
  }

  return [decoratedFetch, result]
}
