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
 * A short human-readable access summary, e.g. "Global", "Admin-only" or "3 users, 1 role".
 */
export const describeAccess = (server: AccessInfo, t: TFunction): string => {
  if (server.shareGlobal) {
    return t('mcp-servers.access.global')
  }

  const userCount = server.sharedUsers.length
  const roleCount = server.sharedRoles.length
  const parts: string[] = []

  if (userCount > 0) {
    parts.push(`${userCount} ${userCount === 1 ? t('mcp-servers.access.user') : t('mcp-servers.access.users')}`)
  }

  if (roleCount > 0) {
    parts.push(`${roleCount} ${roleCount === 1 ? t('mcp-servers.access.role') : t('mcp-servers.access.roles')}`)
  }

  if (parts.length === 0) {
    return t('mcp-servers.access.admin-only')
  }

  return parts.join(', ')
}
