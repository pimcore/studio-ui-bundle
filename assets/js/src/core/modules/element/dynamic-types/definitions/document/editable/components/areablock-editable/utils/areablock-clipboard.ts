/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getLocalStorageItem, setLocalStorageItem } from '@Pimcore/utils/local-storage'
import { type ValueType } from '@Pimcore/app/public-api/document-editor-iframe/editable-data/editable-data'
import { LOCAL_STORAGE_PREFIX } from '@Pimcore/constants/global'

export interface AreablockClipboardIdentifier {
  name: string
  realName: string
  key: string
}

export interface AreablockClipboardItem {
  identifier: AreablockClipboardIdentifier
  type: string
  values: Record<string, ValueType>
}

const STORAGE_KEY = 'areablock_clipboard'
const CHANGE_EVENT = 'pimcore:areablock-clipboard-change'

// Cache the parsed item so getAreablockClipboard returns a stable reference
// for unchanged storage content (required by useSyncExternalStore).
let cachedRaw: string | null = null
let cachedItem: AreablockClipboardItem | null = null

export const getAreablockClipboard = (): AreablockClipboardItem | null => {
  const raw = getLocalStorageItem(STORAGE_KEY)

  if (raw === cachedRaw) {
    return cachedItem
  }

  cachedRaw = raw

  try {
    cachedItem = raw === null ? null : JSON.parse(raw) as AreablockClipboardItem
  } catch (error) {
    console.warn('Could not parse areablock clipboard content:', error)
    cachedItem = null
  }

  return cachedItem
}

export const setAreablockClipboard = (item: AreablockClipboardItem): void => {
  setLocalStorageItem(STORAGE_KEY, JSON.stringify(item))
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export const subscribeToAreablockClipboard = (callback: () => void): () => void => {
  const onStorageChange = (event: StorageEvent): void => {
    if (event.key === `${LOCAL_STORAGE_PREFIX}${STORAGE_KEY}`) {
      callback()
    }
  }

  window.addEventListener('storage', onStorageChange)
  window.addEventListener(CHANGE_EVENT, callback)

  return () => {
    window.removeEventListener('storage', onStorageChange)
    window.removeEventListener(CHANGE_EVENT, callback)
  }
}
