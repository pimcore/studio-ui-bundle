/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const RESERVED_WORDS = new Set([
  'id', 'key', 'path', 'type', 'index', 'classname',
  'creationdate', 'userowner', 'value', 'class', 'list', 'fullpath', 'childs', 'children', 'values', 'cachetag',
  'cachetags', 'parent', 'published', 'valuefromparent', 'userpermissions', 'dependencies',
  'modificationdate', 'usermodification', 'byid', 'bypath', 'data', 'versions', 'properties',
  'permissions', 'permissionsforuser', 'childamount', 'apipluginbroker', 'resource',
  'parentclass', 'definition', 'locked', 'language'
])

export const isReservedWord = (word: string): boolean => {
  return RESERVED_WORDS.has(word.toLowerCase())
}
