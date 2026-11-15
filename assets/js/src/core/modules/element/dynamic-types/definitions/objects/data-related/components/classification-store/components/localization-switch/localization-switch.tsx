/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Segmented, type SegmentedProps } from '@Pimcore/components/segmented/segmented'
import { useLanguageSelection } from '@Pimcore/components/language-selection/provider/use-language-selection'
import React, { useState } from 'react'

export interface LocalizationSwitchProps {
  initialValue?: string
  onChange?: (value: string) => void
  /**
   * When the user's language permissions exclude the language independent ("default") column, the
   * option must not be offered at all - otherwise it shows up empty and seemingly editable.
   */
  allowLanguageIndependentValue?: boolean
}

export const LocalizationSwitch = (props: LocalizationSwitchProps): React.JSX.Element => {
  const { allowLanguageIndependentValue = true } = props
  const { currentLanguage } = useLanguageSelection()
  const [value, setValue] = useState<string>(props.initialValue ?? 'default')

  const onChange: SegmentedProps['onChange'] = (value) => {
    setValue(value)
    props.onChange?.(value)
  }

  const options = [
    {
      value: 'current-language',
      label: `Current language (${currentLanguage.toUpperCase()})`
    }
  ]

  if (allowLanguageIndependentValue) {
    options.unshift({
      value: 'default',
      label: 'Default'
    })
  }

  return (
    <Segmented
      onChange={ onChange }
      options={ options }
      value={ value }
    />
  )
}
