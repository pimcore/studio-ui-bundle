/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useClassCustomLayoutDeleteMutation } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { type AnyMutationHook } from 'types/react-query'

export const useCustomLayoutDeleteMutation: AnyMutationHook = (options) => {
  const [fetch, result] = useClassCustomLayoutDeleteMutation(options)

  const decoratedFetch = (args: { id: string | number }): ReturnType<typeof fetch> => {
    return fetch({
      customLayoutId: String(args.id)
    })
  }

  return [decoratedFetch, result]
}
