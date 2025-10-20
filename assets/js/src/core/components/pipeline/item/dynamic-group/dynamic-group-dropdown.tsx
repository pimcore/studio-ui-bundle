/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { isNil, isNull } from 'lodash'
import { type MenuProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { useInjection } from '@Pimcore/app/depency-injection'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { useNumberedList } from '@Pimcore/components/form/controls/numbered-list/provider/numbered-list/use-numbered-list'
import { type DynamicTypePipelineRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/dynamic-type-pipeline-registry'
import { usePipelineConfig } from '../../provider/pipeline-config/use-pipeline-config'
import { type DynamicTypePipelineAbstract } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/dynamic-type-pipeline-abstract'

export interface DynamicGroupDropdownProps {
  children: React.ReactNode
  dynamicTypeRegistryId: string
}

interface IGroupedTree {
  dynamicTypes?: DynamicTypePipelineAbstract[]
  [groupKey: string]: any
}

export const DynamicGroupDropdown = ({ children, dynamicTypeRegistryId }: DynamicGroupDropdownProps): React.JSX.Element => {
  const registry = useInjection<DynamicTypePipelineRegistry>(dynamicTypeRegistryId)
  const { operations } = useNumberedList()
  const { config } = usePipelineConfig()
  const { t } = useTranslation()

  const availableDynamicTypes: DynamicTypePipelineAbstract[] = registry.getDynamicTypes().filter((dynamicType) => {
    return dynamicType.isAvailableForSelection(config)
  })

  const groupedTree: IGroupedTree = {}

  availableDynamicTypes.forEach(dynamicType => {
    let groupId: string[] = []

    if (!isNull(dynamicType.group)) {
      if (Array.isArray(dynamicType.group)) {
        groupId = dynamicType.group
      } else {
        groupId = [dynamicType.group]
      }
    }

    let currentLevel = groupedTree

    groupId.forEach(groupKey => {
      if (isNil(currentLevel[groupKey])) {
        currentLevel[groupKey] = {}
      }

      currentLevel = currentLevel[groupKey]
    })

    if (isNil(currentLevel.dynamicTypes)) {
      currentLevel.dynamicTypes = []
    }

    currentLevel.dynamicTypes.push(dynamicType)
  })

  const buildMenuItemsFromTree = (group: IGroupedTree): NonNullable<MenuProps['items']> => {
    const items: NonNullable<MenuProps['items']> = []

    if (!isNil(group.dynamicTypes)) {
      group.dynamicTypes.forEach(dynamicType => {
        items.push({
          key: dynamicType.id,
          label: t(`grid.advanced-column.advancedColumns.${dynamicType.id}`),
          onClick: () => { operations.add({ key: dynamicType.id }) }
        })
      })
    }

    Object.entries(group).forEach(([groupKey, childNode]) => {
      if (groupKey === 'dynamicTypes') return
      items.push({
        key: `${groupKey}-group`,
        label: t(`grid.advanced-column.advancedColumns.group.${groupKey}`),
        children: buildMenuItemsFromTree(childNode as IGroupedTree)
      })
    })

    return items
  }

  const items = buildMenuItemsFromTree(groupedTree)

  return (
    <Dropdown menu={ { items } }>
      {children}
    </Dropdown>
  )
}
