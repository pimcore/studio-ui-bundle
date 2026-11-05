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
import { type Color } from 'antd/es/color-picker'
import { ColorPicker } from '@sdk/components'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'
import { EditableOverlay } from '../editable-overlay/editable-overlay'
import { useStyles } from './color-input-editable.styles'

export interface ColorInputEditableProps {
  value?: string | null
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  inherited?: boolean
}

/**
 * An input editable drawn as Studio's colour picker (`color: true` in the editable's config): a
 * swatch with the colour's hex code. The value stays what the input editable always stores, the
 * hex text, or an empty string once cleared. An empty field shows its placeholder instead, the
 * colour that applies while the field is empty: in the swatch, and as its hex code in the
 * placeholder colour.
 */
export const ColorInputEditable = ({
  value,
  onChange,
  placeholder,
  className,
  inherited
}: ColorInputEditableProps): React.JSX.Element => {
  const { styles } = useStyles()
  const hasValue = isNonEmptyString(value)
  const hasPlaceholder = isNonEmptyString(placeholder)

  const handleChange = (color: Color): void => {
    onChange?.(color.cleared ? '' : color.toHexString())
  }

  const handleOverwrite = (): void => {
    onChange?.(value ?? '')
  }

  const showText = (color: Color): React.ReactNode => {
    if (hasValue && !color.cleared) {
      return color.toHexString().toUpperCase()
    }

    return <span className={ styles.placeholder }>{hasPlaceholder ? placeholder.toUpperCase() : ''}</span>
  }

  return (
    <EditableOverlay
      addIconSpacing
      display="inline-block"
      isInherited={ Boolean(inherited) }
      onOverwrite={ handleOverwrite }
    >
      <ColorPicker
        allowClear
        className={ className }
        disabled={ inherited }
        disabledAlpha
        format="hex"
        inherited={ inherited }
        onChange={ handleChange }
        showText={ showText }
        value={ hasValue ? value : (hasPlaceholder ? placeholder : null) }
      />
    </EditableOverlay>
  )
}
