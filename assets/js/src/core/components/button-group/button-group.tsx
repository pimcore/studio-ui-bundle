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

import React, { type ReactElement } from 'react'
import { Flex } from 'antd'

export interface ButtonGroupProps {
  items: ReactElement[]
}

export const ButtonGroup = ({ items }: ButtonGroupProps): React.JSX.Element => {
  return (
    <Flex
      className="button-group"
      gap={ 'small' }
    >
      {items.map((item, index) => (
        <div
          className="button-group__item"
          key={ index }
        >
          {item}
        </div>
      ))}
    </Flex>
  )
}
