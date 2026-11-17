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
import { SanitizeHtml } from '@Pimcore/components/sanitize-html/sanitize-html'
import { type AreablockEditableConfig, type AreaType, type AreaInsertPosition } from '../areablock-editable'
import { configUtils } from '../utils/areablock-utils'
import { AreablockMenuItem } from '../components/areablock-menu-item'

export interface UseAreablockMenuOptions {
  config?: AreablockEditableConfig
  onAddArea: (areaType: string, position: AreaInsertPosition) => void
  /**
   * Adds the insert above and insert below buttons to every entry. Only meaningful
   * next to an existing area, so the empty state leaves it off.
   */
  showInsertPosition?: boolean
}

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

export const useAreablockMenu = ({ config, onAddArea, showInsertPosition = false }: UseAreablockMenuOptions): UseAreablockMenuReturn => {
  const { t } = useTranslation()

  const menuItems = useMemo(() => {
    const groupedTypes = configUtils.getGroupedAreaTypes(config)

    const toMenuItem = (areaType: AreaType): NonNullable<MenuProps['items']>[number] => ({
      key: areaType.type,
      label: (
        <AreablockMenuItem
          name={ t(areaType.name) }
          onInsert={ showInsertPosition ? (position) => { onAddArea(areaType.type, position) } : undefined }
          tooltipTitle={ getTooltipTitle(areaType, t) }
        />
      ),
      onClick: () => { onAddArea(areaType.type, 'below') }
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
  }, [config, onAddArea, showInsertPosition, t])

  return {
    menuItems
  }
}
