/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable } from 'inversify'
import { type IPerspectivePermissionProvider, type PermissionCategory } from '../../registry/perspective-permission-provider-registry'
import { NavPermission } from '@Pimcore/modules/perspectives/enums/nav-permission'

@injectable()
export class SearchPerspectivePermissionProvider implements IPerspectivePermissionProvider {
  getPermissions (): PermissionCategory[] {
    const [category, permission] = NavPermission.SearchHidden.split('.')

    return [{
      key: category,
      permissions: [{ key: permission }]
    }]
  }
}
