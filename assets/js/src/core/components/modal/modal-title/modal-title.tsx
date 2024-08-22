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

export interface ModalTitleProps {
  icon?: ReactNode
  children: ReactNode
}

export const ModalTitle = (props: ModalTitleProps): React.JSX.Element => {
  return (
    <Flex gap={ 'small' }>
      {props.icon}

      <span>
        {props.children}
      </span>
    </Flex>
  )
}
