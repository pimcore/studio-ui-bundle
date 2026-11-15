/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { IconMotionGlobalStyles } from '@Pimcore/styles/icon-motion.styles'
import { useIconClickMotion } from '@Pimcore/utils/hooks/use-icon-click-motion'

/**
 * Enables the micro interactions of action icons in an application root: the hover and press
 * styles, and the one-off click animations. Mounted by every root that renders action buttons.
 */
export const IconMotion = (): React.JSX.Element => {
  useIconClickMotion()

  return <IconMotionGlobalStyles />
}
