/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useClassificationStoreConfigurationStoreTreeQuery } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'

// Same request as the store tree of the configuration screen, so the cache answers it.
export const useStoreIdentifier = (storeId: number): string | null | undefined => {
  const { data } = useClassificationStoreConfigurationStoreTreeQuery(undefined)

  return data?.find((node) => node.id === storeId)?.identifier
}
