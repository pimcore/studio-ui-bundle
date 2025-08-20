/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil } from 'lodash'

interface ImageDimensions {
  width: number
  height: number
}

export const MIN_WIDTH = 150
export const MIN_HEIGHT = 100
export const DEFAULT_HEIGHT = 100

export const getImageDimensions = (
  isImageLoaded: boolean,
  lastDimensions: ImageDimensions | null | undefined
): { width: number | undefined, height: number | undefined } => {
  if (isImageLoaded) {
    return { width: undefined, height: undefined }
  }

  return {
    width: !isNil(lastDimensions?.width) ? Math.max(lastDimensions.width, MIN_WIDTH) : MIN_WIDTH,
    height: !isNil(lastDimensions?.height) ? Math.max(lastDimensions.height, MIN_HEIGHT) : MIN_HEIGHT
  }
}
