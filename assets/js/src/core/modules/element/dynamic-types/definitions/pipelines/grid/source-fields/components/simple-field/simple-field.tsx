import { Form } from "@Pimcore/components/form/form";
import { usePipelineConfig } from "@Pimcore/components/pipeline/provider/pipeline-config/use-pipeline-config";
import { Select } from "@Pimcore/components/select/select";
import React from "react";

export const DynamicTypePipelineGridSourceFieldsSimpleFieldComponent = (): React.JSX.Element => {
  const { config } = usePipelineConfig();

  const sourceFieldConfig = config?.simpleField;
  if (!sourceFieldConfig) {
    throw new Error("Source field configuration is missing");
  }

  const sourceFieldOptions = sourceFieldConfig.map(configOption => ({
    label: configOption.name,
    value: configOption.key
  }));

  return (
    <Form.Item
      name={'field'}
      label={'Field'}
    >
      <Select options={sourceFieldOptions} />
    </Form.Item>
  );
}
