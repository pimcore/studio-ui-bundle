/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type FilterValues } from '@Pimcore/components/filters'
import { type FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'

/**
 * The initial filters for an asset selector scoped to a configured search path, or undefined
 * without one. The string filter is a wildcard search, so the trailing slash keeps `/a/b` from
 * also matching `/a/b2/...`.
 */
export const buildSearchPathFilters = (searchPath: string, label: string): FilterValues | undefined => {
  if (searchPath === '') {
    return undefined
  }

  const searchPathFilter: FieldFilter = {
    key: 'fullpath',
    type: 'system.string',
    filterValue: searchPath.endsWith('/') ? searchPath : `${searchPath}/`,
    locale: null,
    meta: { translationKey: label }
  }

  return { fieldFilters: [searchPathFilter] }
}
