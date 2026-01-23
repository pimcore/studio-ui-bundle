/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export interface ColumnFilter {
  type: string
  filterValue: any
}

export interface DateFromColumnFilter extends ColumnFilter {
  key: string
  type: string
  filterValue: {
    operator: string
    value: string | null
  } | string | number
}

export interface NumberColumnFilter extends ColumnFilter {
  type: string
  filterValue: number
}

export interface BooleanColumnFilter extends ColumnFilter {
  type: string
  filterValue: number
}

export interface StringColumnFilter extends ColumnFilter {
  type: string
  filterValue: string
}
