/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import attrAccept from 'rc-upload/lib/attr-accept'
import { type RcFile } from 'antd/es/upload/interface'
import { imageUploadAccept } from './upload-accept'

const file = (name: string, type: string): RcFile =>
  Object.assign(new File(['x'], name, { type }), { uid: name, lastModifiedDate: new Date(0) })

describe('imageUploadAccept', () => {
  it.each([
    ['image.jpg', 'image/jpeg'],
    ['image.png', 'image/png'],
    ['image.svg', 'image/svg+xml'],
    ['image.tiff', 'image/tiff']
  ])('accepts %s with an image mime type', (name, type) => {
    expect(attrAccept(file(name, type), imageUploadAccept)).toBe(true)
  })

  it.each([
    ['image.eps', 'application/postscript'],
    ['IMAGE.EPS', 'application/postscript'],
    ['image.ai', 'application/postscript'],
    ['image.psd', 'application/octet-stream'],
    ['image.svgz', 'application/gzip'],
    ['image.pcx', ''],
    ['image.iff', ''],
    ['image.pct', ''],
    ['image.wmf', 'application/octet-stream']
  ])('accepts %s although its mime type is not image/*', (name, type) => {
    expect(attrAccept(file(name, type), imageUploadAccept)).toBe(true)
  })

  it.each([
    ['document.pdf', 'application/pdf'],
    ['archive.zip', 'application/zip'],
    ['video.mp4', 'video/mp4']
  ])('rejects %s', (name, type) => {
    expect(attrAccept(file(name, type), imageUploadAccept)).toBe(false)
  })
})
