/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil } from 'lodash'

/** The type whose filter a classification store key takes: a `multiValue` key is filtered as its delegate. */
export const keyFilterTypeOf = (fieldDefinition: unknown): string => {
  const { fieldType, fieldtype: lowerFieldtype, delegateDatatype } = fieldDefinition as { fieldtype?: string, fieldType?: string, delegateDatatype?: string | null }
  const fieldtype = fieldType ?? lowerFieldtype ?? 'unknown'

  return fieldtype === 'multiValue' && !isNil(delegateDatatype) && delegateDatatype !== '' ? delegateDatatype : fieldtype
}
