/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { FieldFilterFrontendType } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/frontendTypes'

export const FIELD_TYPE_MAP = {
  string: {
    frontendType: 'select',
    type: FieldFilterFrontendType.String
  },
  numeric: {
    frontendType: 'id',
    type: FieldFilterFrontendType.Number
  },
  boolean: {
    frontendType: 'boolean',
    type: FieldFilterFrontendType.Boolean
  },
  date: {
    frontendType: 'datetime',
    type: FieldFilterFrontendType.DateTime
  }
}

export const FRONTEND_TO_ORIGINAL_TYPE = Object.fromEntries(
  Object.entries(FIELD_TYPE_MAP).map(([originalType, config]) => [
    config.frontendType,
    originalType
  ])
)
