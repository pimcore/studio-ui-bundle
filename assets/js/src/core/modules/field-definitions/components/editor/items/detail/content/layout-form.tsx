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
import { Content, FormKit } from '@sdk/components'
import { useDebounce } from '@sdk/utils'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSettings } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { useTranslation } from 'react-i18next'

interface ILayoutFormProps {
  noPadding?: boolean
}

export const LayoutForm = ({ noPadding = false }: ILayoutFormProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { useLayout, fieldDefinitionRegistry } = useSettings()
  const { currentFieldDefinitionId, currentFieldDefinitionIdPath, fieldDefinitions, updateFieldDefinition } = useLayout()
  const fieldDefinition = fieldDefinitions[currentFieldDefinitionId!]
  const [values, setValues] = useState<FieldDefinitionType>(fieldDefinition)
  const debouncedValues = useDebounce(values, 300)
  // Capture the active field definition ID at the moment the user types, not when the debounce fires.
  // Without this, switching fields quickly causes the debounced update to write old values to the new field.
  const activeIdRef = useRef(currentFieldDefinitionId)
  const { area } = useArea()
  const dynamicType = useMemo(() => {
    if (fieldDefinition !== undefined && fieldDefinitionRegistry.hasDynamicType(fieldDefinition.fieldtype)) {
      return fieldDefinitionRegistry.getDynamicType(fieldDefinition.fieldtype)
    }

    return null
  }, [fieldDefinition])

  useEffect(() => {
    if (activeIdRef.current !== null && debouncedValues !== fieldDefinition) {
      updateFieldDefinition(activeIdRef.current, debouncedValues)
    }
  }, [debouncedValues])

  return useMemo(() => (
    <>
      {dynamicType === null
        ? (
          <Content padded>
            {t('field-definitions.type-not-supported')}
          </Content>
          )
        : null}

      {dynamicType !== null
        ? (
          <Content
            padded={ !noPadding }
            padding={ noPadding ? undefined : { x: 'small', bottom: 'small', top: 'none' } }
          >
            <FormKit
              formProps={ {
                initialValues: { ...fieldDefinition },
                onValuesChange: (_, changedValues) => {
                  activeIdRef.current = currentFieldDefinitionId
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
