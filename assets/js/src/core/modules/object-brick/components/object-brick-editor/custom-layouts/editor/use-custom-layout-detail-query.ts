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
import { useClassObjectBrickCustomLayoutGetQuery } from '@sdk/api/class-definition'
import { type AnyQueryHook } from 'types/react-query'

export const useObjectBrickCustomLayoutDetailQuery: AnyQueryHook = (data) => {
  const { configuration } = useCurrentConfiguration()
  const key = String(configuration?.id ?? '')
  const customLayoutId = String(data?.id ?? '')
  const skip = key === '' || customLayoutId === ''

  const result = useClassObjectBrickCustomLayoutGetQuery(
    { key, customLayoutId },
    { skip }
  )

  // The OB custom layout endpoint returns 404 when no OB-specific layout has
  // been saved yet.  Treat that as an empty layout so the accessor in
  // detail.tsx creates a blank base panel node instead of surfacing an error.
  // We must include `id` in the synthetic response so that generalSettings.id
  // is available to the save mutation.
  if (
    result.error !== undefined &&
    'status' in result.error &&
    result.error.status === 404
  ) {
    return {
      ...result,
      error: undefined,
      isError: false,
      data: {
        id: customLayoutId,
        name: '',
        description: '',
        creationDate: 0,
        modificationDate: 0,
        userOwner: 0,
        classId: '',
        default: false,
        layoutDefinition: null
      }
    } as any
  }

  return result
}
