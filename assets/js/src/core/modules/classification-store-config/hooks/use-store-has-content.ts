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
  useClassificationStoreConfigurationCollectionCollectionQuery,
  useClassificationStoreConfigurationGroupCollectionQuery,
  useClassificationStoreConfigurationKeyCollectionQuery
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'

// One row is enough: only the total is read.
const COUNT_ONLY = { filters: { page: 1, pageSize: 1 } }

/**
 * Whether the store holds any configuration - the question a destructive import has to ask before
 * it warns. Sub groups hang off groups, so the three counts below cover every level.
 */
export const useStoreHasContent = (storeId: number): boolean => {
  const { data: groups } = useClassificationStoreConfigurationGroupCollectionQuery({ storeId, body: COUNT_ONLY })
  const { data: keys } = useClassificationStoreConfigurationKeyCollectionQuery({ storeId, body: COUNT_ONLY })
  const { data: collections } = useClassificationStoreConfigurationCollectionCollectionQuery({ storeId, body: COUNT_ONLY })

  // A count that did not answer must not read as an empty store: the warning is shown, not skipped.
  return [groups?.totalItems, keys?.totalItems, collections?.totalItems]
    .some((total) => total === undefined || total > 0)
}
