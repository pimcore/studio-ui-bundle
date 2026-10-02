/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Meta, type StoryObj } from '@storybook/react'
import { Pipeline } from './pipeline'
import { Form } from '../form/form'
import React from 'react'
import { Input } from '../input/input'
import { Text } from '../text/text'
import { Flex } from '../flex/flex'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { Tabs } from '../tabs/tabs'

const PipelineExample = ({ readOnly = false }: { readOnly?: boolean }): React.JSX.Element => {
  const initialValues = {
    pipeline1: {
      title: 'Pipeline title 2',
      'source-field': [
        {
          key: 'staticText',
          config: {
            text: 'Text 2'
          }
        },
        // add 100 more fields for testing
        ...Array.from({ length: 3 }, (_, i) => ({
          key: 'staticText',
          config: {
            text: `Dynamic Text ${i + 1}`
          }
        }))
      ]
    }
  }

  return (
    <Form
      initialValues={ initialValues }
      layout='vertical'
      onValuesChange={ (changedValues, allValues) => { console.log({ changedValues, allValues }) } }
    >
      <Form.Item
        name="pipeline1"
        noStyle
      >
        <Pipeline
          items={ [
            {
              id: 'title',
              component: <Pipeline.CustomItem>
                <Tabs items={ [
                  {
                    key: 'title',
                    label: 'Title',
                    forceRender: true,
                    children: (
                      <Form.Item
                        label="Title"
                        name="title"
                      >
                        <Input />
                      </Form.Item>
                    )
                  },

                  {
                    key: 'source-field',
                    label: 'Source Field',
                    forceRender: true,
                    children: (
                      <Pipeline.DynamicGroupItem
                        dynamicTypeRegistryId={ serviceIds['DynamicTypes/Grid/SourceFieldsRegistry'] }
                        id='source-field'
                        readOnly={ readOnly }
                      />
                    )
                  },

                  {
                    key: 'transformation',
                    label: 'Transformation',
                    forceRender: true,
                    children: (
                      <Pipeline.DynamicGroupItem
                        dynamicTypeRegistryId={ serviceIds['DynamicTypes/Grid/TransformersRegistry'] }
                        id='transformation'
                        readOnly={ readOnly }
                      />
                    )
                  }
                ] }
                />
              </Pipeline.CustomItem>
            },

            {
              id: 'preview',
              component: <Pipeline.CustomItem>
                <Flex gap={ 'extra-small' }>
                  <Text>Preview</Text>
                  <Text type='secondary'>Example preview value</Text>
                </Flex>
              </Pipeline.CustomItem>
            }
          ] }
        />
      </Form.Item>
    </Form>
  )
}

const config: Meta<typeof PipelineExample> = {
  title: 'Components/Data Entry/Pipeline',
  component: PipelineExample,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default: StoryObj<typeof PipelineExample> = {}

/** Items stay viewable, but the add/delete/drag controls are hidden. */
export const ReadOnly: StoryObj<typeof PipelineExample> = {
  args: { readOnly: true }
}
