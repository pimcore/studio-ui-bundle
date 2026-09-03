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
import { getDecimalSeparator } from '@Pimcore/utils/number'

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
  const { t, i18n } = useTranslation()
  const [customOptions, setCustomOptions] = useState<SelectOptionType[]>([])
  const [newOptionText, setNewOptionText] = useState('')
  // `onChange` only reports parseable numbers, so the displayed text is tracked via `onInput`.
  const [numberInputText, setNumberInputText] = useState('')
  const [pendingSelection, setPendingSelection] = useState<SelectOptionType | null>(null)
  const allOptions = [...options, ...customOptions]
  const decimalSeparator = inputType === 'number'
    ? numberInputProps.decimalSeparator ?? getDecimalSeparator(i18n?.language)
    : '.'

  const currentInputText = inputType === 'number' ? numberInputText : newOptionText

  const isInputTextValid = useCallback((): boolean => {
    const committedText = newOptionText.trim()

    if (inputType === 'number') {
      const trimmedText = numberInputText.trim()
      // `InputNumber` reads "." as a decimal point in every locale, so "1.000" commits 1 in de.
      const hasForeignSeparator = trimmedText.includes(decimalSeparator === '.' ? ',' : '.')
      const parsedNumber = numberInputProps.parser !== undefined
        ? Number(numberInputProps.parser(trimmedText))
        : hasForeignSeparator ? NaN : Number(trimmedText.replace(decimalSeparator, '.'))

      if (committedText === '' || !Number.isFinite(parsedNumber) || parsedNumber !== Number(committedText)) {
        return false
      }
    }

    return validate === undefined || validate(committedText)
  }, [inputType, numberInputText, decimalSeparator, numberInputProps.parser, newOptionText, validate])

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

    if (inputType === 'number' && !isInputTextValid()) {
      return
    }

    // Check if option already exists in all options
    const optionExists = allOptions.some(opt => opt.value === trimmedValue)
    if (optionExists && !allowDuplicates) {
      setNewOptionText('')
      setNumberInputText('')
      return
    }

    // Validate the input value
    if (!isInputTextValid()) {
      return
    }

    const newOption = createNewOption(trimmedValue)

    // Add to custom options
    setCustomOptions(prev => [...prev, newOption])
    setNewOptionText('')
    setNumberInputText('')

    // Set pending selection to trigger after state update
    setPendingSelection(newOption)
  }, [newOptionText, allOptions, allowDuplicates, onCreateOption, isInputTextValid])

  const handleKeyDown = useCallback((e: React.KeyboardEvent): void => {
    if (e.key !== 'Enter') return

    if (inputType === 'number') {
      // `InputNumber` flushes on Enter, re-aligning a rejected value into [min, max].
      e.stopPropagation()
    }

    e.preventDefault()
    handleAddOption()
  }, [inputType, handleAddOption])

  const getInputDependantField = (): React.JSX.Element => {
    switch (inputType) {
      case 'number':
        return (
          <InputNumber
            changeOnBlur={ false }
            { ...numberInputProps }
            onChange={ (value) => {
              const committedText = isNil(value) ? '' : value.toString()

              setNewOptionText(committedText)
              setNumberInputText(committedText)
            } }
            onInput={ (text) => {
              setNumberInputText(text)
              numberInputProps.onInput?.(text)
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
                disabled={ currentInputText.trim() === '' || !isInputTextValid() || (!allowDuplicates && allOptions.some(opt => opt.value === newOptionText.trim())) }
                onClick={ handleAddOption }
                size="small"
                type="primary"
              >
                {t('creatable-select.add')}
              </Button>
            </Flex>
            {!allowDuplicates && currentInputText.trim() !== '' && isInputTextValid() && allOptions.some(opt => opt.value === newOptionText.trim()) && (
              <Text type="danger">
                {t('creatable-select.option-already-exists')}
              </Text>
            )}
            {currentInputText.trim() !== '' && !isInputTextValid() && (
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
