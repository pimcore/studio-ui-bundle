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
import { isString, isEmpty } from 'lodash'
import { Icon } from '@Pimcore/components/icon/icon'
import { useStyles } from './select.styles'

export interface SelectProps extends AntdSelectProps {
  customArrowIcon?: string
  customIcon?: string
  inherited?: boolean
  width?: number
}

export const Select = forwardRef<RefSelectProps, SelectProps>(({ customIcon, customArrowIcon, mode, status, className, width, allowClear, inherited, ...antdSelectProps }, ref): React.JSX.Element => {
  const selectRef = useRef<RefSelectProps>(null)

  const [isActive, setIsActive] = useState(false)
  const [isFocus, setIsFocus] = useState(false)
  const [isSelected, setIsSelected] = useState(false)

  useImperativeHandle(ref, () => selectRef.current!)

  const { styles } = useStyles({ width })

  const withCustomIcon = !isEmpty(customIcon)
  const isStatusWarning = status === 'warning'
  const isStatusError = status === 'error'

  const selectContainerClassNames = cn('studio-select', styles.selectContainer, {
    [styles.selectContainerWarning]: isStatusWarning,
    [styles.selectContainerError]: isStatusError,
    [styles.selectContainerWithClear]: allowClear === true && isSelected
  })
  const selectClassNames = cn(className, styles.select, {
    [styles.selectWithCustomIcon]: withCustomIcon,
    'ant-select--inherited': inherited
  })
  const customIconClassNames = cn(styles.customIcon, 'custom-select-icon', {
    [styles.customIconActive]: isActive || isFocus,
    [styles.customIconWarning]: (isActive || isFocus) && isStatusWarning,
    [styles.customIconError]: (isActive || isFocus) && isStatusError
  })

  const handleClick = (): void => { setIsActive(!isActive) }

  const handleChange = (value: string): void => {
    !isEmpty(value) ? setIsSelected(true) : setIsSelected(false)
  }

  const getSuffixIcon = (): React.JSX.Element => {
    const isShowCustomIcon = !isEmpty(customArrowIcon) && isString(customArrowIcon)
    const defaultIcon = isActive ? 'chevron-up' : 'chevron-down'

    const iconToShow = isShowCustomIcon ? customArrowIcon : defaultIcon

    return (
      <Icon
        className={ styles.arrowIcon }
        value={ iconToShow }
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
    <div className={ selectContainerClassNames }>
      {withCustomIcon && (
        <Icon
          className={ customIconClassNames }
          value={ customIcon! }
        />
      )}
      <AntdSelect
        allowClear={ allowClear }
        className={ selectClassNames }
        menuItemSelectedIcon={ getItemSelectedIcon() }
        mode={ mode }
        onBlur={ () => { setIsFocus(false) } }
        onDropdownVisibleChange={ handleClick }
        onFocus={ () => { setIsFocus(true) } }
        onSelect={ handleChange }
        ref={ selectRef }
        status={ status }
        suffixIcon={ getSuffixIcon() }
        { ...antdSelectProps }
      />
    </div>
  )
})

Select.displayName = 'SelectComponent'
