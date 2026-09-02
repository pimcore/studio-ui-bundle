/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { renderHook } from '@testing-library/react'
import { type McpServer } from '../mcp-servers-api-slice.gen'
import { serverSnapshot, useMcpServerDirty } from './use-mcp-server-dirty'

const makeServer = (overrides: Partial<McpServer>): McpServer => ({
  id: 's1',
  name: 'A',
  urlSlug: 'a',
  url: 'https://example.test/pimcore-mcp/studio/a',
  description: '',
  tools: [],
  scopes: [],
  enabled: true,
  shareGlobal: false,
  sharedUsers: [],
  sharedRoles: [],
  writeable: true,
  currentUserPermissions: { canView: true, canAccess: true, canEdit: true },
  toolCount: 0,
  ...overrides
})

interface Props {
  server: McpServer | null
  onDirtyChange: jest.Mock
  onResync: jest.Mock
  name: string
  urlSlug: string
  description: string
  enabled: boolean
  tools: string[]
  shareGlobal: boolean
  sharedUsers: McpServer['sharedUsers']
  sharedRoles: McpServer['sharedRoles']
}

/** Props whose live values mirror the persisted server (i.e. a pristine editor). */
const pristineProps = (server: McpServer, fns: { onDirtyChange: jest.Mock, onResync: jest.Mock }): Props => ({
  server,
  ...serverSnapshot(server),
  ...fns
})

describe('useMcpServerDirty', () => {
  it('reports not-dirty when the live values match the loaded server', () => {
    const onDirtyChange = jest.fn()
    const onResync = jest.fn()
    const server = makeServer({ tools: ['x'] })

    renderHook(() => { useMcpServerDirty(pristineProps(server, { onDirtyChange, onResync })) })

    expect(onDirtyChange).toHaveBeenLastCalledWith(false)
    expect(onResync).not.toHaveBeenCalled()
  })

  it('reports dirty when a live value diverges from the server', () => {
    const onDirtyChange = jest.fn()
    const onResync = jest.fn()
    const server = makeServer({ tools: ['x'] })

    const { rerender } = renderHook((props: Props) => { useMcpServerDirty(props) }, {
      initialProps: pristineProps(server, { onDirtyChange, onResync })
    })

    rerender({ ...pristineProps(server, { onDirtyChange, onResync }), tools: ['x', 'y'] })

    expect(onDirtyChange).toHaveBeenLastCalledWith(true)
  })

  // The bug: after saving, the invalidation refetch returns the saved tools in a
  // different order than the array the user built locally. A plain deep compare of
  // baseline-vs-live never re-equalises, so the tab stayed dirty forever.
  it('clears dirty after a save whose refetch reorders the tools (issue #1451)', () => {
    const onDirtyChange = jest.fn()
    const onResync = jest.fn()
    const server = makeServer({ tools: ['x'] })

    const { rerender } = renderHook((props: Props) => { useMcpServerDirty(props) }, {
      initialProps: pristineProps(server, { onDirtyChange, onResync })
    })

    // User adds a tool -> dirty.
    rerender({ ...pristineProps(server, { onDirtyChange, onResync }), tools: ['x', 'y'] })
    expect(onDirtyChange).toHaveBeenLastCalledWith(true)

    // Save succeeds; the refetch returns the persisted server with the tools in a
    // different order, while the editor's live fields still hold the typed order.
    const saved = makeServer({ tools: ['y', 'x'] })
    rerender({ ...pristineProps(server, { onDirtyChange, onResync }), server: saved, tools: ['x', 'y'] })

    // The hook adopts the persisted snapshot as the new baseline and asks the
    // editor to re-seed its fields from it.
    expect(onResync).toHaveBeenCalledWith(expect.objectContaining({ tools: ['y', 'x'] }))

    // The editor applies the re-seed; the live values now equal the baseline.
    rerender(pristineProps(saved, { onDirtyChange, onResync }))
    expect(onDirtyChange).toHaveBeenLastCalledWith(false)
  })

  // The delay the tab showed after saving came from the effect re-running on
  // every render (its onDirtyChange identity changed when the tab list
  // re-rendered) and re-asserting a stale dirty over the optimistic clear. The
  // report must react to data changes only.
  it('does not re-report when only the callback identity changes (no data change)', () => {
    const onResync = jest.fn()
    const first = jest.fn()
    const server = makeServer({ tools: ['x'] })
    const edited = ['x', 'y']

    const { rerender } = renderHook((props: Props) => { useMcpServerDirty(props) }, {
      initialProps: { ...pristineProps(server, { onDirtyChange: first, onResync }), tools: edited }
    })
    expect(first).toHaveBeenLastCalledWith(true)

    // Same data, brand-new onDirtyChange function — as when the tab list re-renders.
    const second = jest.fn()
    rerender({ ...pristineProps(server, { onDirtyChange: second, onResync }), tools: edited })

    expect(second).not.toHaveBeenCalled()
  })

  it('does not re-seed (and keeps edits) when an unrelated refetch returns identical content', () => {
    const onDirtyChange = jest.fn()
    const onResync = jest.fn()
    const server = makeServer({ tools: ['x'] })

    const { rerender } = renderHook((props: Props) => { useMcpServerDirty(props) }, {
      initialProps: pristineProps(server, { onDirtyChange, onResync })
    })

    rerender({ ...pristineProps(server, { onDirtyChange, onResync }), tools: ['x', 'y'] })
    onResync.mockClear()

    // A fresh server object with identical persisted content — e.g. the list query
    // refetching because some other server was mutated.
    const sameContent = makeServer({ tools: ['x'] })
    rerender({ ...pristineProps(server, { onDirtyChange, onResync }), server: sameContent, tools: ['x', 'y'] })

    expect(onResync).not.toHaveBeenCalled()
    expect(onDirtyChange).toHaveBeenLastCalledWith(true)
  })
})
