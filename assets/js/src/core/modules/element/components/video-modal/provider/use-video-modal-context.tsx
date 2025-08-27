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
import { VideoModalContext, type VideoModalContextProps } from './video-modal-provider'
import { isNil } from 'lodash'

export const useVideoModalContext = (): VideoModalContextProps => {
  const context = useContext(VideoModalContext)
  if (isNil(context)) {
    throw new Error('useVideoModalContext must be used within a VideoModalProvider')
  }
  return context
}
