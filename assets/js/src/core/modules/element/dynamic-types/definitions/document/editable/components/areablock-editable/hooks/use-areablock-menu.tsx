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
import { useTranslation, type UseTranslationResponse } from 'react-i18next'
import { isEmpty, isUndefined } from 'lodash'
import { type MenuProps } from 'antd'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { SanitizeHtml } from '@Pimcore/components/sanitize-html/sanitize-html'
import { type AreablockEditableConfig, type AreaType } from '../areablock-editable'
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
// (see editable-dialog.tsx) — match that convention here.
const areablockMenuTooltipZIndex = 10001

export interface UseAreablockMenuReturn {
  menuItems: MenuProps['items']
}

const getTooltipTitle = (areaType: AreaType, t: UseTranslationResponse<'translation', undefined>['t']): React.JSX.Element | string | undefined => {
  const description = isUndefined(areaType.description) ? undefined : t(areaType.description)
  const previewHtml = areaType.previewHtml ?? ''

  if (isEmpty(previewHtml)) {
    return description
  }

  return (
    <>
      { !isUndefined(description) && <div>{ description }</div> }
      <SanitizeHtml html={ previewHtml } />
    </>
  )
}

export const useAreablockMenu = ({ config, onAddArea }: UseAreablockMenuOptions): UseAreablockMenuReturn => {
  const { t } = useTranslation()

  const menuItems = useMemo(() => {
    const groupedTypes = configUtils.getGroupedAreaTypes(config)

    const toMenuItem = (areaType: AreaType): NonNullable<MenuProps['items']>[number] => ({
      key: areaType.type,
      label: (
        <Tooltip
          title={ getTooltipTitle(areaType, t) }
          zIndex={ areablockMenuTooltipZIndex }
        >
          <span>{t(areaType.name)}</span>
        </Tooltip>
      ),
      onClick: () => { onAddArea(areaType.type) }
    })

    if (Array.isArray(groupedTypes)) {
      return groupedTypes.map(toMenuItem)
    }

    const items: MenuProps['items'] = []

    Object.entries(groupedTypes).forEach(([groupName, areaTypes]) => {
      items?.push({
        key: groupName,
        label: t(groupName),
        children: areaTypes.map(toMenuItem)
      })
    })

    return items
  }, [config, onAddArea, t])

  return {
    menuItems
  }
}
