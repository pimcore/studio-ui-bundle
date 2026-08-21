/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { act, renderHook } from '@testing-library/react'
import { useNotificationSettingsDraft } from './use-notification-settings-draft'
import type { NotificationSubscribableType } from '../../notifications-slice.gen'

const type = (
  typeId: string,
  subscribed: boolean,
  channels: Array<[string, boolean, boolean]>
): NotificationSubscribableType => ({
  typeId,
  translationKey: `${typeId}.label`,
  descriptionKey: `${typeId}.description`,
  group: 'test',
  sortOrder: 10,
  subscribed,
  subscriptionLocked: false,
  channels: channels.map(([id, enabled, supported]) => ({ id, enabled, supported }))
})

const MENTION = type('collab.mention', true, [['popup', true, true], ['email', false, true]])

describe('useNotificationSettingsDraft', () => {
  it('seeds from the server data and starts clean', () => {
    const { result } = renderHook(() => useNotificationSettingsDraft([MENTION]))

    expect(result.current.isDirty).toBe(false)
    expect(result.current.changedCount).toBe(0)
    expect(result.current.draft['collab.mention'].subscribed).toBe(true)
    expect([...result.current.draft['collab.mention'].channels]).toEqual(['popup'])
  })

  it('marks a toggled channel as changed', () => {
    const { result } = renderHook(() => useNotificationSettingsDraft([MENTION]))

    act(() => { result.current.setChannel('collab.mention', 'email', true) })

    expect(result.current.isDirty).toBe(true)
    expect(result.current.changedCount).toBe(1)
  })

  it('returns to clean when a change is undone', () => {
    const { result } = renderHook(() => useNotificationSettingsDraft([MENTION]))

    act(() => { result.current.setChannel('collab.mention', 'email', true) })
    act(() => { result.current.setChannel('collab.mention', 'email', false) })

    expect(result.current.isDirty).toBe(false)
  })

  it('compares channels without regard to order', () => {
    const { result } = renderHook(() => useNotificationSettingsDraft([
      type('collab.mention', true, [['popup', true, true], ['email', true, true]])
    ]))

    act(() => { result.current.setChannel('collab.mention', 'popup', false) })
    act(() => { result.current.setChannel('collab.mention', 'popup', true) })

    expect(result.current.isDirty).toBe(false)
  })

  it('clears channels when a type is unsubscribed', () => {
    const { result } = renderHook(() => useNotificationSettingsDraft([MENTION]))

    act(() => { result.current.setSubscribed('collab.mention', false) })

    expect([...result.current.draft['collab.mention'].channels]).toEqual([])
  })

  it('discards edits on reset', () => {
    const { result } = renderHook(() => useNotificationSettingsDraft([MENTION]))

    act(() => { result.current.setChannel('collab.mention', 'email', true) })
    act(() => { result.current.reset() })

    expect(result.current.isDirty).toBe(false)
    expect([...result.current.draft['collab.mention'].channels]).toEqual(['popup'])
  })

  it('builds a bulk payload covering every type', () => {
    const { result } = renderHook(() => useNotificationSettingsDraft([
      MENTION,
      type('info', true, [['popup', true, true], ['email', false, false]])
    ]))

    act(() => { result.current.setChannel('collab.mention', 'email', true) })

    const items = result.current.toUpdateItems()

    expect(items).toHaveLength(2)
    expect(items.find((item) => item.typeId === 'collab.mention')?.channels.sort())
      .toEqual(['email', 'popup'])
  })

  it('counts each changed type once', () => {
    const { result } = renderHook(() => useNotificationSettingsDraft([
      MENTION,
      type('info', true, [['popup', true, true]])
    ]))

    act(() => { result.current.setChannel('collab.mention', 'email', true) })
    act(() => { result.current.setSubscribed('collab.mention', false) })
    act(() => { result.current.setChannel('info', 'popup', false) })

    expect(result.current.changedCount).toBe(2)
  })

  it('keeps edits when re-rendered with an equal but newly built array', () => {
    const { result, rerender } = renderHook(
      ({ items }) => useNotificationSettingsDraft(items),
      { initialProps: { items: [type('collab.mention', true, [['popup', true, true], ['email', false, true]])] } }
    )

    act(() => { result.current.setChannel('collab.mention', 'email', true) })
    expect(result.current.isDirty).toBe(true)

    // Same content, different array and object identities.
    rerender({ items: [type('collab.mention', true, [['popup', true, true], ['email', false, true]])] })

    expect(result.current.isDirty).toBe(true)
    expect([...result.current.draft['collab.mention'].channels].sort()).toEqual(['email', 'popup'])
  })

  it('re-seeds when the server data changes', () => {
    const { result, rerender } = renderHook(
      ({ items }) => useNotificationSettingsDraft(items),
      { initialProps: { items: [MENTION] } }
    )

    act(() => { result.current.setChannel('collab.mention', 'email', true) })
    expect(result.current.isDirty).toBe(true)

    rerender({ items: [type('collab.mention', true, [['popup', true, true], ['email', true, true]])] })

    expect(result.current.isDirty).toBe(false)
    expect([...result.current.draft['collab.mention'].channels].sort()).toEqual(['email', 'popup'])
  })

  // Regression: signature-keyed seeding alone never fires when the server normalises the edit
  // away, which left Save enabled forever after an apparently successful save.
  it('clears the dirty flag when the server responds with unchanged data', () => {
    const { result } = renderHook(() => useNotificationSettingsDraft([MENTION]))

    act(() => { result.current.setChannel('collab.mention', 'email', true) })
    expect(result.current.isDirty).toBe(true)

    act(() => { result.current.applyServerState([MENTION]) })

    expect(result.current.isDirty).toBe(false)
    expect([...result.current.draft['collab.mention'].channels]).toEqual(['popup'])
  })

  it('re-seeds from a server response that differs from the local edit', () => {
    const { result } = renderHook(() => useNotificationSettingsDraft([MENTION]))

    act(() => { result.current.setSubscribed('collab.mention', false) })

    act(() => {
      result.current.applyServerState([
        type('collab.mention', true, [['popup', true, true], ['email', true, true]])
      ])
    })

    expect(result.current.isDirty).toBe(false)
    expect(result.current.draft['collab.mention'].subscribed).toBe(true)
    expect([...result.current.draft['collab.mention'].channels].sort()).toEqual(['email', 'popup'])
  })
})
