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
import { useLanguageSelection } from '@Pimcore/modules/data-object/editor/toolbar/language-selection/provider/use-language-selection'
import React, { useState } from 'react'

export interface LocalizationSwitchProps {
  initialValue?: string
  onChange?: (value: string) => void
}

export const LocalizationSwitch = (props: LocalizationSwitchProps): React.JSX.Element => {
  const { currentLanguage } = useLanguageSelection()
  const [value, setValue] = useState<string>(props.initialValue ?? 'default')

  const onChange: SegmentedProps['onChange'] = (value) => {
    setValue(value)
    props.onChange?.(value)
  }

  return (
    <Segmented
      onChange={ onChange }
      options={ [
        {
          value: 'default',
          label: 'Default'
        },
        {
          value: 'current-language',
          label: `Current language (${currentLanguage.toUpperCase()})`
        }
      ] }
      value={ value }
    />
  )
}
