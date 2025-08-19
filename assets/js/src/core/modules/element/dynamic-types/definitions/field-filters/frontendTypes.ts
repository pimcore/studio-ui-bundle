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
 * Enum for field filter types used in dynamic type field filters.
 * These types determine how the filtering logic is applied on the backend.
 */
export enum FieldFilterFrontendType {

  String = 'system.string',
  Fulltext = 'system.fulltext'
}
