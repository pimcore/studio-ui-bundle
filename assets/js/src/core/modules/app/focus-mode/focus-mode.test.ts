/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import {
  applyFocusViewport,
  getFocusInnerModelJson,
  getFullStudioUrl,
  initFocusMode,
  isFocusMode,
  isFocusRequested,
  toFullStudioUrl
} from './focus-mode'

const UUID = '0b6c5c8e-1f2a-4c3d-9e8f-123456789abc'

const at = (href: string): Location => {
  const url = new URL(href)

  return { href: url.href, search: url.search } as unknown as Location
}

const viewport = (): HTMLMetaElement | null => document.head.querySelector<HTMLMetaElement>('meta[name="viewport"]')

describe('focus mode', () => {
  beforeEach(() => {
    document.head.innerHTML = ''
  })

  it('is requested only by focus=1', () => {
    expect(isFocusRequested(`?changeRequest=${UUID}&focus=1`)).toBe(true)
    expect(isFocusRequested('?focus=1')).toBe(true)
    expect(isFocusRequested(`?changeRequest=${UUID}`)).toBe(false)
    expect(isFocusRequested('?focus=0')).toBe(false)
    expect(isFocusRequested('?focus=')).toBe(false)
    expect(isFocusRequested('')).toBe(false)
  })

  it('links the full Studio with every deep link parameter but the focus flag', () => {
    expect(toFullStudioUrl(`https://studio.test/pimcore-studio/?changeRequest=${UUID}&focus=1`))
      .toBe(`/pimcore-studio/?changeRequest=${UUID}`)
    expect(toFullStudioUrl('https://studio.test/pimcore-studio/data-object/12?focus=1'))
      .toBe('/pimcore-studio/data-object/12')
  })

  it('keeps the address of the start, before a bundle strips its parameter', () => {
    initFocusMode(at(`https://studio.test/pimcore-studio/?changeRequest=${UUID}&focus=1`), document)

    expect(isFocusMode()).toBe(true)
    expect(getFullStudioUrl()).toBe(`/pimcore-studio/?changeRequest=${UUID}`)
  })

  it('adds a viewport to the focus view only', () => {
    initFocusMode(at(`https://studio.test/pimcore-studio/?changeRequest=${UUID}`), document)

    expect(isFocusMode()).toBe(false)
    expect(viewport()).toBeNull()

    initFocusMode(at(`https://studio.test/pimcore-studio/?changeRequest=${UUID}&focus=1`), document)

    expect(viewport()?.content).toBe('width=device-width, initial-scale=1')
  })

  it('replaces a viewport the page already has instead of adding a second', () => {
    document.head.innerHTML = '<meta name="viewport" content="width=1280">'

    applyFocusViewport(document)

    expect(document.head.querySelectorAll('meta[name="viewport"]')).toHaveLength(1)
    expect(viewport()?.content).toBe('width=device-width, initial-scale=1')
  })

  it('starts the focus view with an empty tabset without its tab strip', () => {
    const model = getFocusInnerModelJson()

    expect(model.global?.tabSetEnableTabStrip).toBe(false)
    expect(model.layout.children).toHaveLength(1)
    expect(model.layout.children[0]).toMatchObject({ type: 'tabset', id: 'main_tabset', children: [] })
  })
})
