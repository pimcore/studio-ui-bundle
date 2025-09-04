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
import { toCssDimension } from '@sdk/utils'
import { useFieldWidth } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'

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
}

export const NumericEditable = ({
  value,
  config,
  onChange,
  inherited
}: NumericEditableProps): React.JSX.Element => {
  const defaultFieldWidth = useFieldWidth()

  const handleOverwrite = (): void => {
    onChange?.(value ?? null)
  }

  const handleChange = (newValue: number | null): void => {
    onChange?.(newValue)
  }

  const containerStyle = {
    width: '100%',
    maxWidth: toCssDimension(config?.width, defaultFieldWidth?.small)
  }

  return (
    <InheritanceOverlay
      addIconSpacing
      display="inline-block"
      isInherited={ Boolean(inherited) }
      onOverwrite={ handleOverwrite }
      style={ containerStyle }
    >
      <InputNumber
        className={ config?.class }
        disabled={ inherited }
        max={ config?.maxValue }
        min={ config?.minValue }
        onChange={ handleChange }
        style={ containerStyle }
        value={ value }
      />
    </InheritanceOverlay>
  )
}
