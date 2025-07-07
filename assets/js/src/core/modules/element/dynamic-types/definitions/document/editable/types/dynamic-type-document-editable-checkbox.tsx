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
import { type AbstractDocumentEditableDefinition, DynamicTypeDocumentEditableAbstract } from '../dynamic-type-document-editable-abstract'
import { Checkbox, Flex, Text } from '@sdk/components'
import {
  FieldLabel
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/field-label'
import { isUndefined } from 'lodash'

export type CheckboxEditableDefinition = Omit<AbstractDocumentEditableDefinition, 'config'> & {
  config?: {
    label?: string
    class?: string
  }
}

interface CheckboxWrapperProps {
  value?: any
  onChange?: (checked: boolean) => void
  className?: string
  label?: string
  name?: string
  [key: string]: any // For other props that get spread to Checkbox
}

// Wrapper component to add a horizontal label if needed
const CheckboxWrapper = ({ value, onChange, className, label, name, ...otherProps }: CheckboxWrapperProps): React.JSX.Element => {
  const handleChange = (e: any): void => {
    const checked = e.target?.checked ?? e
    onChange?.(Boolean(checked))
  }

  const checkboxProps = {
    ...otherProps,
    checked: Boolean(value),
    className,
    onChange: handleChange
  }

  if (!isUndefined(label)) {
    return (
      <Flex
        align="center"
        gap="extra-small"
      >
        <Checkbox { ...checkboxProps } />
        <Text>
          <FieldLabel
            label={ label }
            name={ name }
          />
        </Text>
      </Flex>
    )
  }

  return <Checkbox { ...checkboxProps } />
}

export class DynamicTypeDocumentEditableCheckbox extends DynamicTypeDocumentEditableAbstract {
  id: string = 'checkbox'

  getEditableDataComponent (props: CheckboxEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    return (
      <CheckboxWrapper
        className={ props.config?.class }
        label={ props.config?.label }
        name={ props.name }
      />
    )
  }

  transformValue (value: any): boolean {
    return Boolean(value)
  }
}
