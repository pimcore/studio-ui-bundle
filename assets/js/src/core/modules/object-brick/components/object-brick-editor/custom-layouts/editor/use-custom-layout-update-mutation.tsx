/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCurrentConfiguration } from '@Pimcore/modules/field-definitions/components/editor/custom-layout/current-configuration-provider'
import { useGeneralSettings } from '@Pimcore/modules/field-definitions/components/editor/items/detail/general-settings-provider'
import { useItems } from '@Pimcore/modules/field-definitions/components/editor/items/provider'
import { useObjectBrickCustomLayoutLayout } from '@Pimcore/modules/object-brick/components/object-brick-editor/custom-layouts/object-brick-custom-layout-layout-provider'
import { useClassObjectBrickCustomLayoutUpdateMutation } from '@sdk/api/class-definition'
import { type AnyMutationHook } from 'types/react-query'

export const useObjectBrickCustomLayoutUpdateMutation: AnyMutationHook = (options) => {
  const [fetch, result] = useClassObjectBrickCustomLayoutUpdateMutation(options)
  const { getLayout } = useObjectBrickCustomLayoutLayout()
  const { generalSettings } = useGeneralSettings()
  const { configuration } = useCurrentConfiguration()
  const { activeConfiguration } = useItems()
  const obKey = String(configuration?.id ?? '')
  // Use the custom layout ID from the inner activeConfiguration (the UUID from
  // the collection), not from generalSettings.id.  The OB backend may return a
  // composite id (e.g. "uuid.brick.obKey") in the GET response which would
  // corrupt the PUT URL if used here.
  const customLayoutId = String(activeConfiguration?.id ?? '')

  const decoratedFetch = (): ReturnType<typeof fetch> => {
    return fetch({
      key: obKey,
      customLayoutId,
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
