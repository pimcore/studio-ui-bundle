/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isString } from 'lodash'
import { type ClassificationStoreVariantLayout } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'

/**
 * The name a declared variant addresses its values by; a row carrying no name declares none.
 *
 * One reader for both sides of the declaration: the key definition dialog reads the variants out of
 * the free-form definition blob, where a row written by an API client need not carry a name at all,
 * and the object editor reads the ones the key layout publishes. An absent name is the empty name
 * the dialog already refuses, rather than a crash there and an unheaded slot in the editor.
 */
export const variantNameOf = (variant: ClassificationStoreVariantLayout): string =>
  isString(variant.name) ? variant.name : ''
