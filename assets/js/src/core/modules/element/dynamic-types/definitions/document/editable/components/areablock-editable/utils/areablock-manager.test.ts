/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type RefObject } from 'react'
import { AreablockManager } from './areablock-manager'

const EDITABLE_NAME = 'content'

interface AreaEntryConfig {
  key?: string
  type?: string
  hidden?: boolean
}

const createContainer = (entries: AreaEntryConfig[]): HTMLDivElement => {
  const container = document.createElement('div')
  container.setAttribute('data-name', EDITABLE_NAME)
  container.setAttribute('data-type', 'areablock')

  entries.forEach(entry => {
    const element = document.createElement('div')
    element.className = 'pimcore_area_entry pimcore_block_entry'
    element.setAttribute('data-name', EDITABLE_NAME)

    if (entry.key !== undefined) {
      element.setAttribute('key', entry.key)
    }

    if (entry.type !== undefined) {
      element.setAttribute('type', entry.type)
    }

    if (entry.hidden === true) {
      element.setAttribute('data-hidden', 'true')
    }

    container.appendChild(element)
  })

  document.body.appendChild(container)

  return container
}

const createManager = (container: HTMLDivElement): AreablockManager => {
  const containerRef: RefObject<HTMLDivElement> = { current: container }
  return new AreablockManager(EDITABLE_NAME, containerRef)
}

describe('AreablockManager', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  describe('getAreablockValue', () => {
    it('returns the entries with their existing keys in DOM order', () => {
      const container = createContainer([
        { key: '5', type: 'hero-teaser' },
        { key: '2', type: 'standard-teaser' },
        { key: '14', type: 'hero-grid', hidden: true }
      ])

      const value = createManager(container).getAreablockValue()

      expect(value).toEqual([
        { key: '5', type: 'hero-teaser', hidden: false },
        { key: '2', type: 'standard-teaser', hidden: false },
        { key: '14', type: 'hero-grid', hidden: true }
      ])
    })

    it('never invents keys for entries without a key attribute', () => {
      const container = createContainer([
        { key: '5', type: 'hero-teaser' },
        { type: 'standard-teaser' },
        { key: '12', type: 'hero-grid' }
      ])

      const value = createManager(container).getAreablockValue()

      expect(value).toEqual([
        { key: '5', type: 'hero-teaser', hidden: false },
        { key: '12', type: 'hero-grid', hidden: false }
      ])
    })

    it('does not renumber entries when no entry carries a key attribute', () => {
      const container = createContainer([
        { type: 'hero-teaser' },
        { type: 'standard-teaser' },
        { type: 'hero-grid' }
      ])

      const value = createManager(container).getAreablockValue()

      expect(value).toEqual([])
    })

    it('does not mutate the DOM of entries without a key attribute', () => {
      const container = createContainer([
        { key: '5', type: 'hero-teaser' },
        { type: 'standard-teaser' }
      ])

      createManager(container).getAreablockValue()

      const unkeyedEntry = container.querySelectorAll('.pimcore_area_entry')[1]
      expect(unkeyedEntry.getAttribute('key')).toBeNull()
    })
  })

  describe('calculateNextKey', () => {
    it('returns the highest existing key plus one', () => {
      const container = createContainer([
        { key: '5', type: 'hero-teaser' },
        { key: '12', type: 'standard-teaser' },
        { key: '2', type: 'hero-grid' }
      ])

      expect(createManager(container).calculateNextKey()).toBe(13)
    })
  })
})
