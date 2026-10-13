/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type KeyboardEvent } from 'react'
import { InputNumber as AntInputNumber, type InputNumberProps } from 'antd'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import { useStyles } from './input-number.styles'
import { useFieldWidthOptional } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'
import { getDecimalSeparator } from '@Pimcore/utils/number'

export interface IInputNumberProps extends InputNumberProps {
  inherited?: boolean
}

/**
 * Whether a keystroke can become part of a number the way the field parses it: digits, a minus
 * sign, the decimal separator (plus the dot, which the parser always accepts, and the ideographic
 * full stop it maps to a dot). Shortcuts (Ctrl/Cmd/Alt) and non-printable keys such as Backspace,
 * Tab or the arrows report a multi-character `key` and are never touched.
 */
const isNumericKeystroke = (event: KeyboardEvent<HTMLInputElement>, decimalSeparator: string): boolean => {
  const { key } = event

  if (key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey) {
    return true
  }

  return /[0-9-]/.test(key) || key === '.' || key === '。' || key === decimalSeparator
}

export const InputNumber = ({ inherited, className, style, decimalSeparator, onKeyDown, ...restProps }: IInputNumberProps): JSX.Element => {
  const { styles } = useStyles()
  const fieldWidths = useFieldWidthOptional()
  const { i18n } = useTranslation()
  const effectiveDecimalSeparator = decimalSeparator ?? getDecimalSeparator(i18n?.language)

  // The underlying input is a plain text input, so without this every character is accepted and
  // only discarded on blur — which looks like the field silently dropped what was typed. A custom
  // parser may accept other characters, so the filter is skipped when one is given.
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    onKeyDown?.(event)

    if (restProps.parser === undefined && !isNumericKeystroke(event, effectiveDecimalSeparator)) {
      event.preventDefault()
    }
  }

  // Apply small width as default for number inputs
  const computedStyle = {
    maxWidth: fieldWidths?.small,
    ...style
  }

  return (
    <AntInputNumber
      className={ cn(styles.inputNumber, className, { [styles.inherited]: inherited }) }
      decimalSeparator={ effectiveDecimalSeparator }
      onKeyDown={ handleKeyDown }
      style={ computedStyle }
      { ...restProps }
    />
  )
}
