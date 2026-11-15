/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * Image formats Pimcore stores as `Asset\Image` although their MIME type is not `image/*`,
 * e.g. EPS is reported as `application/postscript` and PSD as `image/vnd.adobe.photoshop`
 * or `application/octet-stream` depending on the guesser.
 *
 * Mirrors the extensions of `pimcore.assets.type_definitions.map.image.matching`.
 */
export const imageExtensionsWithoutImageMimeType = [
  '.eps',
  '.ai',
  '.psd',
  '.svgz',
  '.pcx',
  '.iff',
  '.pct',
  '.wmf'
]

/**
 * `accept` value for uploads that must allow every image format the DAM accepts.
 * `image/*` alone would hide EPS, AI, PSD, … in the browser file dialog and make the
 * drag & drop filter reject them, even though the backend happily stores them as images.
 */
export const imageUploadAccept = ['image/*', ...imageExtensionsWithoutImageMimeType].join(',')
