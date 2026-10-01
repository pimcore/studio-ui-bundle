/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { buildElementPublicUrl } from './element-public-url'

const currentDomain = 'https://studio.example.com'
const fullPath = '/image.jpg'

describe('buildElementPublicUrl', () => {
  it('completes a relative prefix into an absolute URL using currentDomain (PEES-1362)', () => {
    expect(buildElementPublicUrl({ fullPath, currentDomain, assetFrontendPrefix: '/dam' }))
      .toBe('https://studio.example.com/dam/image.jpg')
  })

  it('leaves an already-absolute prefix unchanged', () => {
    expect(buildElementPublicUrl({ fullPath, currentDomain, assetFrontendPrefix: 'https://cdn.example.com/dam' }))
      .toBe('https://cdn.example.com/dam/image.jpg')
  })

  it('resolves a protocol-relative prefix using currentDomain\'s protocol', () => {
    expect(buildElementPublicUrl({ fullPath, currentDomain, assetFrontendPrefix: '//cdn.example.com/dam' }))
      .toBe('https://cdn.example.com/dam/image.jpg')
  })

  it.each([null, undefined])('falls back to currentDomain + fullPath when the prefix is %p', (assetFrontendPrefix) => {
    expect(buildElementPublicUrl({ fullPath, currentDomain, assetFrontendPrefix }))
      .toBe('https://studio.example.com/image.jpg')
  })
})
