/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { type MenuProps } from 'antd'
import { type AreablockEditableConfig } from '../areablock-editable'
import { configUtils } from '../utils/areablock-utils'

export interface UseAreablockMenuOptions {
  config?: AreablockEditableConfig
  onAddArea: (areaType: string) => void
}

export interface UseAreablockMenuReturn {
  menuItems: MenuProps['items']
}

export const useAreablockMenu = ({ config, onAddArea }: UseAreablockMenuOptions): UseAreablockMenuReturn => {
  const { t } = useTranslation()

  const menuItems = useMemo(() => {
    const groupedTypes = configUtils.getGroupedAreaTypes(config)

    if (Array.isArray(groupedTypes)) {
      return groupedTypes.map(areaType => ({
        key: areaType.type,
        label: t(areaType.name),
        onClick: () => { onAddArea(areaType.type) }
      }))
    }

    const items: MenuProps['items'] = []

    Object.entries(groupedTypes).forEach(([groupName, areaTypes]) => {
      const children = areaTypes.map(areaType => ({
        key: areaType.type,
        label: t(areaType.name),
        onClick: () => { onAddArea(areaType.type) }
      }))

      items?.push({
        key: groupName,
        label: t(groupName),
        children
      })
    })

    return items
  }, [config, onAddArea, t])

  return {
    menuItems
  }
}
