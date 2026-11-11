/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { BASE_FIELD_KEYS } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/base-field-keys'

/** The members that belong to the multiValue key itself rather than to the delegate it wraps. */
export const MULTI_VALUE_OWN_KEYS = new Set([...BASE_FIELD_KEYS, 'delegateDatatype', 'delegate', 'variants', 'multiValue', 'maximum'])
