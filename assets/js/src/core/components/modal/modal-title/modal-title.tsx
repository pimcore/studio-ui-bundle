/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Flex } from 'antd'
import React, { type ReactNode } from 'react'
import { Icon } from '@Pimcore/components/icon/icon'

export interface ModalTitleProps {
  iconName?: string
  children: ReactNode
}

export const ModalTitle = ({ iconName, ...props }: ModalTitleProps): React.JSX.Element => {
  return (
    <Flex
      align={ 'center' }
      gap={ 'small' }
    >
      {iconName !== undefined && (
        <Icon
          options={ { width: 20, height: 20 } }
          value={ iconName }
        />
      )}
      <span>
        {props.children}
      </span>
    </Flex>
  )
}
