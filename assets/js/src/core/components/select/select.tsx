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

import React, { forwardRef, useRef, useImperativeHandle, useState, useEffect } from 'react'
import type { RefSelectProps } from 'antd/es/select'
import { Checkbox, Select as AntdSelect, type SelectProps as AntdSelectProps } from 'antd'
import cn from 'classnames'
import { isEmpty, isString } from 'lodash'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { Icon } from '@Pimcore/components/icon/icon'
import { useStyles } from './select.styles'

export const sizeOptions = {
  normal: 150
}

export interface SelectProps extends AntdSelectProps {
  customArrowIcon?: string
  customIcon?: string
  inherited?: boolean
  width?: number
  minWidth?: number | keyof typeof sizeOptions
}

export const Select = forwardRef<RefSelectProps, SelectProps>(({ customIcon, customArrowIcon, mode, status, className, width, allowClear, inherited, value, minWidth, ...antdSelectProps }, ref): React.JSX.Element => {
  const selectRef = useRef<RefSelectProps>(null)

  const [isActive, setIsActive] = useState(false)
  const [isFocus, setIsFocus] = useState(false)
  const [isSelected, setIsSelected] = useState(!isEmptyValue(value))

  useImperativeHandle(ref, () => selectRef.current!)

  useEffect(() => {
    if (!isEmpty(value) || !isEmptyValue(value)) {
      setIsSelected(true)
    } else {
      setIsSelected(false)
    }
  }, [value])

  const { styles } = useStyles({ width })

  const withCustomIcon = !isEmptyValue(customIcon)
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

  const getSuffixIcon = (): React.JSX.Element => {
    const isShowCustomIcon = !isEmptyValue(customArrowIcon) && isString(customArrowIcon)
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

  let computedMinWidth: undefined | number

  if (typeof minWidth === 'number') {
    computedMinWidth = minWidth
  }

  if (typeof minWidth === 'string') {
    computedMinWidth = sizeOptions[minWidth as keyof typeof sizeOptions]
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
        ref={ selectRef }
        status={ status }
        style={ { minWidth: computedMinWidth } }
        suffixIcon={ getSuffixIcon() }
        value={ value }
        { ...antdSelectProps }
      />
    </div>
  )
})

Select.displayName = 'SelectComponent'
