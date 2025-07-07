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
import cn from 'classnames'
import {
  FieldLabel
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/field-label'

export type CheckboxEditableDefinition = Omit<AbstractDocumentEditableDefinition, 'config'> & {
  config?: {
    label?: string
    class?: string
  }
}

// Wrapper component to handle value -> checked prop mapping and horizontal label
const CheckboxWrapper = ({ value, onChange, className, label, name, ...otherProps }: any) => {
  const handleChange = (e: any) => {
    const checked = e.target?.checked ?? e
    onChange?.(checked)
  }

  if (label) {
    // For checkboxes with labels, render them horizontally aligned and vertically centered
    return (
      <Flex align="center" gap="extra-small">
        <Checkbox
          {...otherProps}
          checked={Boolean(value)}
          className={className}
          onChange={handleChange}
        />
        <Text>
            <FieldLabel
                name={name}
                label={label}
            />
        </Text>
      </Flex>
    )
  }

  // For checkboxes without labels, render normally
  return (
    <Checkbox
      {...otherProps}
      checked={Boolean(value)}
      className={className}
      onChange={handleChange}
    />
  )
}

export class DynamicTypeDocumentEditableCheckbox extends DynamicTypeDocumentEditableAbstract {
  id: string = 'checkbox'

  getEditableDataComponent (props: CheckboxEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    return (
      <CheckboxWrapper
        className={ cn('w-full', props.config?.class) }
        label={props.config?.label}
        name={props.name}
      />
    )
  }

  transformValue (value: any): boolean {
    return Boolean(value)
  }
}