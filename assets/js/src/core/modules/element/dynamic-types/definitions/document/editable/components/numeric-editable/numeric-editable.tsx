/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { InputNumber } from '@sdk/components'
import { InheritanceOverlay } from '../inheritance-overlay/inheritance-overlay'
import cn from 'classnames'
import { toCssDimension } from '@sdk/utils'

export interface NumericEditableValue {
  value?: number | null
}

export interface NumericEditableConfig {
  minValue?: number
  maxValue?: number
  width?: number
  class?: string
  defaultValue?: string
  required?: boolean
}

interface NumericEditableProps {
  value?: number | null
  config?: NumericEditableConfig
  onChange?: (value: number | null) => void
  inherited?: boolean
  defaultFieldWidth?: {
    small: number
    medium: number
    large: number
  }
}

export const NumericEditable = ({
  value,
  config,
  onChange,
  inherited,
  defaultFieldWidth
}: NumericEditableProps): React.JSX.Element => {
  const handleOverwrite = (): void => {
    onChange?.(value ?? null)
  }

  const handleChange = (newValue: number | null): void => {
    onChange?.(newValue)
  }

  return (
    <InheritanceOverlay
      addIconSpacing
      display="inline-block"
      isInherited={ Boolean(inherited) }
      onOverwrite={ handleOverwrite }
    >
      <InputNumber
        className={ cn('w-full', config?.class) }
        disabled={ inherited }
        max={ config?.maxValue }
        min={ config?.minValue }
        onChange={ handleChange }
        style={ { maxWidth: toCssDimension(config?.width, defaultFieldWidth?.small) } }
        value={ value }
      />
    </InheritanceOverlay>
  )
}
