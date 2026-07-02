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

export interface TranslationColumnFilter {
  key?: string
  type: string
  filterValue: string
}

export interface TranslationFilterColumn {
  key: string
  label: string
  type: string
  frontendType: string
}

export type TranslationFilterContribution =
    | { kind: 'columnFilters', filters: TranslationColumnFilter[] }

export interface TranslationFilterContext {
  columns: TranslationFilterColumn[]
  getType: UseDynamicTypeResolverReturnType['getType']
}

export interface TranslationFilterQuery {
  columnFilters?: TranslationColumnFilter[]
}
