/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type FieldDefinition as FieldDefinitionType, useClassDefinitionLayout } from '@Pimcore/modules/class-definition/components/detail/class-definition-layout-provider'
import { type DynamicTypeFieldDefinitionRegistry } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-registry'
import { serviceIds, useInjection } from '@sdk/app'
import { Content, FormKit } from '@sdk/components'
import { useDebounce } from '@sdk/utils'
import React, { useEffect, useMemo } from 'react'

export const FieldDefinition = (): React.JSX.Element => {
  const { currentFieldDefinitionId, currentFieldDefinitionIdPath, fieldDefinitions, updateFieldDefinition } = useClassDefinitionLayout()
  const fieldDefinition = fieldDefinitions[currentFieldDefinitionId!]
  const [values, setValues] = React.useState<FieldDefinitionType>(fieldDefinition)
  const debouncedValues = useDebounce(values, 300)
  const fieldDefinitionRegistry = useInjection<DynamicTypeFieldDefinitionRegistry>(serviceIds['DynamicTypes/FieldDefinitionRegistry'])
  const dynamicType = useMemo(() => {
    if (fieldDefinition !== undefined && fieldDefinitionRegistry.hasDynamicType(fieldDefinition.fieldtype)) {
      return fieldDefinitionRegistry.getDynamicType(fieldDefinition.fieldtype)
    }

    return null
  }, [fieldDefinition])

  useEffect(() => {
    if (currentFieldDefinitionId !== null && debouncedValues !== fieldDefinition) {
      updateFieldDefinition(currentFieldDefinitionId, debouncedValues)
    }
  }, [debouncedValues])

  return (
    <>
      {dynamicType === null
        ? (
          <Content padded>
            Type not supported
          </Content>
          )
        : null}

      {dynamicType !== null
        ? (
          <Content
            key={ currentFieldDefinitionId }
            padded
            padding={ { x: 'small', bottom: 'small', top: 'none' } }
          >
            <FormKit
              formProps={ {
                initialValues: { ...fieldDefinition },
                onValuesChange: (_, changedValues) => {
                  setValues(changedValues as FieldDefinitionType)
                }
              } }
            >
              {dynamicType.getFormFields({ area: ['class'], fieldDefinitions, path: currentFieldDefinitionIdPath! })}
            </FormKit>
          </Content>
          )
        : null}
    </>
  )
}
