/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isEmptyValue } from '@Pimcore/utils/type-utils'

export const getGeoComponentWidth = (width: string): string => isEmptyValue(width) ? '500px' : width
export const getGeoComponentHeight = (height: string): string => isEmptyValue(height) ? '250px' : height
