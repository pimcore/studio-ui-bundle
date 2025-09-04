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
  const handleOverwrite = (): void => {
    onChange?.(value ?? null)
  }

  const handleChange = (newValue: string | null): void => {
    onChange?.(newValue)
  }

  return (
    <InheritanceOverlay
      addIconSpacing
      display="inline-block"
      isInherited={ Boolean(inherited) }
      onOverwrite={ handleOverwrite }
    >
      <DatePicker
        allowClear
        className={ config?.class }
        disabled={ inherited }
        onChange={ handleChange }
        outputType="dateString"
        value={ value }
      />
    </InheritanceOverlay>
  )
}
