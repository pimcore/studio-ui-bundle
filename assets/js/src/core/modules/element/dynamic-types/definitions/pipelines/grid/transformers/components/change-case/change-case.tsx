import { Form } from "@Pimcore/components/form/form";
import { useKeyedList } from "@Pimcore/components/form/keyed-list/provider/keyed-list/use-keyed-list";
import { usePipelineConfig } from "@Pimcore/components/pipeline/provider/pipeline-config/use-pipeline-config";
import { Select } from "@Pimcore/components/select/select";
import React, { useEffect } from "react";

export const DynamicTypePipelineGridTransformersChangeCaseComponent = (): React.JSX.Element => {
  const { config } = usePipelineConfig();
  const { getValueByKey, operations } = useKeyedList();
  const transformerConfig = config?.transformers?.caseChange;

  if (!transformerConfig) {
    throw new Error("Transformer configuration for case change is missing");
  }

  const modeOptions = transformerConfig.configOptions.mode.options;

  useEffect(() => {
    if (getValueByKey('mode') === null || getValueByKey('mode') === undefined) {
      operations.update('mode', modeOptions[0].value, true);
    }
  }, [])

  return (
    <Form.Item
      name={'mode'}
      label={'Mode'}
    >
      <Select 
        options={modeOptions}
      />
    </Form.Item>
  );
}
