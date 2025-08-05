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
import { Dropdown, type DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import { useNumberedList } from '@Pimcore/components/form/numbered-list/provider/numbered-list/use-numbered-list'
import { type DynamicTypePipelineRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/dynamic-type-pipeline-registry'
import React from 'react'
import { usePipelineConfig } from '../../provider/pipeline-config/use-pipeline-config'
import { type DynamicTypePipelineAbstract } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/dynamic-type-pipeline-abstract'

export interface DynamicGroupDropdownProps {
  children: React.ReactNode
  dynamicTypeRegistryId: string
}

export const DynamicGroupDropdown = ({ children, dynamicTypeRegistryId }: DynamicGroupDropdownProps): React.JSX.Element => {
  const registry = useInjection<DynamicTypePipelineRegistry>(dynamicTypeRegistryId)
  const { operations } = useNumberedList()
  const { config } = usePipelineConfig()

  const availableDynamicTypes: DynamicTypePipelineAbstract[] = registry.getDynamicTypes().filter((dynamicType) => {
    return dynamicType.isAvailableForSelection(config)
  })

  const items: DropdownProps['menu']['items'] = availableDynamicTypes.map((dynamicType) => ({
    key: dynamicType.id,
    label: dynamicType.id,
    onClick: () => {
      operations.add({
        key: dynamicType.id
      })
    }
  }))

  return (
    <Dropdown
      menu={ {
        items
      } }
    >
      {children}
    </Dropdown>
  )
}
