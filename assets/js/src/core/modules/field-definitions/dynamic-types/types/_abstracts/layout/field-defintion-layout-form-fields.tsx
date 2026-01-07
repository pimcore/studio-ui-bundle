import { FieldDefinitionFormContext } from "@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract";
import { Form, FormKit, Input, Select } from "@sdk/components";
import React from "react";

export interface FieldDefinitionDataFormFieldsProps {
  context: FieldDefinitionFormContext;
}

export const FieldDefinitionLayoutFormFields = (props: FieldDefinitionDataFormFieldsProps): React.JSX.Element => {
  return (<>
    <FormKit.Panel title="Basic Information">
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>

      <Form.Item label="Region" name="region">
        <Select options={[
          { label: 'center', value: 'center' },
          { label: 'north', value: 'north' },
          { label: 'south', value: 'south' },
          { label: 'east', value: 'east' },
          { label: 'west', value: 'west' },
        ]} />
      </Form.Item>

      <Form.Item label="Title" name="title">
        <Input />
      </Form.Item>
    </FormKit.Panel> 
  </>);
}
