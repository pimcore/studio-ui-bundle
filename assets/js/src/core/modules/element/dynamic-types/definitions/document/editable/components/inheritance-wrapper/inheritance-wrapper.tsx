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
import { Dropdown } from 'antd'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { useStyles } from './inheritance-wrapper.styles'
import { useInheritanceMenu } from '../../hooks/use-inheritance-menu'
import { isNil } from 'lodash'

export interface InheritanceWrapperProps {
  children: React.ReactNode
  isInherited?: boolean
  onOverwrite?: () => void
  className?: string
}

export const InheritanceWrapper = ({
  children,
  isInherited = false,
  onOverwrite,
  className
}: InheritanceWrapperProps): React.JSX.Element => {
  const { styles, cx } = useStyles()
  const { inheritanceMenuItems, inheritanceTooltip } = useInheritanceMenu({ onOverwrite })

  if (isNil(children)) {
    return <></>
  }

  // When inherited, wrap with dropdown/tooltip for clickable inheritance
  if (isInherited && !isNil(onOverwrite)) {
    return (
      <Dropdown
        menu={ { items: inheritanceMenuItems } }
        placement="bottomLeft"
        trigger={ ['click', 'contextMenu'] }
      >
        <Tooltip title={ inheritanceTooltip }>
          <div className={ cx(styles.inheritanceWrapper, className) }>{children}</div>
        </Tooltip>
      </Dropdown>
    )
  }

  return <>{children}</>
}
