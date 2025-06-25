import { Form } from "@Pimcore/components/form/form";
import { Select } from "@Pimcore/components/select/select";
import React from "react";

export const DynamicTypePipelineGridTransformersChangeCaseComponent = (): React.JSX.Element => {
  return (
    <Form.Item
      name={'mode'}
      label={'Mode'}
      initialValue={'uppercase'}
    >
      <Select 
        options={[
          { label: 'Uppercase', value: 'uppercase' },
          { label: 'Lowercase', value: 'lowercase' },
        ]}
      />
    </Form.Item>
  );
}
