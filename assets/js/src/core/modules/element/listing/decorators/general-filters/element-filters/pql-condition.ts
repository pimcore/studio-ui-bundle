/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ColumnFilter } from '@Pimcore/modules/app/types/column-filter'
import { pqlFilterType } from '../context-layer/provider/pql-filter/pql-filter-provider'

// The backend accepts one system.pql column filter per request, so further conditions are ANDed into it.
export const addPqlCondition = (columnFilters: ColumnFilter[], condition: string): ColumnFilter[] => {
  const pqlFilter = columnFilters.find((columnFilter) => columnFilter.type === pqlFilterType)

  if (pqlFilter === undefined) {
    return [...columnFilters, { type: pqlFilterType, filterValue: condition }]
  }

  return columnFilters.map((columnFilter) => columnFilter === pqlFilter
    ? { ...columnFilter, filterValue: `(${String(columnFilter.filterValue)}) AND (${condition})` }
    : columnFilter
  )
}

// String tokens of the Generic Data Index PQL lexer: their parentheses are not grouping.
const pqlStringTokens = /query\(".*?"\)|'(?:[^']|'')*'|"(?:[^"]|"")*"/gi

const isSelfContained = (pql: string): boolean => {
  let depth = 0

  for (const parenthesis of pql.replaceAll(pqlStringTokens, '').replaceAll(/[^()]/g, '')) {
    depth += parenthesis === '(' ? 1 : -1

    if (depth < 0) {
      return false
    }
  }

  return depth === 0
}

/** Reverses addPqlCondition: the query without the condition, or undefined when the condition was not added. */
export const removePqlCondition = (pql: string, condition: string): string | undefined => {
  if (pql === condition) {
    return ''
  }

  const suffix = `) AND (${condition})`

  if (!pql.startsWith('(') || !pql.endsWith(suffix)) {
    return undefined
  }

  const query = pql.slice(1, -suffix.length)

  return isSelfContained(query) ? query : undefined
}
