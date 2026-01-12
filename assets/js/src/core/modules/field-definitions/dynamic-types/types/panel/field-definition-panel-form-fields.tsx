import { FieldDefinitionContext } from "@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract";
import { Form, FormKit, IconSelector, Input, Switch, TextArea } from "@sdk/components";
import React from "react";

export interface FieldDefinitionPanelFormFieldsProps {
  context: FieldDefinitionContext;
}

export const FieldDefinitionPanelFormFields = (props: FieldDefinitionPanelFormFieldsProps): React.JSX.Element => {


  return (<>
    <FormKit.Panel contentPadding={{ y: 'none', x: 'small' }}>
      <Form.Item name="border">
        <Switch labelRight="border" />
      </Form.Item>

      <Form.Item label="icon" name="icon">
        <IconSelector />
      </Form.Item>
    </FormKit.Panel>
  </>);
}
