/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useState } from 'react'

export interface OpenAnimationDone {
  isOpenAnimationDone: boolean
  setIsOpenAnimationDone: (isDone: boolean) => void
}

/**
 * Tracks whether a modal has finished zooming in, for work that needs its final size.
 *
 * The modal is unmounted the moment it closes, so its closing animation never reports back and the
 * flag would stay true for the rest of the session: the next opening would then be acted on while
 * the modal is still zooming in. Closing therefore resets it, so every opening waits again.
 */
export const useOpenAnimationDone = (open: boolean): OpenAnimationDone => {
  const [isOpenAnimationDone, setIsOpenAnimationDone] = useState<boolean>(false)

  useEffect(() => {
    if (!open) {
      setIsOpenAnimationDone(false)
    }
  }, [open])

  return { isOpenAnimationDone, setIsOpenAnimationDone }
}
