/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode } from 'react'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { type TooltipProps } from 'antd'
import { useStyles } from './tooltip-icon.styles'

export interface TooltipIconProps {
  tooltip: ReactNode
  placement?: TooltipProps['placement']
}

export const TooltipIcon = ({ tooltip, placement }: TooltipIconProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <Tooltip
      placement={ placement }
      title={ tooltip }
    >
      <QuestionCircleOutlined className={ styles.tooltipIcon } />
    </Tooltip>
  )
}
