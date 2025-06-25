/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Meta } from '@storybook/react'
import { Pipeline } from './pipeline'
import { Form } from '../form/form'
import React from 'react'
import { Input } from '../input/input'
import { Text } from '../text/text'
import { Flex } from '../flex/flex'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'

const config: Meta = {
  title: 'Components/Controls/Pipeline',
  component: (): React.JSX.Element => {
    const initialValues = {
      "pipeline1": {
        "title": "Pipeline title 2",
        "source-field": [
          {
            "key": "text",
            config: {
              value: 'Text 2',
            }
          },
        ]
      }
    }

    return (
      <Form initialValues={initialValues} layout='vertical' onValuesChange={(changedValues, allValues) => console.log({ changedValues, allValues })}>
        <Form.Item name="pipeline1">
          <Pipeline 
            items={[
              {
                id: 'title',
                component: <Pipeline.CustomItem>
                  <Form.Item name="title" label="Title">
                    <Input />
                  </Form.Item>
                </Pipeline.CustomItem>
              },

              {
                id: 'source-field',
                component: <Pipeline.DynamicGroupItem id='source-field' dynamicTypeRegistryId={serviceIds['DynamicTypes/Grid/SourceFieldsRegistry']} />
              },

              {
                id: 'transformation',
                component: <Pipeline.DynamicGroupItem id='transformation' dynamicTypeRegistryId={serviceIds['DynamicTypes/Grid/TransformersRegistry']} />
              },

              {
                id: 'preview',
                component: <Pipeline.CustomItem>
                  <Flex gap={'extra-small'}>
                    <Text>Preview</Text>
                    <Text type='secondary'>Example preview value</Text> 
                  </Flex>
                </Pipeline.CustomItem>
              }
            ]}
          />
        </Form.Item>
      </Form>
    )
  },
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {}
