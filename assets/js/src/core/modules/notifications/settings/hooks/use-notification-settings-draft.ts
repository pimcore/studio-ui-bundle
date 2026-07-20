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
// Type-only: importing the generated slice for its runtime value would drag the whole API
// setup into anything that consumes this hook, tests included.
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

/**
 * Channel order carries no meaning, so comparing serialised arrays directly would report a
 * change whenever the server happened to return them in a different order — leaving Save
 * permanently enabled.
 */
const sameChannels = (a: Set<string>, b: Set<string>): boolean => {
  if (a.size !== b.size) {
    return false
  }

  return [...a].every((channel) => b.has(channel))
}

const sameEntry = (a: NotificationDraftEntry, b: NotificationDraftEntry): boolean =>
  a.subscribed === b.subscribed && sameChannels(a.channels, b.channels)

/**
 * Local editing state for the notification preferences.
 *
 * Re-seeds whenever the server data changes, which covers both the initial load and the
 * response to a save — the server normalises what it stores, so its answer is authoritative
 * rather than the optimistic local view.
 */
export const useNotificationSettingsDraft = (
  items: NotificationSubscribableType[] | undefined
): UseNotificationSettingsDraftResult => {
  const [draft, setDraft] = useState<NotificationDraft>({})
  const [baseline, setBaseline] = useState<NotificationDraft>({})

  // Keyed on content rather than array identity. A caller that rebuilds the array on every
  // render — which a parent re-render is enough to cause — would otherwise re-seed endlessly,
  // wiping the user's edits mid-interaction.
  const seededSignature = useRef<string | null>(null)

  useEffect(() => {
    if (items === undefined) {
      return
    }

    const signature = JSON.stringify(items)

    if (seededSignature.current === signature) {
      return
    }

    seededSignature.current = signature
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
          // Mirrors the server, which clears channels when a type is switched off. Without
          // this the UI would briefly show a state the server is about to overwrite.
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
    // Sets are not structured-clone friendly across every environment we run in, and a shallow
    // copy would let a later edit mutate the baseline we compare against.
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
      // Only ids this client knows about are sent. The server preserves anything it holds for
      // channels the client could not see — a bundle may be temporarily disabled — so both
      // sides trying to preserve them would duplicate the effort.
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
    toUpdateItems
  }
}
