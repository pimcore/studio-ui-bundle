/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useRef } from 'react'

export const usePrevious = <t>(value: t): t | undefined => {
  const ref = useRef<t>()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}
