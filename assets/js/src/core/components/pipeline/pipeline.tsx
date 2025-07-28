/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode } from 'react'
import { Form } from '../form/form'
import { Divider } from '../divider/divider'
import { PipelineItemCustom } from './item/custom'
import { PipelineDynamicGroup } from './item/dynamic-group'
import { ConfigProvider } from 'antd'

export interface PipelineItem {
  id: string
  component: ReactNode
}

export interface PipelineProps {
  items: PipelineItem[]
  value?: any
  onChange?: (value: any) => void
}

const Pipeline = ({ items, value, onChange }: PipelineProps): React.JSX.Element => {
  if (value === undefined) {
    return <></>
  }

  return (
    <ConfigProvider theme={ { components: { Form: { itemMarginBottom: 0 } } } }>
      <Form.KeyedList
        onChange={ onChange }
        value={ value }
      >
        {items.map((item) => {
          const isLastItem = items.indexOf(item) === items.length - 1

          return (
            <div key={ item.id }>
              {item.component}

              {!isLastItem && (
              <Divider
                style={ { margin: 0 } }
                theme='secondary'
              />
              )}
            </div>
          )
        })}
      </Form.KeyedList>
    </ConfigProvider>
  )
}

Pipeline.CustomItem = PipelineItemCustom
Pipeline.DynamicGroupItem = PipelineDynamicGroup

export { Pipeline }
