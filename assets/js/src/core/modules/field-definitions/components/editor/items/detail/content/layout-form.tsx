/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useArea } from '@Pimcore/modules/field-definitions/components/editor/area-provider'
import { type FieldDefinition as FieldDefinitionType } from '@Pimcore/modules/field-definitions/utils/layout-provider-factory'
import { type DynamicTypeFieldDefinitionRegistry } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-registry'
import { serviceIds, useInjection } from '@sdk/app'
import { Content, FormKit } from '@sdk/components'
import { useDebounce } from '@sdk/utils'
import React, { useEffect, useMemo, useState } from 'react'
import { useSettings } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'

export const LayoutForm = (): React.JSX.Element => {
  const { useLayout } = useSettings()
  const { currentFieldDefinitionId, currentFieldDefinitionIdPath, fieldDefinitions, updateFieldDefinition } = useLayout()
  const fieldDefinition = fieldDefinitions[currentFieldDefinitionId!]
  const [values, setValues] = useState<FieldDefinitionType>(fieldDefinition)
  const debouncedValues = useDebounce(values, 300)
  const fieldDefinitionRegistry = useInjection<DynamicTypeFieldDefinitionRegistry>(serviceIds['DynamicTypes/FieldDefinitionRegistry'])
  const { area } = useArea()
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

  return useMemo(() => (
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
              key={ `${currentFieldDefinitionId}-${dynamicType.id}` }
            >
              {dynamicType.getFormFields({ area, fieldDefinitions, path: currentFieldDefinitionIdPath! })}
            </FormKit>
          </Content>
          )
        : null}
    </>
  ), [fieldDefinition])
}
