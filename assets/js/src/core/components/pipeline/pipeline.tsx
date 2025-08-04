/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Form } from '../form/form'
import { Divider } from '../divider/divider'
import { PipelineItemCustom } from './item/custom'
import { PipelineDynamicGroup } from './item/dynamic-group'
import { ConfigProvider } from 'antd'
import { useDebounce } from '@Pimcore/utils/hooks/use-debounce'
import { isEqual } from 'lodash'

export interface PipelineItem {
  id: string
  component: ReactNode
}

export interface PipelineProps {
  items: PipelineItem[]
  value?: any
  onChange?: (value: any) => void
}

const Pipeline = ({ items, value: baseValue, onChange }: PipelineProps): React.JSX.Element => {
  const [value, setValue] = useState(baseValue);
  const bufferedValue = useDebounce(value, 300);

  const theme = useMemo(() => ({
    components: {
      Form: {
        itemMarginBottom: 0
      }
    }
  }), [])

  useEffect(() => {
    if (baseValue !== undefined && !isEqual(baseValue, value)) {
      setValue(baseValue);
    }
  }, [baseValue]);

  useEffect(() => {
    console.log({bufferedValue})
    onChange?.(bufferedValue);
  }, [bufferedValue]);

  const memoizedItems = useMemo(() => items, [items]);

  if (value === undefined) {
    return <></>
  }

  return (
    <ConfigProvider theme={ theme }>
      <Form.KeyedList
        onChange={ setValue }
        value={ value }
      >
        {memoizedItems.map((item, index) => {
          const isLastItem = index === memoizedItems.length - 1

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
