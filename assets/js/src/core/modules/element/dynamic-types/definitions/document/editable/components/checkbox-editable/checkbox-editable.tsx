/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useId } from 'react'
import { Checkbox, Flex, Switch, Text } from '@sdk/components'
import { FieldLabel } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/field-label'
import { EditableOverlay } from '../editable-overlay/editable-overlay'
import { isUndefined } from 'lodash'

export interface CheckboxEditableValue {
  value?: boolean
}

export interface CheckboxEditableConfig {
  label?: string
  class?: string
  reload?: boolean
  /** 'switch' draws the value as an on/off switch, with the label to its right. */
  display?: 'checkbox' | 'switch'
}

interface CheckboxEditableProps {
  value?: boolean
  config?: CheckboxEditableConfig
  onChange?: (checked: boolean) => void
  inherited?: boolean
  className?: string
  name?: string
}

export const CheckboxEditable = ({
  value,
  config,
  onChange,
  inherited,
  className,
  name
}: CheckboxEditableProps): React.JSX.Element => {
  const handleChange = (e: any): void => {
    const checked = e.target?.checked ?? e
    onChange?.(Boolean(checked))
  }

  const handleOverwrite = (): void => {
    onChange?.(Boolean(value))
  }

  // The label names the control and toggles it on click, as a native checkbox label would.
  const controlId = useId()

  const checkboxProps = {
    id: controlId,
    checked: Boolean(value),
    className: className ?? config?.class,
    disabled: inherited,
    onChange: handleChange
  }

  const renderLabel = (label: string): React.JSX.Element => (
    <label htmlFor={ controlId }>
      <Text>
        <FieldLabel
          label={ label }
          name={ name }
        />
      </Text>
    </label>
  )

  const renderSwitch = (): React.JSX.Element => (
    <Switch
      checked={ Boolean(value) }
      className={ checkboxProps.className }
      disabled={ inherited }
      id={ controlId }
      labelRight={ isUndefined(config?.label) ? undefined : renderLabel(config.label) }
      onChange={ handleChange }
      size="small"
    />
  )

  const renderCheckbox = (): React.JSX.Element => {
    if (config?.display === 'switch') {
      return renderSwitch()
    }

    if (!isUndefined(config?.label)) {
      return (
        <Flex
          align="center"
          gap="extra-small"
        >
          <Checkbox { ...checkboxProps } />
          {renderLabel(config.label)}
        </Flex>
      )
    }

    return <Checkbox { ...checkboxProps } />
  }

  return (
    <EditableOverlay
      addIconSpacing
      display="inline-block"
      isInherited={ Boolean(inherited) }
      onOverwrite={ handleOverwrite }
    >
      {renderCheckbox()}
    </EditableOverlay>
  )
}
