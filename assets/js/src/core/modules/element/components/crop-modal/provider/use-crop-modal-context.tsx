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
import { CropModalContext, type CropModalContextProps } from './crop-modal-provider'
import { isNil } from 'lodash'

export const useCropModalContext = (): CropModalContextProps => {
  const context = useContext(CropModalContext)
  if (isNil(context)) {
    throw new Error('useCropModalContext must be used within a CropModalProvider')
  }
  return context
}
