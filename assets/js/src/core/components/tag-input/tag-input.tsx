/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Select, type SelectProps } from '@Pimcore/components/select/select'
import { isArray, isEmpty, isNil, isString } from 'lodash'
import React, { useCallback, useMemo, useState } from 'react'
import { useStyles } from './tag-input.styles'
import cn from 'classnames'

export interface TagInputProps extends Omit<SelectProps, 'mode' | 'options' | 'showSearch' | 'suffixIcon'> {
  value?: string[] | string
  onChange?: (value: string[]) => void
}

const normalizeValue = (value: string[] | string | undefined): string[] => {
  if (isNil(value)) return []
  if (isArray(value)) return value
  if (isString(value) && !isEmpty(value.trim())) {
    return value.split(',').map((item) => item.trim()).filter((item) => !isEmpty(item))
  }
  return []
}

export const TagInput = ({ value, onChange, className, onBlur, ...restProps }: TagInputProps): React.JSX.Element => {
  const { styles } = useStyles()
  const [searchValue, setSearchValue] = useState('')
  const normalizedValue = useMemo(() => normalizeValue(value), [value])

  const options = useMemo(() => {
    return normalizedValue.map((item) => ({ label: item, value: item }))
  }, [normalizedValue])

  const handleChange = useCallback((newValue: string[]): void => {
    onChange?.(newValue)
    setSearchValue('')
  }, [onChange])

  const handleBlur: SelectProps['onBlur'] = useCallback((e: React.FocusEvent<HTMLElement>): void => {
    const trimmed = searchValue.trim()

    if (trimmed !== '') {
      onChange?.([...normalizedValue, trimmed])
    }

    setSearchValue('')
    onBlur?.(e)
  }, [searchValue, normalizedValue, onChange, onBlur])

  return (
    <Select
      { ...restProps }
      className={ cn(styles.tagInput, className) }
      mode="tags"
      onBlur={ handleBlur }
      onChange={ handleChange }
      onSearch={ setSearchValue }
      open={ false }
      options={ options }
      searchValue={ searchValue }
      suffixIcon={ null }
      value={ normalizedValue }
    />
  )
}
