import { Flex } from "@Pimcore/components/flex/flex";
import { Form } from "@Pimcore/components/form/form";
import { useItem } from "@Pimcore/components/form/item/provider/item/use-item";
import { useKeyedList } from "@Pimcore/components/form/keyed-list/provider/keyed-list/use-keyed-list";
import { Input } from "@Pimcore/components/input/input";
import { usePipelineConfig } from "@Pimcore/components/pipeline/provider/pipeline-config/use-pipeline-config";
import { SelectProps } from "@Pimcore/components/select/select";
import { usePrevious } from "@Pimcore/utils/hooks/use-previous";
import { Select } from "antd";
import React from "react";

export const DynamicTypePipelineGridSourceFieldsRelationFieldComponent = (): React.JSX.Element => {
  const { config } = usePipelineConfig();
  const sourceFieldConfig = config?.relationField;
  const { name } = useItem()
  const { operations, getValueByKey } = useKeyedList();
  const currentRelation = getValueByKey('relation');
  const prevRelation = usePrevious(currentRelation);

  if (prevRelation !== currentRelation) {
    // check how to reset the select. Value is changed but not reflected in the UI
    operations.update([...name, 'field'], undefined, false)
  }

  if (!sourceFieldConfig) {
    throw new Error("Source field configuration is missing");
  }

  const sourceFieldOptions = sourceFieldConfig.map(configOption => ({
    label: configOption.name,
    value: configOption.key
  }));

  const relationFieldOptions: SelectProps['options'] = []; 
  sourceFieldConfig.forEach(configOption => {
    const options: SelectProps['options'] = [];

    if (configOption.key === currentRelation) {
      configOption.fields.forEach(field => {
        options.push({
          label: field.name,
          value: field.key
        });
      });
    }

    if (options.length > 0) {
      relationFieldOptions.push(...options);
    }
  })

  return (
    <Flex className="w-full" gap="small">
      <Form.Item
        className="w-full"
        name={'relation'}
        label={'Relation'}
      >
        <Select options={sourceFieldOptions} />
      </Form.Item>

      <Form.Item
        className="w-full"
        name={'field'}
        label={'Field'}
      >
        <Select options={relationFieldOptions} disabled={relationFieldOptions.length === 0} />
      </Form.Item>
    </Flex>
  );
}
