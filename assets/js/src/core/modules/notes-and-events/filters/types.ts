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

export enum NotesFilterOperator {
  Equal = 'eq',
  LessThan = 'lt',
  GreaterThan = 'gt',
  Like = 'like'
}

export interface NotesFieldFilter {
  operator: NotesFilterOperator
  value: string
  field: string
  type: string
}

export interface NotesFilterColumn {
  key: string
  translationKey: string
  type: string
  frontendType: string
}

export type NotesFilterContribution =
    | { kind: 'filter', value: string }
    | { kind: 'fieldFilters', filters: NotesFieldFilter[] }

export interface NotesFilterContext {
  columns: NotesFilterColumn[]
  getType: UseDynamicTypeResolverReturnType['getType']
}

export interface NotesFilterQuery {
  filter?: string
  fieldFilters?: string
}

export interface OperatorValue {
  operator: NotesFilterOperator
  value: string
}
