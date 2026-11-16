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
  useClassificationStoreConfigurationKeyCollectionQuery,
  useClassificationStoreConfigurationSubGroupCollectionQuery
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'

// One row is enough: only the total is read.
const COUNT_ONLY = { filters: { page: 1, pageSize: 1 } }

/**
 * Whether the store holds any configuration - the question a destructive import has to ask before
 * it warns. Sub groups are a store-level collection of their own, so all four levels are counted.
 *
 * `enabled` false asks for nothing and still answers true: a caller that may not read the store
 * may not conclude it is empty either.
 */
export const useStoreHasContent = (storeId: number, enabled = true): boolean => {
  const request = { storeId, body: COUNT_ONLY }
  const options = { skip: !enabled }
  const { data: groups } = useClassificationStoreConfigurationGroupCollectionQuery(request, options)
  const { data: keys } = useClassificationStoreConfigurationKeyCollectionQuery(request, options)
  const { data: collections } = useClassificationStoreConfigurationCollectionCollectionQuery(request, options)
  const { data: subGroups } = useClassificationStoreConfigurationSubGroupCollectionQuery(request, options)

  // A count that did not answer must not read as an empty store: the warning is shown, not skipped.
  return [groups?.totalItems, keys?.totalItems, collections?.totalItems, subGroups?.totalItems]
    .some((total) => total === undefined || total > 0)
}
