/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode, useId } from 'react'
import type { SwitchProps as AntdSwitchProps } from 'antd/es/switch/index'
import { Switch as AntdSwitch } from 'antd'
import { Flex } from '@Pimcore/components/flex/flex'
import { TooltipIcon, type TooltipIconProps } from '@Pimcore/components/tooltip-icon/tooltip-icon'
import { isNil } from 'lodash'

export interface SwitchProps extends AntdSwitchProps {
  labelLeft?: ReactNode
  labelRight?: ReactNode
  tooltip?: ReactNode
  tooltipPlacement?: TooltipIconProps['placement']
  'aria-label'?: string
  'aria-labelledby'?: string
}

/**
 * Whether React renders text for this label. A nil, boolean or empty label renders nothing, and
 * referencing it would name the switch with the empty string instead of leaving it unnamed.
 */
const isRendered = (label: ReactNode): boolean =>
  !isNil(label) && typeof label !== 'boolean' && label !== ''

export const Switch = ({
  labelLeft,
  labelRight,
  tooltip,
  tooltipPlacement = 'right',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: SwitchProps): React.JSX.Element => {
  const idPrefix = useId()
  const leftId = `${idPrefix}label-left`
  const rightId = `${idPrefix}label-right`
  const hasLabelLeft = isRendered(labelLeft)
  const hasLabelRight = isRendered(labelRight)

  // The labels are siblings of the switch, which renders as a button and so cannot be the target
  // of a <label>. Each one is wrapped in an element carrying an id and referenced through
  // `aria-labelledby` instead, which names the switch whatever the label renders as — a plain
  // string, a <Text>, or a whole Flex. A name the caller passed itself always wins.
  const labelIds = [
    hasLabelLeft ? leftId : undefined,
    hasLabelRight ? rightId : undefined
  ].filter((id): id is string => id !== undefined)

  const labelledBy = ariaLabelledBy ?? (
    isNil(ariaLabel) && labelIds.length > 0 ? labelIds.join(' ') : undefined
  )

  return (
    <Flex
      align={ 'center' }
      gap={ 'extra-small' }
    >
      {hasLabelLeft && <span id={ leftId }>{labelLeft}</span>}
      <AntdSwitch
        { ...props }
        aria-label={ ariaLabel }
        aria-labelledby={ labelledBy }
      />
      {hasLabelRight && <span id={ rightId }>{labelRight}</span>}
      {!isNil(tooltip) && (
        <TooltipIcon
          placement={ tooltipPlacement }
          tooltip={ tooltip }
        />
      )}
    </Flex>
  )
}
