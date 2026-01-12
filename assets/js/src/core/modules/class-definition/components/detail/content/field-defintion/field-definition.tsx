import { useClassDefinitionLayout } from "@Pimcore/modules/class-definition/components/detail/class-definition-layout-provider";
import { DynamicTypeFieldDefinitionRegistry } from "@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-registry";
import { serviceIds, useInjection } from "@sdk/app";
import { Content, FormKit } from "@sdk/components";
import { useDebounce } from "@sdk/utils";
import React, { useEffect, useMemo } from "react";

export const FieldDefinition = (): React.JSX.Element => {
  const { currentFieldDefinitionId, currentFieldDefinitionIdPath, fieldDefinitions, updateFieldDefinition } = useClassDefinitionLayout();
  const fieldDefinition = fieldDefinitions[currentFieldDefinitionId!];
  const [values, setValues] = React.useState<any>(fieldDefinition);
  const debouncedValues = useDebounce(values, 300);
  const fieldDefinitionRegistry = useInjection<DynamicTypeFieldDefinitionRegistry>( serviceIds['DynamicTypes/FieldDefinitionRegistry'] );
  const dynamicType = useMemo(() => {
    if (fieldDefinition && fieldDefinitionRegistry.hasDynamicType(fieldDefinition.fieldtype)) {
      return fieldDefinitionRegistry.getDynamicType(fieldDefinition.fieldtype);
    }
    
    return null;
  }, [fieldDefinition]);

  useEffect(() => {
    if (currentFieldDefinitionId && debouncedValues && debouncedValues !== fieldDefinition) {
      updateFieldDefinition(currentFieldDefinitionId, debouncedValues);
    }
  }, [debouncedValues]);

  return (
    <>
      {dynamicType === null ? (
        <Content padded>
          Type not supported
        </Content>
      ) : null}

      {dynamicType !== null ? (
        <Content padded padding={{ x: 'small', bottom: 'small', top: 'none' }} key={currentFieldDefinitionId}>
          <FormKit 
            formProps={{
              initialValues: {...fieldDefinition},
              onValuesChange: (_, changedValues) => {
                setValues(changedValues);
              }
            }}
          >
            {dynamicType.getFormFields({ area: ['class'], fieldDefinitions: fieldDefinitions, path: currentFieldDefinitionIdPath! })}
          </FormKit>
        </Content>
      ) : null}
    </>
  )
}
