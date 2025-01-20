/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
