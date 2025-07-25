import { serviceIds } from "@Pimcore/app/config/services/service-ids";
import { Form } from "@Pimcore/components/form/form";
import { Pipeline } from "@Pimcore/components/pipeline/pipeline";
import { Input } from "antd";
import React, { useEffect } from "react";
import { AvailableColumn } from "@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider";
import { isEqual } from "lodash";
import { PipelineConfigProvider } from "@Pimcore/components/pipeline/provider/pipeline-config/pipeline-config-provider";
import { Preview } from "./preview/preview";
import { Tabs } from "@Pimcore/components/tabs/tabs";
import { Box } from "@Pimcore/components/box/box";
import { usePipelineLayoutContext } from "./pipeline-layout-provider";
import { SplitLayout } from "@Pimcore/components/split-layout/split-layout";

export interface AdvancedColumnFormProps {
  column: AvailableColumn
  onChange?: (column: AvailableColumn) => void
}

export const AdvancedColumnForm = ({column, onChange }: AdvancedColumnFormProps): React.JSX.Element => {
  const [form] = Form.useForm();
  const { pipelineLayout } = usePipelineLayoutContext();

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
                    <Box padding={{ top: 'mini', bottom: 'mini', x: 'none' }} >
                      <Form.Item name="title" label="">
                        <Input placeholder="Add a title" />
                      </Form.Item>
                    </Box>
                  </Pipeline.CustomItem>
                )
              },

              {
                id: 'fields',
                component: <Pipeline.CustomItem>
                  {pipelineLayout === 'default' && (
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
                  )}
                  
                  {pipelineLayout === 'verbose' && (
                    <SplitLayout 
                      withDivider

                      leftItem={{
                        children: (
                          <Pipeline.DynamicGroupItem id='advancedColumns' dynamicTypeRegistryId={serviceIds['DynamicTypes/Grid/SourceFieldsRegistry']} showTitle />
                        ),
                        size: 50
                      }}

                      rightItem={{
                        children: (
                          <Pipeline.DynamicGroupItem id='transformers' dynamicTypeRegistryId={serviceIds['DynamicTypes/Grid/TransformersRegistry']} showTitle />
                        ),
                        size: 50
                      }}
                    />
                  )}
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
