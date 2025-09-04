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
import { DatePicker } from '@sdk/components'
import { InheritanceOverlay } from '../inheritance-overlay/inheritance-overlay'
import { useFieldWidth } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'

export interface DateEditableValue {
  value?: string | null
}

export interface DateEditableConfig {
  class?: string
}

interface DateEditableProps {
  value?: string | null
  config?: DateEditableConfig
  onChange?: (value: string | null) => void
  inherited?: boolean
}

export const DateEditable = ({
  value,
  config,
  onChange,
  inherited
}: DateEditableProps): React.JSX.Element => {
  const fieldWidths = useFieldWidth()
  
  const handleOverwrite = (): void => {
    onChange?.(value ?? null)
  }

  const handleChange = (newValue: string | null): void => {
    onChange?.(newValue)
  }

  const containerStyle = {
    width: '100%',
    maxWidth: fieldWidths?.small
  }

  return (
    <InheritanceOverlay
      addIconSpacing
      display="inline-block"
      isInherited={ Boolean(inherited) }
      onOverwrite={ handleOverwrite }
      style={ containerStyle }
    >
      <DatePicker
        allowClear
        className={ config?.class }
        disabled={ inherited }
        onChange={ handleChange }
        outputType="dateString"
        style={ containerStyle }
        value={ value }
      />
    </InheritanceOverlay>
  )
}
