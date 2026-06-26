/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ReactNode, type FC } from 'react'

export interface FilterControlProps<TValue> {
  value: TValue
  onChange: (value: TValue) => void
}

export interface FilterSectionProps<TValue, TContext> extends FilterControlProps<TValue> {
  context: TContext
}

export interface FilterDescriptor<TValue = unknown, TContribution = unknown, TContext = unknown> {
  key: string
  defaultValue: TValue
  order?: number
  section?: string
  isEnabled: (context: TContext) => boolean
  isVisible?: (context: TContext) => boolean
  Control?: FC<FilterControlProps<TValue>>
  renderSection?: (props: FilterSectionProps<TValue, TContext>) => ReactNode
  toQuery?: (value: TValue, context: TContext) => TContribution | undefined
}

export type AnyFilterDescriptor<TContribution = unknown, TContext = unknown> =
  FilterDescriptor<any, TContribution, TContext>

export type FilterValues = Record<string, unknown>
