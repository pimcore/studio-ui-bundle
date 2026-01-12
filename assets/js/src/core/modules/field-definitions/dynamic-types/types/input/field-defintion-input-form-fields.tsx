import { FieldDefinitionContext } from "@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract";
import { Form, FormKit, Input, Switch, TextArea } from "@sdk/components";
import React from "react";

export interface FieldDefinitionInputFormFieldsProps {
  context: FieldDefinitionContext;
}

export const FieldDefinitionInputFormFields = (props: FieldDefinitionInputFormFieldsProps): React.JSX.Element => {
  const isCustomLayout = props.context.area.includes('custom-layout');

  return (<>
    <FormKit.Panel title="Specific Settings">
      {!isCustomLayout && (
        <>
          <Form.Item label="default_value" name="defaultValue">
            <Input />
          </Form.Item>

          <Form.Item label="default_value_generator" name="defaultValueGenerator">
            <Input />
          </Form.Item>
        </>
      )}

      <Form.Item name="showCharCount">
        <Switch labelRight="show_char_count" />
      </Form.Item>

      

      {!isCustomLayout && (
        <>
          {/* @todo add regex validation */}
        </>
      )}
    </FormKit.Panel> 
  </>);
}
