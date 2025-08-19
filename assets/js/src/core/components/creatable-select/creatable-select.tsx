/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState, useCallback, useEffect } from 'react'
import { Select, Input, Button, Divider, Flex, Box, Text, InputNumber } from '@sdk/components'
import { type SelectProps } from '@sdk/components'
import { type SelectOptionType } from '@sdk/modules/element'
import { useTranslation } from 'react-i18next'
import { isNil } from 'lodash'

export interface CreatableSelectProps extends Omit<SelectProps, 'options'> {
  options: SelectOptionType[]
  onCreateOption?: (value: string) => void
  creatable?: boolean
  createOptionLabel?: string
  allowDuplicates?: boolean
  inputType?: 'string' | 'number'
  validate?: (value: string) => boolean
  numberInputProps?: React.ComponentProps<typeof InputNumber>
  generateLabel?: (value: string) => string
}

const Component = ({
  options,
  onCreateOption,
  creatable = true,
  createOptionLabel,
  allowDuplicates = false,
  value,
  onChange,
  inputType = 'string',
  validate,
  numberInputProps = {},
  generateLabel,
  ...selectProps
}: CreatableSelectProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [customOptions, setCustomOptions] = useState<SelectOptionType[]>([])
  const [newOptionText, setNewOptionText] = useState('')

  const allOptions = [...options, ...customOptions]

  // Auto-add value or defaultValue if it's not in the options list
  useEffect(() => {
    const valueToCheck = value ?? selectProps.defaultValue
    if (valueToCheck !== null && valueToCheck !== undefined && typeof valueToCheck === 'string' && valueToCheck.trim() !== '') {
      const valueExists = allOptions.some(opt => opt.value === valueToCheck)
      if (!valueExists) {
        const autoOption: SelectOptionType = {
          value: valueToCheck,
          label: generateLabel !== undefined ? generateLabel(valueToCheck) : valueToCheck
        }
        setCustomOptions(prev => {
          // Check if already added to avoid duplicates
          const alreadyAdded = prev.some(opt => opt.value === valueToCheck)
          if (alreadyAdded) return prev
          return [...prev, autoOption]
        })
        onCreateOption?.(valueToCheck)
      }
    }
  }, [value, selectProps.defaultValue, allOptions, onCreateOption, generateLabel])

  const handleAddOption = useCallback(() => {
    const trimmedValue = newOptionText.trim()

    if (trimmedValue === '') return

    // Validate the input value
    if (validate !== undefined && !validate(trimmedValue)) {
      return
    }

    // Check if option already exists in all options
    const optionExists = allOptions.some(opt => opt.value === trimmedValue)
    if (optionExists && !allowDuplicates) {
      setNewOptionText('')
      return
    }

    const newOption: SelectOptionType = {
      value: trimmedValue,
      label: generateLabel !== undefined ? generateLabel(trimmedValue) : trimmedValue
    }

    // Add to custom options
    setCustomOptions(prev => [...prev, newOption])
    onCreateOption?.(trimmedValue)
    setNewOptionText('')

    // Auto-select the newly created option
    if (onChange !== null && onChange !== undefined) {
      onChange(trimmedValue, newOption)
    }
  }, [newOptionText, allOptions, allowDuplicates, onCreateOption, onChange, validate, generateLabel])

  const handleKeyDown = useCallback((e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddOption()
    }
  }, [handleAddOption])

  const getInputDependantField = (): React.JSX.Element => {
    switch (inputType) {
      case 'number':
        return (
          <InputNumber
            {...numberInputProps}
            onChange={(e) => {
              if (!isNil(e)) {
                setNewOptionText(e.toString())
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder={t(createOptionLabel ?? 'creatable-select.add-custom-option')}
            size="small"
            style={{ flex: 1 }}
            value={newOptionText}
          />
        )
      case 'string':
      default:
        return (
          <Input
            onChange={(e) => { setNewOptionText(e.target.value) }}
            onKeyDown={handleKeyDown}
            placeholder={t(createOptionLabel ?? 'creatable-select.add-custom-option')}
            size="small"
            style={{ flex: 1 }}
            value={newOptionText}
          />
        )
    }
  }

  const customDropdownRender = (menu: React.ReactElement): React.JSX.Element => {
    if (!creatable) return menu

    return (
      <>
        {menu}
        <Divider size="normal" />
        <Box padding={{ x: 'small', top: 'extra-small', bottom: 'small' }}>
          <Flex
            gap="extra-small"
            vertical
          >
            <Flex gap="small">
              {getInputDependantField()}
              <Button
                disabled={newOptionText.trim() === '' || (validate !== undefined && !validate(newOptionText.trim())) || (!allowDuplicates && allOptions.some(opt => opt.value === newOptionText.trim()))}
                onClick={handleAddOption}
                size="small"
                type="primary"
              >
                {t('creatable-select.add')}
              </Button>
            </Flex>
            {!allowDuplicates && newOptionText.trim() !== '' && allOptions.some(opt => opt.value === newOptionText.trim()) && (
              <Text type="danger">
                {t('creatable-select.option-already-exists')}
              </Text>
            )}
            {newOptionText.trim() !== '' && validate !== undefined && !validate(newOptionText.trim()) && (
              <Text type="danger">
                {t('creatable-select.invalid-option')}
              </Text>
            )}
          </Flex>
        </Box>
      </>
    )
  }

  return (
    <Select
      {...selectProps}
      dropdownRender={customDropdownRender}
      onChange={onChange}
      options={allOptions}
      value={value}
    />
  )
}

export const CreatableSelect = Component
