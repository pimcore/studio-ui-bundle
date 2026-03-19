/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { isNil } from 'lodash'

const MAX_FOLDER_DEPTH = 20

interface QueueEntry {
  entry: FileSystemEntry
  parentRelativeFolderPath: string
  depth: number
}

/**
 * Reads all entries from a FileSystemDirectoryReader, handling the
 * browser's 100-entry-per-call limit by calling readEntries repeatedly
 * until it returns an empty array.
 */
async function readAllEntries (reader: FileSystemDirectoryReader): Promise<FileSystemEntry[]> {
  return await new Promise((resolve, reject) => {
    const allEntries: FileSystemEntry[] = []

    const readBatch = (): void => {
      reader.readEntries((entries) => {
        if (entries.length === 0) {
          resolve(allEntries)
        } else {
          allEntries.push(...entries)
          readBatch()
        }
      }, reject)
    }

    readBatch()
  })
}

/**
 * Converts a FileSystemFileEntry to a File object.
 */
async function entryToFile (entry: FileSystemFileEntry): Promise<File> {
  return await new Promise((resolve, reject) => {
    entry.file(resolve, reject)
  })
}

async function createFolderIfMissing (parentId: number, folderName: string): Promise<void> {
  const url = `${getPrefix()}/elements/asset/folder/${parentId}`
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ folderName })
  })

  if (response.ok || response.status === 409) {
    return
  }

  if (!response.ok) {
    const text = await response.text().catch(() => String(response.status))

    if (text.includes('error_folder_exists') || text.includes('already exists')) {
      return
    }

    throw new Error(`Failed to create folder "${folderName}": ${text}`)
  }
}

/**
 * Resolves the numeric asset ID for an element at the given absolute path.
 */
async function getFolderIdByPath (path: string): Promise<number> {
  const url = `${getPrefix()}/elements/asset/path?elementPath=${encodeURIComponent(path)}`
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include'
  })

  if (!response.ok) {
    const text = await response.text().catch(() => String(response.status))
    throw new Error(`Failed to resolve folder ID for path "${path}": ${text}`)
  }

  const data: unknown = await response.json()
  if (isNil(data) || typeof (data as Record<string, unknown>).id !== 'number') {
    throw new Error(`Unexpected response resolving path "${path}": ${JSON.stringify(data)}`)
  }

  return (data as Record<string, unknown>).id as number
}

function joinPath (base: string, segment: string): string {
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base
  return `${normalizedBase}/${segment}`
}

/**
 * Resolves (and creates if needed) the absolute folder path represented by
 * `relativeFolderPath` under `rootFolderPath` and returns the final folder ID.
 */
export async function resolveFolderIdByRelativePath (
  rootFolderId: number,
  rootFolderPath: string,
  relativeFolderPath: string,
  folderPathToId: Map<string, number>
): Promise<number> {
  if (relativeFolderPath === '') {
    return rootFolderId
  }

  folderPathToId.set(rootFolderPath, rootFolderId)

  let currentFolderId = rootFolderId
  let currentFolderPath = rootFolderPath
  const pathSegments = relativeFolderPath.split('/').filter(Boolean)

  for (const segment of pathSegments) {
    currentFolderPath = joinPath(currentFolderPath, segment)

    const cachedFolderId = folderPathToId.get(currentFolderPath)
    if (!isNil(cachedFolderId)) {
      currentFolderId = cachedFolderId
      continue
    }

    await createFolderIfMissing(currentFolderId, segment)
    currentFolderId = await getFolderIdByPath(currentFolderPath)
    folderPathToId.set(currentFolderPath, currentFolderId)
  }

  return currentFolderId
}

/**
 * Returns true if any of the dropped DataTransfer items is a directory.
 */
export function droppedItemsContainDirectory (dataTransfer: DataTransfer): boolean {
  if (isNil(dataTransfer.items)) return false

  for (let i = 0; i < dataTransfer.items.length; i++) {
    const item = dataTransfer.items[i]
    if (typeof item.webkitGetAsEntry !== 'function') continue

    const entry = item.webkitGetAsEntry()
    if (entry?.isDirectory === true) return true
  }

  return false
}

/**
 * Traverses dropped directory entries and returns flat files with the
 * relative parent folder path (under the drop target folder).
 */
export async function collectDroppedTree (
  dataTransfer: DataTransfer
): Promise<Array<{ file: File, parentRelativeFolderPath: string }>> {
  const queue: QueueEntry[] = []
  const result: Array<{ file: File, parentRelativeFolderPath: string }> = []

  for (let i = 0; i < dataTransfer.items.length; i++) {
    const item = dataTransfer.items[i]
    if (typeof item.webkitGetAsEntry === 'function') {
      const entry = item.webkitGetAsEntry()
      if (!isNil(entry)) {
        queue.push({ entry, parentRelativeFolderPath: '', depth: 0 })
      }
    }
  }

  while (queue.length > 0) {
    const { entry, parentRelativeFolderPath, depth } = queue.shift()!

    if (depth > MAX_FOLDER_DEPTH) continue

    if (entry.isFile) {
      const file = await entryToFile(entry as FileSystemFileEntry)
      result.push({ file, parentRelativeFolderPath })
    } else if (entry.isDirectory) {
      const nextRelativeFolderPath = parentRelativeFolderPath === ''
        ? entry.name
        : `${parentRelativeFolderPath}/${entry.name}`

      const reader = (entry as FileSystemDirectoryEntry).createReader()
      const dirChildren = await readAllEntries(reader)

      for (const child of dirChildren) {
        queue.push({
          entry: child,
          parentRelativeFolderPath: nextRelativeFolderPath,
          depth: depth + 1
        })
      }
    }
  }

  return result
}
