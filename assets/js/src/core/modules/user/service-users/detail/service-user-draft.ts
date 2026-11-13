/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ServiceUser, type UpdateServiceUser } from '../service-users-api-slice-enhanced'

/**
 * The editable part of a service user. Name and state are not part of it: the name is fixed because MCP
 * server access matches it, and the state changes only through deactivation.
 */
export type ServiceUserDraft = Required<UpdateServiceUser>

export const toDraft = (serviceUser: ServiceUser): ServiceUserDraft => ({
  email: serviceUser.email,
  permissions: serviceUser.permissions,
  roles: serviceUser.roles,
  classes: serviceUser.classes,
  docTypes: serviceUser.docTypes,
  assetWorkspaces: serviceUser.assetWorkspaces,
  dataObjectWorkspaces: serviceUser.dataObjectWorkspaces,
  documentWorkspaces: serviceUser.documentWorkspaces,
  responsibleUsers: serviceUser.responsibleUsers ?? [],
  responsibleRoles: serviceUser.responsibleRoles ?? []
})

/**
 * A special workspace setting (layouts, localizedEdit, localizedView) as a list of names. The API hands the
 * three over as string lists and takes them back the same way, although its schema still declares a string;
 * a comma-separated string, the classic storage format, is read as well so a stray value never spreads into
 * single characters.
 */
export const toStringList = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string' && item !== '')
  }

  if (typeof value === 'string') {
    return value.split(',').map((item) => item.trim()).filter((item) => item !== '')
  }

  return []
}
