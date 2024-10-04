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

import React from 'react'
import { Select as AntdSelect, type SelectProps as AntdSelectProps } from 'antd'

const { Option } = AntdSelect

export const Select = ({ options, ...antdSelectProps }: AntdSelectProps): React.JSX.Element => {
  return (
    <AntdSelect
      { ...antdSelectProps }
    >
      {options?.map(option => (
        <Option
          key={ option.value }
          value={ option.value }
        >
          {option.label}
        </Option>
      ))}
    </AntdSelect>
  )
}
