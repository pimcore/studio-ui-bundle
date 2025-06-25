import { Form } from "@Pimcore/components/form/form";
import { Input } from "@Pimcore/components/input/input";
import React from "react";

export const DynamicTypePipelineGridSourceFieldsTextComponent = (): React.JSX.Element => {
  return (
    <Form.Item
      name={'value'}
      label={'Text'}
    >
      <Input />
    </Form.Item>
  );
}
