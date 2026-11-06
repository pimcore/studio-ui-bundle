/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * Replaces the value of a field filter: find the elements where the field has no value (empty) or any value (notEmpty).
 * Without an operator the filter matches by its value.
 */
export type FilterOperator = 'empty' | 'notEmpty'

export const filterOperators: FilterOperator[] = ['empty', 'notEmpty']
