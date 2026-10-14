/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type TFunction } from 'i18next'
import { type McpServer, type McpTool } from './mcp-servers-api-slice.gen'

/**
 * Turn a display name into a url-safe slug matching [a-z0-9-]+.
 */
export const slugify = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * The union of the OAuth scopes required by the selected tools.
 */
export const deriveScopes = (toolNames: string[], tools: McpTool[]): string[] => {
  const scopes = new Set<string>()

  toolNames.forEach((toolName) => {
    const tool = tools.find((candidate) => candidate.name === toolName)
    if (tool !== undefined) {
      scopes.add(tool.requiredScope)
    }
  })

  return Array.from(scopes)
}

type AccessInfo = Pick<McpServer, 'shareGlobal' | 'sharedUsers' | 'sharedRoles'>

/**
 * Who can connect to the server, e.g. "any authenticated user" or "Users: 3, Roles: 1".
 * Only a public server or an explicit MCP Server Access grant lets anyone connect:
 * neither admins nor the owner get it implicitly, and a grant with only Config Read
 * or Edit connects no one, so only grants with `canAccess` are counted.
 */
export const describeAccess = (server: AccessInfo, t: TFunction): string => {
  if (server.shareGlobal) {
    return t('mcp-servers.access.global-extra')
  }

  const userCount = server.sharedUsers.filter((grant) => grant.canAccess).length
  const roleCount = server.sharedRoles.filter((grant) => grant.canAccess).length
  const parts: string[] = []

  // Count-neutral labels ("Users: 3"): grammatical number differs per language
  // (Polish has one/few/many forms), and the translation files can only mirror the
  // English keys, so a "N user(s)" phrase cannot be right in every language.
  // `number`, not `count`, keeps i18next's plural resolution out of it.
  if (userCount > 0) {
    parts.push(t('mcp-servers.access.users-count', { number: userCount }))
  }

  if (roleCount > 0) {
    parts.push(t('mcp-servers.access.roles-count', { number: roleCount }))
  }

  if (parts.length === 0) {
    return t('mcp-servers.access.nobody')
  }

  return parts.join(', ')
}
