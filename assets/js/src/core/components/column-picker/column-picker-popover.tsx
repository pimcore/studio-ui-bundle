/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { Popover, type PopoverProps } from 'antd'
import { ColumnPicker, type ColumnPickerProps } from './column-picker'

export interface ColumnPickerPopoverProps<TMeta = unknown> extends ColumnPickerProps<TMeta> {
  children: React.ReactNode
  /**
   * Where the panel opens relative to the trigger. Defaults to `leftTop` so the
   * panel sits beside the trigger without covering a sidebar to its right.
   */
  placement?: PopoverProps['placement']
  /**
   * Container the popover is rendered into. Defaults to Ant's body portal.
   * Combined with the default `leftTop` placement the panel opens beside the
   * trigger, clear of any sidebar content. Override to constrain it to a
   * specific container when needed.
   */
  getPopupContainer?: PopoverProps['getPopupContainer']
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

/**
 * {@link ColumnPicker} mounted in an anchored, dismissable popover. Stays open
 * across selections so multiple columns can be added in one pass. Placement and
 * popup container are configurable to keep the panel clear of adjacent UI.
 */
export const ColumnPickerPopover = <TMeta, >({
  children,
  placement = 'leftTop',
  getPopupContainer,
  open,
  onOpenChange,
  ...pickerProps
}: ColumnPickerPopoverProps<TMeta>): React.JSX.Element => {
  const [internalOpen, setInternalOpen] = useState<boolean>(false)
  const isControlled = open !== undefined
  const effectiveOpen = isControlled ? open : internalOpen

  const handleOpenChange = (next: boolean): void => {
    if (!isControlled) {
      setInternalOpen(next)
    }

    onOpenChange?.(next)
  }

  return (
    <Popover
      content={ <ColumnPicker<TMeta> { ...pickerProps } /> }
      getPopupContainer={ getPopupContainer }
      onOpenChange={ handleOpenChange }
      open={ effectiveOpen }
      placement={ placement }
      trigger="click"
    >
      { children }
    </Popover>
  )
}
