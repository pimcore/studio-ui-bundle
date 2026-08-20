/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { isUndefined } from 'lodash'
import { type MenuProps } from 'antd'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { type AreablockEditableConfig } from '../areablock-editable'
import { configUtils } from '../utils/areablock-utils'

export interface UseAreablockMenuOptions {
  config?: AreablockEditableConfig
  onAddArea: (areaType: string) => void
}

// The areablock toolbar (ToolStrip) raises itself to z-index 10000 while activated
// (see tool-strip.styles.ts), which sits above antd's default popup z-index range.
// The first entry in this menu is rendered directly beneath that toolbar, so its
// tooltip (opening upward by default) would otherwise be painted behind it. Elements
// that must render above the activated toolbar use 10001 elsewhere in the app
// (e.g. editable-dialog.tsx, job-view.tsx) — match that convention here.
const areablockMenuTooltipZIndex = 10001

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
        label: (
          <Tooltip
            title={ isUndefined(areaType.description) ? undefined : t(areaType.description) }
            zIndex={ areablockMenuTooltipZIndex }
          >
            <span>{t(areaType.name)}</span>
          </Tooltip>
        ),
        onClick: () => { onAddArea(areaType.type) }
      }))
    }

    const items: MenuProps['items'] = []

    Object.entries(groupedTypes).forEach(([groupName, areaTypes]) => {
      const children = areaTypes.map(areaType => ({
        key: areaType.type,
        label: (
          <Tooltip
            title={ isUndefined(areaType.description) ? undefined : t(areaType.description) }
            zIndex={ areablockMenuTooltipZIndex }
          >
            <span>{t(areaType.name)}</span>
          </Tooltip>
        ),
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
