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

interface SelectProps extends AntdSelectProps {
  customArrowIcon?: string
  customIcon?: string
}

export const Select = forwardRef<RefSelectProps, SelectProps>(({ customIcon, customArrowIcon, mode, status, ...antdSelectProps }, ref): React.JSX.Element => {
  const selectRef = useRef<RefSelectProps>(null)

  const [isActive, setIsActive] = useState(false)
  const [isFocus, setIsFocus] = useState(false)

  useImperativeHandle(ref, () => selectRef.current!)

  const { styles } = useStyles()

  const withCustomIcon = !isEmptyValue(customIcon)

  const selectContainerClassNames = cn(styles.selectContainer, {
    [styles.selectContainerWarning]: status === 'warning',
    [styles.selectContainerError]: status === 'error'
  })
  const selectClassNames = cn(styles.select, {
    [styles.selectWithCustomIcon]: withCustomIcon
  })
  const customIconClassNames = cn(styles.customIcon, 'custom-select-icon', {
    [styles.customIconActive]: isActive || isFocus,
    [styles.customIconWarning]: (isActive || isFocus) && status === 'warning',
    [styles.customIconError]: (isActive || isFocus) && status === 'error'
  })

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
    <div className={ selectContainerClassNames }>
      {withCustomIcon && (
        <Icon
          className={ customIconClassNames }
          name={ customIcon! }
        />
      )}
      <AntdSelect
        className={ selectClassNames }
        menuItemSelectedIcon={ getItemSelectedIcon() }
        mode={ mode }
        onBlur={ () => { setIsFocus(false) } }
        onDropdownVisibleChange={ handleClick }
        onFocus={ () => { setIsFocus(true) } }
        ref={ selectRef }
        status={ status }
        suffixIcon={ getSuffixIcon() }
        { ...antdSelectProps }
      />
    </div>
  )
})

Select.displayName = 'SelectComponent'
