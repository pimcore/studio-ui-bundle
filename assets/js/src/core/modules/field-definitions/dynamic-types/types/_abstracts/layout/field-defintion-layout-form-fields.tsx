import { FieldDefinitionContext } from "@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract";
import { Form, FormKit, Input, Select, Switch } from "@sdk/components";
import React from "react";

export interface FieldDefinitionDataFormFieldsProps {
  context: FieldDefinitionContext;
}

export const FieldDefinitionLayoutFormFields = (props: FieldDefinitionDataFormFieldsProps): React.JSX.Element => {
  const { context } = props;
  const { fieldDefinitions, path } = context;
  const parent = fieldDefinitions[path[path.length - 2]];
  const isRegion = parent !== undefined && parent.fieldtype === 'region';

  return (<>
    <FormKit.Panel 
      title="panel"
      contentPadding={{bottom: 'none', top: 'small', x: 'small' }}
    >
      <Form.Item label="name" name="name">
        <Input />
      </Form.Item>

      {isRegion && (
        <Form.Item label="region" name="region">
          <Select options={[
            { label: 'center', value: 'center' },
            { label: 'north', value: 'north' },
            { label: 'south', value: 'south' },
            { label: 'east', value: 'east' },
            { label: 'west', value: 'west' },
          ]} />
        </Form.Item>
      )}

      <Form.Item label="title" name="title">
        <Input />
      </Form.Item>

      <Form.Item name="collapsible">
        <Switch labelRight="collapsible" />
      </Form.Item>

      <Form.Item name="collapsed">
        <Switch labelRight="collapsed" />
      </Form.Item>
    </FormKit.Panel> 
  </>);
}
