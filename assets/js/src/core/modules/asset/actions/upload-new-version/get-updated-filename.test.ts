/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getUpdatedFilename } from './get-updated-filename'

jest.mock('@sdk/utils', () => ({
  getFileExtension: jest.requireActual('@Pimcore/utils/files').getFileExtension,
  replaceFileEnding: jest.requireActual('@Pimcore/utils/files').replaceFileEnding
}))

describe('getUpdatedFilename', () => {
  it('keeps the filename when the extension stays the same', () => {
    expect(getUpdatedFilename('example.png', 'photo.png')).toBe('example.png')
  })

  it('replaces the extension when the new file has a different one', () => {
    expect(getUpdatedFilename('example.png', 'photo.jpg')).toBe('example.jpg')
  })

  it('treats a different case of the extension as a rename, like the backend', () => {
    expect(getUpdatedFilename('example.png', 'photo.PNG')).toBe('example.PNG')
  })

  it('replaces only the last extension', () => {
    expect(getUpdatedFilename('archive.tar.gz', 'other.zip')).toBe('archive.tar.zip')
  })

  it('ignores leading and trailing dots and spaces of the uploaded name, like the backend', () => {
    expect(getUpdatedFilename('example.jpg', ' photo.jpg. ')).toBe('example.jpg')
  })

  it('drops the extension when the new file has none, like the backend', () => {
    expect(getUpdatedFilename('example.png', 'photo')).toBe('example.')
  })

  it('keeps the filename when the asset has no extension', () => {
    expect(getUpdatedFilename('README', 'readme.txt')).toBe('README')
  })
})
