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

export interface UseAreablockMenuReturn {
  menuItems: MenuProps['items']
}

const getTooltipTitle = (areaType: AreaType, t: UseTranslationResponse<'translation', undefined>['t']): React.JSX.Element | string | undefined => {
  const description = isUndefined(areaType.description) ? undefined : t(areaType.description)

  if (typeof areaType.previewHtml !== 'string' || isEmpty(areaType.previewHtml)) {
    return description
  }

  return (
    <>
      { !isUndefined(description) && <div>{ description }</div> }
      <SanitizeHtml html={ areaType.previewHtml } />
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
        <Tooltip title={ getTooltipTitle(areaType, t) }>
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
