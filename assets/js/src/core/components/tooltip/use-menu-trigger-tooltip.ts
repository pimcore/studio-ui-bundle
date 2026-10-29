/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useState } from 'react'
import { type TooltipProps } from 'antd'

export interface MenuTriggerTooltip {
  tooltip: TooltipProps
  onMenuOpenChange: (open: boolean) => void
}

/**
 * Tooltip of a button that opens a menu on click: hidden while the menu is open, so it never
 * covers the menu items. Pass `onMenuOpenChange` to the dropdown's `onOpenChange`.
 */
export const useMenuTriggerTooltip = (tooltip: TooltipProps): MenuTriggerTooltip => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return {
    tooltip: isMenuOpen ? { ...tooltip, open: false } : tooltip,
    onMenuOpenChange: (open: boolean): void => { setIsMenuOpen(open) }
  }
}
