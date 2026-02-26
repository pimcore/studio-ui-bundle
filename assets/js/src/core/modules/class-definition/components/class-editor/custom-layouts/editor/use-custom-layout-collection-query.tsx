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
import { useClassCustomLayoutCollectionQuery } from '@sdk/api/class-definition'
import { type AnyQueryHook } from 'types/react-query'

export const useDecoratedClassCustomLayoutCollectionQuery: AnyQueryHook = () => {
  const { configuration } = useCurrentConfiguration()
  return useClassCustomLayoutCollectionQuery({ classIds: configuration!.id })
}
