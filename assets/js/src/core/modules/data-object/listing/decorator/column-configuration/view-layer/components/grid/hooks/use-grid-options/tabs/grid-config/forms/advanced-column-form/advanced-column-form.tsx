import { serviceIds } from "@Pimcore/app/config/services/service-ids";
import { Form } from "@Pimcore/components/form/form";
import { Pipeline } from "@Pimcore/components/pipeline/pipeline";
import { Input } from "antd";
import React, { useEffect } from "react";
import { AvailableColumn } from "@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider";
import { isEqual } from "lodash";
import { PipelineConfigProvider } from "@Pimcore/components/pipeline/provider/pipeline-config/pipeline-config-provider";
import { Preview } from "./preview";
import { Tabs } from "@Pimcore/components/tabs/tabs";

export interface AdvancedColumnFormProps {
  column: AvailableColumn
  onChange?: (column: AvailableColumn) => void
}

export const AdvancedColumnForm = ({column, onChange }: AdvancedColumnFormProps): React.JSX.Element => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldValue('value', column?.__meta?.advancedColumnConfig ?? {});
  }, [column]);

  const onValuesChange = (changedValues: Record<string, any>): void => {
    const updatedColumn = {
      ...column,
      __meta: {
        ...column.__meta ?? {},
        advancedColumnConfig: {
          ...changedValues.value
        }
      }
    };

    if (onChange) {
      if (!isEqual(column.__meta?.advancedColumnConfig, changedValues.value)) {
        onChange(updatedColumn);
      }
    }
  }

  return (
    <Form form={form} layout='vertical' onValuesChange={onValuesChange} initialValues={column?.__meta?.advancedColumnConfig}>
      <PipelineConfigProvider initialConfig={column?.config}>
        <Form.Item name="value">
          <Pipeline
            items={[
              {
                id: 'title',
                component: (
                  <Pipeline.CustomItem>
                    <Form.Item name="title" label="">
                      <Input placeholder="Add a title" />
                    </Form.Item>
                  </Pipeline.CustomItem>
                )
              },

              {
                id: 'fields',
                component: <Pipeline.CustomItem>
                  <Tabs items={[
                    {
                      key: 'advancedColumns',
                      label: 'Advanced Columns',
                      forceRender: true,
                      children: (
                        <Pipeline.DynamicGroupItem id='advancedColumns' dynamicTypeRegistryId={serviceIds['DynamicTypes/Grid/SourceFieldsRegistry']} />
                      )
                    },

                    {
                      key: 'transformers',
                      label: 'Transformers',
                      forceRender: true,
                      children: (
                        <Pipeline.DynamicGroupItem id='transformers' dynamicTypeRegistryId={serviceIds['DynamicTypes/Grid/TransformersRegistry']} />
                      )
                    },
                  ]} />
                </Pipeline.CustomItem>
              },

              {
                id: 'Preview',
                component: <Preview column={column} />
              },
            ]}
          />
        </Form.Item>
      </PipelineConfigProvider>
    </Form>
  )
}
