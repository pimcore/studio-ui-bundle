/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useRef } from 'react'
import { isEqual } from 'lodash'
import { type McpServer, type McpServerAccessGrant } from '../mcp-servers-api-slice.gen'

export interface McpServerSnapshot {
  name: string
  urlSlug: string
  description: string
  enabled: boolean
  tools: string[]
  shareGlobal: boolean
  sharedUsers: McpServerAccessGrant[]
  sharedRoles: McpServerAccessGrant[]
}

/**
 * The editor's baseline for a server: its persisted values, or the create-mode
 * defaults when there is no server yet.
 */
export function serverSnapshot (server: McpServer | null): McpServerSnapshot {
  return {
    name: server?.name ?? '',
    urlSlug: server?.urlSlug ?? '',
    description: server?.description ?? '',
    enabled: server?.enabled ?? true,
    tools: server?.tools ?? [],
    shareGlobal: server?.shareGlobal ?? true,
    sharedUsers: server?.sharedUsers ?? [],
    sharedRoles: server?.sharedRoles ?? []
  }
}

interface UseMcpServerDirtyInput extends McpServerSnapshot {
  server: McpServer | null
  onDirtyChange: (dirty: boolean) => void
  onResync: (snapshot: McpServerSnapshot) => void
}

/**
 * Reports whether the editor's live values differ from the persisted server, and
 * keeps the two in step across saves.
 *
 * The baseline and the editor's fields must be seeded from the *same* server
 * object. When the persisted server moves — on load, or on the refetch a
 * successful save triggers — this adopts it as the new baseline AND asks the
 * editor to re-seed its fields from it (`onResync`); both then agree by
 * construction, so the dirty flag clears no matter what array ordering the
 * backend returns. Without that re-seed, a reordered tools/sharing array left
 * the tab stuck dirty after saving (issue #1451): the baseline tracked the
 * refetched server while the live fields kept the values the user typed, and a
 * deep compare of the two never re-equalised.
 *
 * Mirrors the Agent bundle's initialDataRef / form.setFieldsValue pattern.
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
  onDirtyChange,
  onResync
}: UseMcpServerDirtyInput): void {
  const baselineRef = useRef<McpServerSnapshot>(serverSnapshot(server))

  // Hold the callbacks in refs so the effect below reacts to real data changes
  // only — never to a callback's identity changing on an unrelated re-render.
  // That is what keeps the flag snappy: after a save the container clears it
  // optimistically, and this effect does not re-run (nothing the user touched
  // changed) to re-assert a stale dirty while the refetch is still in flight.
  const onDirtyChangeRef = useRef(onDirtyChange)
  onDirtyChangeRef.current = onDirtyChange
  const onResyncRef = useRef(onResync)
  onResyncRef.current = onResync

  useEffect(() => {
    const persisted = serverSnapshot(server)

    // The persisted server moved (initial load, or the post-save refetch):
    // re-baseline and push those values back into the editor. Return without the
    // comparison below — the live fields are about to be replaced by this
    // snapshot, so comparing the not-yet-updated fields would report a spurious
    // dirty for a single frame.
    if (!isEqual(persisted, baselineRef.current)) {
      baselineRef.current = persisted
      onResyncRef.current(persisted)
      onDirtyChangeRef.current(false)
      return
    }

    const current: McpServerSnapshot = {
      name,
      urlSlug,
      description,
      enabled,
      tools,
      shareGlobal,
      sharedUsers,
      sharedRoles
    }
    onDirtyChangeRef.current(!isEqual(current, baselineRef.current))
  }, [
    server,
    name,
    urlSlug,
    description,
    enabled,
    tools,
    shareGlobal,
    sharedUsers,
    sharedRoles
  ])
}
