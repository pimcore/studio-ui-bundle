/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export const FIELD_TYPE_MAP = {
  string: {
    frontendType: 'input',
    type: 'system.string'
  },
  numeric: {
    frontendType: 'id',
    type: 'system.id'
  },
  boolean: {
    frontendType: 'checkbox',
    type: 'system.string'
  },
  date: {
    frontendType: 'datetime',
    type: 'system.datetime'
  }
}

export const FRONTEND_TO_ORIGINAL_TYPE = Object.fromEntries(
  Object.entries(FIELD_TYPE_MAP).map(([originalType, config]) => [
    config.frontendType,
    originalType
  ])
)
