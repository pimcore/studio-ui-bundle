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

export interface DynamicGroupDropdownProps {
  children: React.ReactNode
  dynamicTypeRegistryId: string
}

export const DynamicGroupDropdown = ({ children, dynamicTypeRegistryId }: DynamicGroupDropdownProps): React.JSX.Element => {
  const registry = useInjection<DynamicTypePipelineRegistry>(dynamicTypeRegistryId)
  const { operations } = useNumberedList()

  const items: DropdownProps['menu']['items'] = registry.getDynamicTypes().map((dynamicType) => ({
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
