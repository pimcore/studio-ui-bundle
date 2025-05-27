/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ElementPermissionKeys, type ElementPermissions } from '@Pimcore/modules/element/element-api-slice-enhanced'
import { isUndefined } from 'lodash'

export const checkElementPermission = (permissions: ElementPermissions | undefined, permission: ElementPermissionKeys): boolean => {
  if (isUndefined(permissions)) {
    return false
  }
  return permissions[permission] === true
}
