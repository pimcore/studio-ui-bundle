/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

interface GroupedPermissions {
  default: Array<{ key: string }>
  bundles: Array<{ key: string }>
}

export interface PermissionFormValues {
  permissionsDefault: string[]
  permissionsBundles: string[]
}

const isIn = (group: Array<{ key: string }>) => (permission: string): boolean =>
  group.some((item) => item.key === permission)

/** Splits granted permissions into the two selects the user and role editors use. */
export const splitPermissions = (permissions: string[], grouped: GroupedPermissions): PermissionFormValues => ({
  permissionsDefault: permissions.filter(isIn(grouped.default)),
  permissionsBundles: permissions.filter(isIn(grouped.bundles))
})

export const mergePermissions = ({ permissionsDefault, permissionsBundles }: PermissionFormValues): string[] => [
  ...permissionsDefault,
  ...permissionsBundles
]
