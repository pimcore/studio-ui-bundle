/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext } from 'react'
import { UploadContext, type UploadContextProps } from './upload-modal-provider'
import { isNil } from 'lodash'

export const useUploadModalContext = (): UploadContextProps => {
  const context = useContext(UploadContext)
  if (isNil(context)) {
    throw new Error('useUpload must be used within an UploadProvider')
  }
  return context
}
