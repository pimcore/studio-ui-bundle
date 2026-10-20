/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Input, InputNumber, Select, Text, type SelectProps } from '@sdk/components'
import { type SelectOptionType } from '@sdk/modules/element'
import { isNil, isUndefined } from 'lodash'
import React, { useCallback, useEffect, useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getDecimalSeparator } from '@Pimcore/utils/number'
import { useStyles } from './creatable-select.styles'

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
  const { styles } = useStyles()
  const [customOptions, setCustomOptions] = useState<SelectOptionType[]>([])
  const [newOptionText, setNewOptionText] = useState('')
  // `onChange` only reports parseable numbers, so the displayed text is tracked via `onInput`.
  const [numberInputText, setNumberInputText] = useState('')
  const [pendingSelection, setPendingSelection] = useState<SelectOptionType | null>(null)
  // Announced after an add, since focus stays in the field (WCAG 4.1.3).
  const [addedMessage, setAddedMessage] = useState('')
  const hintId = useId()
  const messageId = useId()
  const allOptions = [...options, ...customOptions]
  const decimalSeparator = inputType === 'number'
    ? numberInputProps.decimalSeparator ?? getDecimalSeparator()
    : '.'

  const currentInputText = inputType === 'number' ? numberInputText : newOptionText

  const isInputTextValid = useCallback((): boolean => {
    const committedText = newOptionText.trim()

    if (inputType === 'number') {
      const trimmedText = numberInputText.trim()
      // `InputNumber` reads "." as a decimal point in every locale, so "1.000" commits 1 in de.
      const hasForeignSeparator = trimmedText.includes(decimalSeparator === '.' ? ',' : '.')
      const parsedNumber = !isUndefined(numberInputProps.parser)
        ? Number(numberInputProps.parser(trimmedText))
        : hasForeignSeparator ? Number.NaN : Number(trimmedText.replace(decimalSeparator, '.'))

      if (committedText === '' || !Number.isFinite(parsedNumber) || parsedNumber !== Number(committedText)) {
        return false
      }
    }

    return isUndefined(validate) || validate(committedText)
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

    // Validate before the duplicate check, which would otherwise clear the invalid text
    if (!isInputTextValid()) {
      return
    }

    // Check if option already exists in all options
    const optionExists = allOptions.some(opt => opt.value === trimmedValue)
    if (optionExists && !allowDuplicates) {
      setNewOptionText('')
      setNumberInputText('')
      return
    }

    const newOption = createNewOption(trimmedValue)

    // Add to custom options
    setCustomOptions(prev => [...prev, newOption])
    setNewOptionText('')
    setNumberInputText('')

    // Set pending selection to trigger after state update
    setPendingSelection(newOption)
    // React escapes the text itself; i18next escaping would read "/" out as "&#x2F;".
    setAddedMessage(t('creatable-select.option-added', {
      label: typeof newOption.label === 'string' ? newOption.label : trimmedValue,
      interpolation: { escapeValue: false }
    }))
  }, [newOptionText, allOptions, allowDuplicates, onCreateOption, isInputTextValid, t])

  const handleKeyDown = useCallback((e: React.KeyboardEvent): void => {
    if (e.key !== 'Enter') return

    if (inputType === 'number') {
      // `InputNumber` flushes on Enter, re-aligning a rejected value into [min, max].
      e.stopPropagation()
    }

    e.preventDefault()
    handleAddOption()
  }, [inputType, handleAddOption])

  const hasText = currentInputText.trim() !== ''
  const isInvalid = hasText && !isInputTextValid()
  const isDuplicate = hasText && !isInvalid && !allowDuplicates && allOptions.some(opt => opt.value === newOptionText.trim())
  const placeholder = t(createOptionLabel ?? 'creatable-select.add-custom-option')

  // Enter adds the value, so there is no button: the field is named, says how it works, and is
  // marked invalid with its message when the value cannot be added.
  const fieldProps = {
    'aria-describedby': isInvalid || isDuplicate ? `${hintId} ${messageId}` : hintId,
    'aria-invalid': isInvalid || isDuplicate,
    'aria-label': placeholder,
    className: styles.field,
    onKeyDown: handleKeyDown,
    placeholder,
    // Explicit, so a small pager around the select does not shrink the field.
    size: 'middle' as const,
    value: newOptionText
  }

  const getInputDependantField = (): React.JSX.Element => {
    switch (inputType) {
      case 'number':
        return (
          <InputNumber
            changeOnBlur={ false }
            { ...numberInputProps }
            { ...fieldProps }
            onChange={ (value) => {
              const committedText = isNil(value) ? '' : value.toString()

              setNewOptionText(committedText)
              setNumberInputText(committedText)
            } }
            onInput={ (text) => {
              setNumberInputText(text)
              setAddedMessage('')
              numberInputProps.onInput?.(text)
            } }
          />
        )
      case 'string':
      default:
        return (
          <Input
            { ...fieldProps }
            onChange={ (e) => {
              setNewOptionText(e.target.value)
              setAddedMessage('')
            } }
          />
        )
    }
  }

  const customDropdownRender = (menu: React.ReactElement): React.JSX.Element => {
    if (!creatable) return menu

    return (
      <>
        {menu}
        <div className={ styles.footer }>
          {getInputDependantField()}
          <span
            className={ styles.visuallyHidden }
            id={ hintId }
          >
            {t('creatable-select.press-enter-to-add')}
          </span>
          <div
            aria-live="polite"
            id={ messageId }
          >
            {(isInvalid || isDuplicate) && (
              <Text
                className={ styles.message }
                type="danger"
              >
                {t(isInvalid ? 'creatable-select.invalid-option' : 'creatable-select.option-already-exists')}
              </Text>
            )}
            <span className={ styles.visuallyHidden }>{addedMessage}</span>
          </div>
        </div>
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
