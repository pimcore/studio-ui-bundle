/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { trim } from 'lodash'
import { getFileExtension, replaceFileEnding } from '@sdk/utils'

// Mirrors the replace endpoint; a name without extension gets a copy name there that cannot be predicted.
export const getUpdatedFilename = (currentFilename: string, uploadedFilename: string): string => {
  const currentExtension = getFileExtension(currentFilename)
  const uploadedExtension = getFileExtension(trim(uploadedFilename.trim(), '. '))

  if (currentExtension === '' || currentExtension === uploadedExtension) {
    return currentFilename
  }

  return replaceFileEnding(currentFilename, uploadedExtension)
}
