/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import {
  useClassificationStoreConfigurationStoreTreeQuery,
  type ClassificationStoreConfigurationStoreTreeNode
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'

export interface StoreEngine {
  engine: string | null | undefined
  engineCapabilities: string[] | null | undefined
}

// Same request as the store tree of the configuration screen, so the cache answers it.
export const useStoreEngine = (storeId: number): StoreEngine => {
  const { data } = useClassificationStoreConfigurationStoreTreeQuery(undefined)
  const store = data?.find((node) => node.id === storeId) as ClassificationStoreConfigurationStoreTreeNode | undefined

  return { engine: store?.engine, engineCapabilities: store?.engineCapabilities }
}
