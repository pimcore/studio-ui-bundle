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

import { type ElementPermissions } from '@Pimcore/modules/element/element-api-slice-enhanced'
import { isUndefined } from 'lodash'

export const checkElementPermission = (permissions: ElementPermissions | undefined, permission: keyof ElementPermissions): boolean => {
  if (isUndefined(permissions)) {
    return false
  }
  return permissions[permission] === true
}
