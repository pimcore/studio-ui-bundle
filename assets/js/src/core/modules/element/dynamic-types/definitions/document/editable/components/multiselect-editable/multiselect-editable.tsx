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
import { Select } from '@sdk/components'
import { InheritanceOverlay } from '../inheritance-overlay/inheritance-overlay'
import { toCssDimension } from '@sdk/utils'
import { type SelectOptionType } from '@sdk/modules/element'
import { renderSanitizedLabel } from '../../utils/select-options'
import { useFieldWidth } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'

interface MultiSelectEditableProps {
  value?: string[] | null
  options?: SelectOptionType[]
  className?: string
  width?: number
  onChange?: (value: string[] | null) => void
  inherited?: boolean
}

export const MultiSelectEditable = ({
  value,
  options = [],
  className,
  width,
  onChange,
  inherited
}: MultiSelectEditableProps): React.JSX.Element => {
  const defaultFieldWidth = useFieldWidth()

  const handleOverwrite = (): void => {
    onChange?.(value ?? null)
  }

  const containerStyle = {
    width: '100%',
    maxWidth: toCssDimension(width, defaultFieldWidth?.large)
  }

  return (
    <InheritanceOverlay
      addIconSpacing
      display="block"
      isInherited={ Boolean(inherited) }
      onOverwrite={ handleOverwrite }
      style={ containerStyle }
    >
      <Select
        className={ className }
        disabled={ inherited }
        labelRender={ ({ label }) => renderSanitizedLabel(label) }
        mode="multiple"
        onChange={ onChange }
        optionFilterProp="label"
        optionRender={ (option) => renderSanitizedLabel(option.label) }
        options={ options }
        popupMatchSelectWidth={ false }
        style={ containerStyle }
        value={ value }
      />
    </InheritanceOverlay>
  )
}
