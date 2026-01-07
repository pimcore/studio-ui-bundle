import { useClassDefinitionLayout } from "@Pimcore/modules/class-definition/components/detail/class-definition-layout-provider";
import { FieldDefinition } from "@Pimcore/modules/class-definition/components/detail/content/field-defintion/field-definition";
import { Content, Form, FormKit, Input } from "@sdk/components";
import { useDebounce } from "@sdk/utils";
import React, { useEffect } from "react";

export const ClassDefinitionDetailContent = (): React.JSX.Element => {
  const { currentFieldDefinitionId, fieldDefinitions, updateFieldDefinition } = useClassDefinitionLayout();
  const fieldDefinition = currentFieldDefinitionId ? fieldDefinitions[currentFieldDefinitionId] : null;
  const [values, setValues] = React.useState<any>(fieldDefinition);
  const debouncedValues = useDebounce(values, 300);

  useEffect(() => {
    if (currentFieldDefinitionId && debouncedValues && debouncedValues !== fieldDefinition) {
      updateFieldDefinition(currentFieldDefinitionId, debouncedValues);
    }
  }, [debouncedValues]);

  return (
    <>
      {currentFieldDefinitionId === null || fieldDefinition === null ? (
        <Content padded>
          Please select a field from the tree to edit its properties.
        </Content>
      ) : null}

      {currentFieldDefinitionId !== null ? (
        <FieldDefinition />
      ) : null}
    </>
  );
}
