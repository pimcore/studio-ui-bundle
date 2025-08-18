/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { forwardRef, useRef, useImperativeHandle, useState, useEffect } from 'react'
import type { RefSelectProps } from 'antd/es/select'
import { Checkbox, Flex, Select as AntdSelect, type SelectProps as AntdSelectProps } from 'antd'
import cn from 'classnames'
import { isEmpty, isString } from 'lodash'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { Icon } from '@Pimcore/components/icon/icon'
import { useStyles } from './select.styles'
import { useTranslation } from 'react-i18next'
import { useFieldWidthOptional } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'

export const sizeOptions = {
  normal: 150
}

export interface SelectProps extends AntdSelectProps {
  customArrowIcon?: string
  customIcon?: string
  inherited?: boolean
  width?: number | keyof typeof sizeOptions
  minWidth?: number | keyof typeof sizeOptions
}

export const Select = forwardRef<RefSelectProps, SelectProps>(({ customIcon, customArrowIcon, mode, status, className, allowClear, inherited, value, width, minWidth, ...antdSelectProps }, ref): React.JSX.Element => {
  const { t } = useTranslation()
  const selectRef = useRef<RefSelectProps>(null)
  const fieldWidths = useFieldWidthOptional()

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

  // Calculate width: explicit width prop takes precedence over fieldWidths
  const getComputedWidth = (): number | undefined => {
    if (width !== undefined) {
      // Handle explicit width prop
      if (typeof width === 'number') {
        return width
      }
      if (typeof width === 'string' && width in sizeOptions) {
        return sizeOptions[width as keyof typeof sizeOptions]
      }
    }

    // Fall back to fieldWidths
    return mode === 'multiple' ? fieldWidths?.large : fieldWidths?.medium
  }

  const computedWidth = getComputedWidth()

  const { styles } = useStyles({ width: computedWidth })

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

  // Apply field width as default maxWidth, with optional explicit minWidth
  const computedStyle = {
    maxWidth: computedWidth,
    minWidth: computedMinWidth,
    ...antdSelectProps.style
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
        notFoundContent={ <Flex
          align={ 'center' }
          justify={ 'center' }
                          >
          <Icon
            className={ 'm-r-mini' }
            value={ 'warning-circle' }
          /> {t('no-data-available')}</Flex> }
        onBlur={ () => { setIsFocus(false) } }
        onDropdownVisibleChange={ handleClick }
        onFocus={ () => { setIsFocus(true) } }
        ref={ selectRef }
        status={ status }
        style={ computedStyle }
        suffixIcon={ getSuffixIcon() }
        value={ value }
        { ...antdSelectProps }
      />
    </div>
  )
})

Select.displayName = 'SelectComponent'
