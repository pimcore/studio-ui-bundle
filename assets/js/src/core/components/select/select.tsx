/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { forwardRef, useRef, useImperativeHandle, useState } from 'react'
import type { RefSelectProps } from 'antd/es/select'
import { Checkbox, Flex, Select as AntdSelect, type SelectProps as AntdSelectProps, Skeleton } from 'antd'
import cn from 'classnames'
import { isString } from 'lodash'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { Icon } from '@Pimcore/components/icon/icon'
import { Spin } from '@Pimcore/components/spin/spin'
import { useStyles } from './select.styles'
import { SelectActionButton } from './select-action-button'
import { useTrackedSearch } from './use-tracked-search'
import { getSelectableOptions, getSelectAllValues } from './select-all-values'
import { useTranslation } from 'react-i18next'
import { useFieldWidthOptional } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'

export const sizeOptions = {
  normal: 150
}

export type SelectTheme = 'default' | 'primary'

export interface SelectProps extends AntdSelectProps {
  customArrowIcon?: string
  customIcon?: string
  dataTestId?: string
  inherited?: boolean
  width?: number | keyof typeof sizeOptions
  minWidth?: number | keyof typeof sizeOptions
  theme?: SelectTheme
  loadingSkeleton?: boolean
  /** Adds a "Select all" row to the dropdown (only for `mode="multiple"` without `maxCount`). */
  allowSelectAll?: boolean
}

export const Select = forwardRef<RefSelectProps, SelectProps>(({
  customIcon,
  customArrowIcon,
  mode,
  status,
  className,
  allowClear,
  inherited,
  value,
  width,
  minWidth,
  theme = 'default',
  loadingSkeleton = false,
  allowSelectAll = false,
  dataTestId,
  loading = false,
  onDropdownVisibleChange,
  onSearch,
  onSelect,
  onFocus,
  onBlur,
  ...antdSelectProps
}, ref): React.JSX.Element => {
  const { t } = useTranslation()
  const selectRef = useRef<RefSelectProps>(null)
  const fieldWidths = useFieldWidthOptional()

  const [isActive, setIsActive] = useState(false)
  const [isFocus, setIsFocus] = useState(false)
  const { searchValue, resetSearch, handleSearch, handleSelect } = useTrackedSearch({
    mode,
    autoClearSearchValue: antdSelectProps.autoClearSearchValue,
    onSearch,
    onSelect
  })

  useImperativeHandle(ref, () => selectRef.current!)

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

  let computedMinWidth: undefined | number

  if (typeof minWidth === 'number') {
    computedMinWidth = minWidth
  }

  if (typeof minWidth === 'string') {
    computedMinWidth = sizeOptions[minWidth as keyof typeof sizeOptions]
  }

  const selectStyle = antdSelectProps.style
  const skeletonWidth = computedWidth ?? selectStyle?.width ?? selectStyle?.maxWidth ?? '100%'
  const skeletonMaxWidth = selectStyle?.maxWidth ?? '100%'
  const skeletonMinWidth = computedMinWidth ?? selectStyle?.minWidth

  const { styles } = useStyles({
    width: computedWidth,
    theme,
    skeletonWidth,
    skeletonMaxWidth,
    skeletonMinWidth
  })

  // Show skeleton if loading
  if (loadingSkeleton) {
    // Map Select size to Skeleton size
    const getSkeletonSize = (): 'small' | 'default' | 'large' => {
      if (antdSelectProps.size === 'small') return 'small'
      if (antdSelectProps.size === 'large') return 'large'
      return 'default'
    }

    return (
      <div
        className={ cn(styles.skeletonLoading, className) }
      >
        <Skeleton.Input
          active
          size={ getSkeletonSize() }
        />
      </div>
    )
  }

  const withCustomIcon = !isEmptyValue(customIcon)
  const isStatusWarning = status === 'warning'
  const isStatusError = status === 'error'

  const selectContainerClassNames = cn('studio-select', styles.selectContainer, {
    [styles.selectContainerWarning]: isStatusWarning,
    [styles.selectContainerError]: isStatusError,
    [styles.selectContainerWithClear]: allowClear === true,
    [styles.selectContainerPrimary]: theme === 'primary'
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

  // Compose internal dropdown/focus state with optional consumer handlers (don't override them).
  const handleDropdownVisibleChange = (open: boolean): void => {
    setIsActive(open)
    if (!open) {
      resetSearch()
    }
    onDropdownVisibleChange?.(open)
  }

  const handleFocus = (event: React.FocusEvent<HTMLElement>): void => {
    setIsFocus(true)
    onFocus?.(event)
  }

  const handleBlur = (event: React.FocusEvent<HTMLElement>): void => {
    setIsFocus(false)
    onBlur?.(event)
  }

  const getSuffixIcon = (): React.JSX.Element => {
    if (loading) {
      return <Spin type="classic" />
    }

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

  // Apply field width as default maxWidth, with optional explicit minWidth
  const computedStyle = {
    maxWidth: computedWidth,
    minWidth: computedMinWidth,
    ...antdSelectProps.style
  }

  const isClearable = allowClear !== undefined && allowClear !== false
  const shouldShowClearOption = isClearable && !isEmptyValue(value)

  const handleClearSelection = (): void => {
    const clearedValue = mode === 'multiple' ? [] as string[] : undefined
    antdSelectProps.onChange?.(clearedValue, [])
    selectRef.current?.blur()
  }

  const { options, optionFilterProp, filterOption, maxCount } = antdSelectProps
  const selectAllContext = { options, value, searchValue, optionFilterProp, filterOption }
  const shouldShowSelectAll = allowSelectAll && mode === 'multiple' && maxCount === undefined && getSelectableOptions(selectAllContext).length > 0

  const handleSelectAll = (): void => {
    const values = getSelectAllValues(selectAllContext)
    const selectedOptions = (options ?? []).filter(option => values.includes(option.value as string))
    antdSelectProps.onChange?.(values, selectedOptions)
  }

  const dropdownRender = shouldShowClearOption || shouldShowSelectAll
    ? (menu: React.ReactElement): React.JSX.Element => (
      <div className={ styles.clearOptionWrapper }>
        {shouldShowSelectAll && (
          <SelectActionButton
            className={ styles.clearOption }
            icon={ 'checkmark' }
            label={ t('select.select-all') }
            onClick={ handleSelectAll }
          />
        )}
        {shouldShowClearOption && (
          <SelectActionButton
            className={ styles.clearOption }
            icon={ 'trash' }
            label={ t('select.clear-selection') }
            onClick={ handleClearSelection }
          />
        )}
        {menu}
      </div>
      )
    : antdSelectProps.dropdownRender

  return (
    <div
      className={ selectContainerClassNames }
      data-testid={ dataTestId }
    >      {withCustomIcon && (
    <Icon
      className={ customIconClassNames }
      value={ customIcon! }
    />
    )}
      <AntdSelect
        allowClear={ false }
        className={ selectClassNames }
        dropdownRender={ dropdownRender }
        menuItemSelectedIcon={ getItemSelectedIcon() }
        mode={ mode }
        notFoundContent={ <Flex
          align={ 'center' }
          justify={ 'center' }
                          >
          <Icon
            className={ 'm-r-mini' }
            value={ 'alert-outline' }
          /> {t('no-data-available')}</Flex> }
        onBlur={ handleBlur }
        onDropdownVisibleChange={ handleDropdownVisibleChange }
        onFocus={ handleFocus }
        onSearch={ handleSearch }
        onSelect={ handleSelect }
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
