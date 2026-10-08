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
import { Tooltip as AntTooltip, type TooltipProps } from 'antd'

/**
 * Delay in seconds before the tooltip of an action button (open, delete, search, upload, ...) appears.
 * These buttons are everywhere and hovered constantly, so their tooltips only show up when the
 * pointer rests on a button, not while it passes over a toolbar.
 */
export const actionTooltipDelay = 0.4

export const Tooltip = (props: TooltipProps): JSX.Element => {
  return (
    <AntTooltip { ...props } />
  )
}
