/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { Form } from '@Pimcore/components/form/form'
import { Pipeline } from '@Pimcore/components/pipeline/pipeline'
import { Input } from 'antd'
import React, { useEffect } from 'react'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { isEqual } from 'lodash'
import { PipelineConfigProvider } from '@Pimcore/components/pipeline/provider/pipeline-config/pipeline-config-provider'
import { Preview } from './preview/preview'
import { Tabs } from '@Pimcore/components/tabs/tabs'
import { Box } from '@Pimcore/components/box/box'
import { usePipelineLayoutContext } from './pipeline-layout-provider'
import { SplitLayout } from '@Pimcore/components/split-layout/split-layout'

export interface AdvancedColumnFormProps {
  column: AvailableColumn
  onChange?: (column: AvailableColumn) => void
}

export const AdvancedColumnForm = ({ column, onChange }: AdvancedColumnFormProps): React.JSX.Element => {
  const [form] = Form.useForm()
  const { pipelineLayout } = usePipelineLayoutContext()

  useEffect(() => {
    form.setFieldValue('value', column?.__meta?.advancedColumnConfig ?? {})
  }, [column])

  const onValuesChange = (changedValues: Record<string, any>): void => {
    const updatedColumn = {
      ...column,
      __meta: {
        ...column.__meta ?? {},
        advancedColumnConfig: {
          ...changedValues.value
        }
      }
    }

    if (onChange !== undefined) {
      if (!isEqual(column.__meta?.advancedColumnConfig, changedValues.value)) {
        onChange(updatedColumn)
      }
    }
  }

  return (
    <Form
      form={ form }
      initialValues={ column?.__meta?.advancedColumnConfig }
      layout='vertical'
      onValuesChange={ onValuesChange }
    >
      <PipelineConfigProvider initialConfig={ column?.config }>
        <Form.Item name="value">
          <Pipeline
            items={ [
              {
                id: 'title',
                component: (
                  <Pipeline.CustomItem>
                    <Box padding={ { top: 'mini', bottom: 'mini', x: 'none' } } >
                      <Form.Item
                        label=""
                        name="title"
                      >
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
                    <Tabs items={ [
                      {
                        key: 'advancedColumns',
                        label: 'Advanced Columns',
                        forceRender: true,
                        children: (
                          <Pipeline.DynamicGroupItem
                            dynamicTypeRegistryId={ serviceIds['DynamicTypes/Grid/SourceFieldsRegistry'] }
                            id='advancedColumns'
                          />
                        )
                      },

                      {
                        key: 'transformers',
                        label: 'Transformers',
                        forceRender: true,
                        children: (
                          <Pipeline.DynamicGroupItem
                            dynamicTypeRegistryId={ serviceIds['DynamicTypes/Grid/TransformersRegistry'] }
                            id='transformers'
                          />
                        )
                      }
                    ] }
                    />
                  )}

                  {pipelineLayout === 'verbose' && (
                    <SplitLayout
                      leftItem={ {
                        children: (
                          <Pipeline.DynamicGroupItem
                            dynamicTypeRegistryId={ serviceIds['DynamicTypes/Grid/SourceFieldsRegistry'] }
                            id='advancedColumns'
                            showTitle
                          />
                        ),
                        size: 50
                      } }

                      rightItem={ {
                        children: (
                          <Pipeline.DynamicGroupItem
                            dynamicTypeRegistryId={ serviceIds['DynamicTypes/Grid/TransformersRegistry'] }
                            id='transformers'
                            showTitle
                          />
                        ),
                        size: 50
                      } }

                      withDivider
                    />
                  )}
                </Pipeline.CustomItem>
              },

              {
                id: 'Preview',
                component: <Preview column={ column } />
              }
            ] }
          />
        </Form.Item>
      </PipelineConfigProvider>
    </Form>
  )
}
