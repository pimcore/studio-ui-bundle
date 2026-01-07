import { FieldDefinitionFormContext } from "@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract";
import { Form, FormKit, Input } from "@sdk/components";
import React from "react";

export interface FieldDefinitionDataFormFieldsProps {
  context: FieldDefinitionFormContext;
}

export const FieldDefinitionDataFormFields = (props: FieldDefinitionDataFormFieldsProps): React.JSX.Element => {
  return (<>
    <FormKit.Panel title="Basic Information">
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>

      <Form.Item label="Title" name="title">
        <Input />
      </Form.Item>

      <Form.Item label="Tooltip" name="tooltip">
        <Input />
      </Form.Item>
    </FormKit.Panel> 
  </>);
}
