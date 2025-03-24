/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { isEmptyValue } from '@Pimcore/utils/type-utils'

export const getGeoComponentWidth = (width: string): string => isEmptyValue(width) ? '500px' : width
export const getGeoComponentHeight = (height: string): string => isEmptyValue(height) ? '250px' : height
