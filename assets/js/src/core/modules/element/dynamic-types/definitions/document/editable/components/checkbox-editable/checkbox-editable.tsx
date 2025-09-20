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
import { Checkbox, Flex, Text } from '@sdk/components'
import { FieldLabel } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/field-label'
import { InheritanceOverlay } from '../inheritance-overlay/inheritance-overlay'
import { isUndefined } from 'lodash'

export interface CheckboxEditableValue {
  value?: boolean
}

export interface CheckboxEditableConfig {
  label?: string
  class?: string
  reload?: boolean
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

  const checkboxProps = {
    checked: Boolean(value),
    className: className ?? config?.class,
    disabled: inherited,
    onChange: handleChange
  }

  const renderCheckbox = (): React.JSX.Element => {
    if (!isUndefined(config?.label)) {
      return (
        <Flex
          align="center"
          gap="extra-small"
        >
          <Checkbox { ...checkboxProps } />
          <Text>
            <FieldLabel
              label={ config.label }
              name={ name }
            />
          </Text>
        </Flex>
      )
    }

    return <Checkbox { ...checkboxProps } />
  }

  return (
    <InheritanceOverlay
      addIconSpacing
      display="inline-block"
      isInherited={ Boolean(inherited) }
      onOverwrite={ handleOverwrite }
    >
      {renderCheckbox()}
    </InheritanceOverlay>
  )
}
