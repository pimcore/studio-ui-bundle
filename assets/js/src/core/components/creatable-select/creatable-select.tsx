/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Box, Button, Divider, Flex, Input, InputNumber, Select, Text, type SelectProps } from '@sdk/components'
import { type SelectOptionType } from '@sdk/modules/element'
import { isNil } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export interface CreatableSelectProps extends Omit<SelectProps, 'options'> {
  options: SelectOptionType[]
  onCreateOption?: (value: string) => SelectOptionType | undefined
  creatable?: boolean
  createOptionLabel?: string
  allowDuplicates?: boolean
  inputType?: 'string' | 'number'
  validate?: (value: string) => boolean
  numberInputProps?: React.ComponentProps<typeof InputNumber>
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
  ...selectProps
}: CreatableSelectProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [customOptions, setCustomOptions] = useState<SelectOptionType[]>([])
  const [newOptionText, setNewOptionText] = useState('')
  const [pendingSelection, setPendingSelection] = useState<SelectOptionType | null>(null)
  const allOptions = [...options, ...customOptions]

  // Auto-add value or defaultValue if it's not in the options list
  useEffect(() => {
    const valueToCheck = value ?? selectProps.defaultValue
    if (valueToCheck !== null && valueToCheck !== undefined && typeof valueToCheck === 'string' && valueToCheck.trim() !== '') {
      const valueExists = allOptions.some(opt => opt.value === valueToCheck)
      if (!valueExists) {
        let autoOption = onCreateOption?.(valueToCheck)

        if (isNil(autoOption)) {
          autoOption = {
            value: valueToCheck,
            label: valueToCheck
          }
        }
        setCustomOptions(prev => {
          // Check if already added to avoid duplicates
          const alreadyAdded = prev.some(opt => opt.value === valueToCheck)
          if (alreadyAdded) return prev
          return [...prev, autoOption]
        })
      }
    }
  }, [value, selectProps.defaultValue, allOptions, onCreateOption])

  // Handle pending selection after state update
  useEffect(() => {
    if (pendingSelection !== null && onChange !== undefined) {
      onChange(pendingSelection.value, pendingSelection)
      setPendingSelection(null)
    }
  }, [customOptions, pendingSelection, onChange])

  const createNewOption = (value: string): SelectOptionType => {
    let newOption = onCreateOption?.(value)

    if (isNil(newOption)) {
      newOption = {
        value,
        label: value
      }
    }

    return newOption
  }

  const handleAddOption = useCallback(() => {
    const trimmedValue = newOptionText.trim()

    if (trimmedValue === '') return

    // Check if option already exists in all options
    const optionExists = allOptions.some(opt => opt.value === trimmedValue)
    if (optionExists && !allowDuplicates) {
      setNewOptionText('')
      return
    }

    // Validate the input value
    if (validate !== undefined && !validate(trimmedValue)) {
      return
    }

    const newOption = createNewOption(trimmedValue)

    // Add to custom options
    setCustomOptions(prev => [...prev, newOption])
    setNewOptionText('')

    // Set pending selection to trigger after state update
    setPendingSelection(newOption)
  }, [newOptionText, allOptions, allowDuplicates, onCreateOption, validate])

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
            { ...numberInputProps }
            onChange={ (e) => {
              if (!isNil(e)) {
                setNewOptionText(e.toString())
              }
            } }
            onKeyDown={ handleKeyDown }
            placeholder={ t(createOptionLabel ?? 'creatable-select.add-custom-option') }
            size="small"
            style={ { flex: 1 } }
            value={ newOptionText }
          />
        )
      case 'string':
      default:
        return (
          <Input
            onChange={ (e) => { setNewOptionText(e.target.value) } }
            onKeyDown={ handleKeyDown }
            placeholder={ t(createOptionLabel ?? 'creatable-select.add-custom-option') }
            size="small"
            style={ { flex: 1 } }
            value={ newOptionText }
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
        <Box padding={ { x: 'small', top: 'extra-small', bottom: 'small' } }>
          <Flex
            gap="extra-small"
            vertical
          >
            <Flex gap="small">
              {getInputDependantField()}
              <Button
                disabled={ newOptionText.trim() === '' || (validate !== undefined && !validate(newOptionText.trim())) || (!allowDuplicates && allOptions.some(opt => opt.value === newOptionText.trim())) }
                onClick={ handleAddOption }
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
      { ...selectProps }
      dropdownRender={ customDropdownRender }
      onChange={ onChange }
      options={ allOptions }
      value={ value }
    />
  )
}

export const CreatableSelect = Component
