import { Form } from "@Pimcore/components/form/form";
import { Input } from "@Pimcore/components/input/input";
import React from "react";

export const DynamicTypePipelineGridTransformersCombineComponent = (): React.JSX.Element => {
  return (
    <Form.Item
      name={'glue'}
      label={'Glue'}
    >
      <Input />
    </Form.Item>
  );
}
