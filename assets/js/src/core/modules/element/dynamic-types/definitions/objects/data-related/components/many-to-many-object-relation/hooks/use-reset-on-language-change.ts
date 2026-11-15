/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useRef } from 'react'

/**
 * Invokes the reset callback synchronously during render when the given
 * content language differs from the one seen on the previous render, so
 * stale-language state is dropped before any query hooks run.
 */
export const useResetOnLanguageChange = (language: string, reset: () => void): void => {
  const prevLanguageRef = useRef(language)

  if (prevLanguageRef.current !== language) {
    prevLanguageRef.current = language
    reset()
  }
}
