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

import type { UserPermission } from '@Pimcore/modules/user/user-api-slice.gen'

export const generatePassword = (len = 20): string => {
  const string = 'abcdefghijklmnopqrstuvwxyz'
  const numeric = '0123456789'
  const charset = string + numeric
  let password = ''

  const randomValues = new Uint32Array(len)
  window.crypto.getRandomValues(randomValues)

  for (let i = 0; i < len; i++) {
    const randomIndex = randomValues[i] % charset.length
    password += charset[randomIndex]
  }

  return password
}

export const getGroupedPermissions = (availablePermissions: any[]): { default: UserPermission[], bundles: UserPermission[] } => {
  const permissions = {
    default: [] as UserPermission[],
    bundles: [] as UserPermission[]
  }

  availablePermissions.forEach((permission) => {
    if (permission.category !== null && permission.category.length !== 0) {
      permissions.bundles.push(permission as UserPermission)
    } else {
      permissions.default.push(permission as UserPermission)
    }
  })

  return permissions
}
