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

import { type Permissions } from '@Pimcore/modules/asset/asset-api-slice.gen'

export const checkElementPermission = (permissions: Permissions, permission: string): boolean => {
  return Object.keys(permissions).includes(permission) && permissions[permission]
}
