/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useInjection } from '@Pimcore/app/depency-injection'
import { Form } from '@Pimcore/components/form/form'
import { useKeyedList } from '@Pimcore/components/form/keyed-list/provider/keyed-list/use-keyed-list'
import { type DynamicTypePipelineRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/dynamic-type-pipeline-registry'
import React, { useMemo } from 'react'

export interface DynamicGroupItemContentProps {
  dynamicTypeRegistryId: string
}

export const DynamicGroupItemContent = ({ dynamicTypeRegistryId }: DynamicGroupItemContentProps): React.JSX.Element => {
  const { getValueByKey } = useKeyedList()
  const value = getValueByKey('key')
  const type: string = useMemo(() => value, [value])
  const registry = useInjection<DynamicTypePipelineRegistry>(dynamicTypeRegistryId)

  const dynType = useMemo(() => {
    return registry.getDynamicType(type)
  }, [registry, type])

  const component = useMemo(() => {
    if (!dynType) {
      return null
    }
    return dynType.getComponent()
  }, [dynType])

  return useMemo(() => {
    if (!component) {
      return <div>Unknown type: {type}</div>
    }

    return (
      <Form.Item name={ 'config' }>
        <Form.KeyedList>
          {component}
        </Form.KeyedList>
      </Form.Item>
    )
  }, [component, type])
}
