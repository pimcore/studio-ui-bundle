/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { isNull } from 'lodash'

interface IPortalProps {
  children: ReactNode
  targetId: string
}

export const Portal = ({ children, targetId }: IPortalProps) => {
  const target = document.getElementById(targetId)

  if (isNull(target)) {
    console.error(`Portal target "${targetId}" not found in DOM`)

    return null
  }

  return createPortal(children, target)
}
