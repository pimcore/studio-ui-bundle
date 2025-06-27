import { Form } from "@Pimcore/components/form/form";
import { usePipelineConfig } from "@Pimcore/components/pipeline/provider/pipeline-config/use-pipeline-config";
import { Select } from "@Pimcore/components/select/select";
import React from "react";

export const DynamicTypePipelineGridTransformersChangeCaseComponent = (): React.JSX.Element => {
  const { config } = usePipelineConfig();
  const transformerConfig = config?.transformers?.caseChange;

  console.log({config, transformerConfig});
  
  if (!transformerConfig) {
    throw new Error("Transformer configuration for case change is missing");
  }

  const modeOptions = transformerConfig.configOptions.mode.options;

  return (
    <Form.Item
      name={'mode'}
      label={'Mode'}
      initialValue={'uppercase'}
    >
      <Select 
        options={modeOptions}
      />
    </Form.Item>
  );
}
