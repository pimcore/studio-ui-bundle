/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { UseDynamicTypeResolverReturnType } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import type { DisplayManyToManyRelationValueItem } from '../hooks/use-value'

/**
 * A single filterable column of the relation grid.
 *
 * `key` addresses the grid column (and the stored filter), `valueKey` addresses
 * the value inside a row - the two differ for visible field columns, whose grid
 * column id is an encoded identifier while the value is stored under the plain
 * field key.
 */
export interface RelationFilterColumn {
  key: string
  valueKey: string
  title: string
  /** Dynamic type of the column, resolved against the registries as in any listing. */
  type: string
  /** Field type of the column, resolved when `type` is an adapter or unknown. */
  frontendType?: string
  config?: Record<string, any>
}

export type RelationRowMatcher = (item: DisplayManyToManyRelationValueItem) => boolean

export type VisibleFieldsMap = Map<number, Record<string, any>>

export interface RelationFilterContribution {
  kind: 'rowMatchers'
  matchers: RelationRowMatcher[]
}

export interface RelationFilterContext {
  columns: RelationFilterColumn[]
  visibleFieldsMap?: VisibleFieldsMap
  getType: UseDynamicTypeResolverReturnType['getType']
}

/**
 * The relation grid holds its rows in memory, so filters do not compose into a
 * backend request but into a row matcher that is applied to the displayed value.
 */
export interface RelationFilterQuery {
  matchRow?: RelationRowMatcher
}
