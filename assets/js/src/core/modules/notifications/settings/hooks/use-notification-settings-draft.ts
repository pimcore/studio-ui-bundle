/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
// Type-only: a runtime import would drag the whole API setup into every consumer, tests included.
import type {
  NotificationSubscribableType,
  NotificationUpdateSubscriptionItem
} from '../../notifications-slice.gen'

export interface NotificationDraftEntry {
  subscribed: boolean
  channels: Set<string>
}

export type NotificationDraft = Record<string, NotificationDraftEntry>

export interface UseNotificationSettingsDraftResult {
  draft: NotificationDraft
  isDirty: boolean
  changedCount: number
  setSubscribed: (typeId: string, subscribed: boolean) => void
  setChannel: (typeId: string, channelId: string, enabled: boolean) => void
  reset: () => void
  toUpdateItems: () => NotificationUpdateSubscriptionItem[]
  applyServerState: (items: NotificationSubscribableType[]) => void
}

const toDraft = (items: NotificationSubscribableType[]): NotificationDraft => {
  const draft: NotificationDraft = {}

  items.forEach((item) => {
    draft[item.typeId] = {
      subscribed: item.subscribed,
      channels: new Set(item.channels.filter((channel) => channel.enabled).map((channel) => channel.id))
    }
  })

  return draft
}

// Order-insensitive: the server may return channels in any order, and a serialised compare
// would report a phantom change and leave Save permanently enabled.
const sameChannels = (a: Set<string>, b: Set<string>): boolean => {
  if (a.size !== b.size) {
    return false
  }

  return [...a].every((channel) => b.has(channel))
}

const sameEntry = (a: NotificationDraftEntry, b: NotificationDraftEntry): boolean =>
  a.subscribed === b.subscribed && sameChannels(a.channels, b.channels)

/** Local editing state for the notification preferences; the server's answer is authoritative. */
export const useNotificationSettingsDraft = (
  items: NotificationSubscribableType[] | undefined
): UseNotificationSettingsDraftResult => {
  const [draft, setDraft] = useState<NotificationDraft>({})
  const [baseline, setBaseline] = useState<NotificationDraft>({})

  // Signature of the last `items` observed, keyed on content rather than array identity: a caller
  // rebuilding the array on every render would otherwise re-seed endlessly and wipe edits.
  const observedItems = useRef<string | null>(null)

  // Applied straight from a save response. Deliberately leaves observedItems alone: the query
  // still holds the pre-save value for a moment, and re-seeding from it would undo this.
  const applyServerState = useCallback((next: NotificationSubscribableType[]): void => {
    setDraft(toDraft(next))
    setBaseline(toDraft(next))
  }, [])

  useEffect(() => {
    if (items === undefined) {
      return
    }

    const signature = JSON.stringify(items)

    if (observedItems.current === signature) {
      return
    }

    observedItems.current = signature
    setDraft(toDraft(items))
    setBaseline(toDraft(items))
  }, [items])

  const setSubscribed = useCallback((typeId: string, subscribed: boolean): void => {
    setDraft((previous) => {
      const entry = previous[typeId]

      if (entry === undefined) {
        return previous
      }

      return {
        ...previous,
        [typeId]: {
          subscribed,
          // Mirrors the server, which clears channels when a type is switched off.
          channels: subscribed ? entry.channels : new Set<string>()
        }
      }
    })
  }, [])

  const setChannel = useCallback((typeId: string, channelId: string, enabled: boolean): void => {
    setDraft((previous) => {
      const entry = previous[typeId]

      if (entry === undefined) {
        return previous
      }

      const channels = new Set(entry.channels)
      enabled ? channels.add(channelId) : channels.delete(channelId)

      return { ...previous, [typeId]: { ...entry, channels } }
    })
  }, [])

  const reset = useCallback((): void => {
    // Deep-copies the Sets; a shallow copy would let a later edit mutate the baseline.
    const restored: NotificationDraft = {}
    Object.entries(baseline).forEach(([typeId, entry]) => {
      restored[typeId] = { subscribed: entry.subscribed, channels: new Set(entry.channels) }
    })

    setDraft(restored)
  }, [baseline])

  const changedCount = useMemo(
    () => Object.keys(draft).filter((typeId) => {
      const current = draft[typeId]
      const original = baseline[typeId]

      return original !== undefined && !sameEntry(current, original)
    }).length,
    [draft, baseline]
  )

  const toUpdateItems = useCallback(
    (): NotificationUpdateSubscriptionItem[] => Object.entries(draft).map(([typeId, entry]) => ({
      typeId,
      subscribed: entry.subscribed,
      // Only ids this client knows about; the server preserves what it holds for channels the
      // client could not see.
      channels: [...entry.channels]
    })),
    [draft]
  )

  return {
    draft,
    isDirty: changedCount > 0,
    changedCount,
    setSubscribed,
    setChannel,
    reset,
    toUpdateItems,
    applyServerState
  }
}
