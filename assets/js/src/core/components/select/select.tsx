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

import React, { forwardRef, useRef, useImperativeHandle, useState } from 'react'
import type { RefSelectProps } from 'antd/es/select'
import { Checkbox, Select as AntdSelect, type SelectProps as AntdSelectProps } from 'antd'
import cn from 'classnames'
import { Icon } from '@Pimcore/components/icon/icon'
import { isEmptyValue, isString } from '@Pimcore/utils/type-utils'
import { useStyles } from './select.styles'

const { Option } = AntdSelect

interface SelectProps extends AntdSelectProps {
  customArrowIcon?: string
}

export const Select = forwardRef<RefSelectProps, SelectProps>(({ options, customArrowIcon, mode, ...antdSelectProps }, ref): React.JSX.Element => {
  const selectRef = useRef<RefSelectProps>(null)

  const [isActive, setIsActive] = useState(false)

  useImperativeHandle(ref, () => selectRef.current!)

  const { styles } = useStyles()

  const selectorClassNames = cn(styles.select)

  const handleClick = (): void => { setIsActive(!isActive) }

  const getSuffixIcon = (): React.JSX.Element => {
    const isShowCustomIcon = !isEmptyValue(customArrowIcon) && isString(customArrowIcon)
    const iconToShow = isShowCustomIcon ? customArrowIcon! : (isActive ? 'chevron-up' : 'chevron-down')

    return (
      <Icon
        className={ styles.arrowIcon }
        name={ iconToShow }
      />
    )
  }

  const getItemSelectedIcon = (): React.JSX.Element | null => {
    if (mode === 'multiple') {
      return <Checkbox checked />
    }

    return null
  }

  return (
    <AntdSelect
      className={ selectorClassNames }
      menuItemSelectedIcon={ getItemSelectedIcon() }
      mode={ mode }
      onDropdownVisibleChange={ handleClick }
      ref={ selectRef }
      suffixIcon={ getSuffixIcon() }
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
})

Select.displayName = 'SelectComponent'
