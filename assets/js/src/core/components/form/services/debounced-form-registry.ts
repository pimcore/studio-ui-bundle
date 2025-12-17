/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable } from 'inversify'
import { isNil } from 'lodash'

interface FlushEntry {
  flushFunction: () => void
  tag: string
}

/**
 * Registry for managing debounced form flush functions
 * Allows components to register flush functions that will be called before save operations
 * Supports tagging for selective flushing (e.g., only document forms, only asset forms, etc.)
 */
@injectable()
export class DebouncedFormRegistry {
  private readonly flushFunctions = new Map<string, FlushEntry>()
  private readonly tagIndex = new Map<string, Set<string>>()

  register (key: string, flushFunction: () => void, tag: string = 'default'): void {
    this.flushFunctions.set(key, { flushFunction, tag })

    if (!this.tagIndex.has(tag)) {
      this.tagIndex.set(tag, new Set())
    }
    this.tagIndex.get(tag)!.add(key)
  }

  unregister (key: string): void {
    const entry = this.flushFunctions.get(key)
    this.flushFunctions.delete(key)

    if (!isNil(entry)) {
      const tagSet = this.tagIndex.get(entry.tag)
      if (!isNil(tagSet)) {
        tagSet.delete(key)
        if (tagSet.size === 0) {
          this.tagIndex.delete(entry.tag)
        }
      }
    }
  }

  flushByTag (tag: string): void {
    const keys = this.tagIndex.get(tag)
    if (isNil(keys) || keys.size === 0) {
      return
    }

    keys.forEach(key => {
      const entry = this.flushFunctions.get(key)
      if (!isNil(entry)) {
        try {
          entry.flushFunction()
        } catch (error) {
          console.error(`Failed to flush pending changes for ${key} with tag ${tag}:`, error)
        }
      }
    })
  }

  getTags (): string[] {
    return Array.from(this.tagIndex.keys())
  }
}
