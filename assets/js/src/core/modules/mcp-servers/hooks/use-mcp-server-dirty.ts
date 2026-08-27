/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useMemo } from 'react'
import { isEqual } from 'lodash'
import { type McpServer, type McpServerAccessGrant } from '../mcp-servers-api-slice.gen'

interface DirtySnapshot {
  name: string
  urlSlug: string
  description: string
  enabled: boolean
  tools: string[]
  shareGlobal: boolean
  sharedUsers: McpServerAccessGrant[]
  sharedRoles: McpServerAccessGrant[]
}

interface UseMcpServerDirtyInput extends DirtySnapshot {
  server: McpServer | null
  onDirtyChange: (dirty: boolean) => void
}

/**
 * Reports whether the editor's live values differ from the loaded server
 * (or, in create mode, from the empty defaults). Deliberately depends only on
 * primitives and stable state references, so the reporting effect stays inert
 * until something the user touched actually changes.
 */
export function useMcpServerDirty ({
  server,
  name,
  urlSlug,
  description,
  enabled,
  tools,
  shareGlobal,
  sharedUsers,
  sharedRoles,
  onDirtyChange
}: UseMcpServerDirtyInput): void {
  const initialSnapshot = useMemo<DirtySnapshot>(() => ({
    name: server?.name ?? '',
    urlSlug: server?.urlSlug ?? '',
    description: server?.description ?? '',
    enabled: server?.enabled ?? true,
    tools: server?.tools ?? [],
    shareGlobal: server?.shareGlobal ?? true,
    sharedUsers: server?.sharedUsers ?? [],
    sharedRoles: server?.sharedRoles ?? []
  }), [server])

  useEffect(() => {
    const current: DirtySnapshot = {
      name,
      urlSlug,
      description,
      enabled,
      tools,
      shareGlobal,
      sharedUsers,
      sharedRoles
    }
    onDirtyChange(!isEqual(current, initialSnapshot))
  }, [
    name,
    urlSlug,
    description,
    enabled,
    tools,
    shareGlobal,
    sharedUsers,
    sharedRoles,
    initialSnapshot,
    onDirtyChange
  ])
}
