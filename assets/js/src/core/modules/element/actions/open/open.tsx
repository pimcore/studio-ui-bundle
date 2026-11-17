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
import { type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'lodash'
import { type Element } from '@Pimcore/modules/element/element-helper'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import type { GridContextMenuProps } from '@Pimcore/components/grid/grid'
import { resolveActionTargets } from '@Pimcore/components/element-tree/utils/selection-targets'
import { useRowSelectionOptional } from '@Pimcore/modules/element/listing/decorators/row-selection/context-layer/provider/use-row-selection-optional'
import { getSelectedGridRows } from '@Pimcore/modules/element/listing/decorators/row-selection/view-layer/components/context-menu/hooks/use-context-menu-row-selection'
import { ContextMenuActionName } from '..'

export interface UseOpenHookReturn {
  openContextMenuItem: (node: Element, onFinish?: () => void) => ItemType
  openGridContextMenuItem: (row: any) => ItemType | undefined
}

export const useOpen = (elementType: ElementType): UseOpenHookReturn => {
  const { t } = useTranslation()
  const { openElement } = useElementHelper()
  const rowSelection = useRowSelectionOptional()

  const openContextMenuItem = (node: Element): ItemType => {
    return {
      label: t('element.open'),
      key: ContextMenuActionName.open,
      icon: <Icon value={ 'open-folder' } />,
      hidden: !checkElementPermission(node.permissions, 'view'),
      onClick: async () => {
        await openElement({
          id: node.id,
          type: elementType
        })
      }
    }
  }

  const openGridContextMenuItem = (row: any): ItemType | undefined => {
    const data: GridContextMenuProps = row.original ?? {}
    if (data.id === undefined || data.isLocked === undefined || data.permissions === undefined) {
      return
    }

    const targets = resolveActionTargets(data, getSelectedGridRows(rowSelection, data))
    const viewableTargets = targets.filter(target => checkElementPermission(target.permissions, 'view'))

    return {
      label: targets.length > 1
        ? t('element.open-selected', { count: viewableTargets.length })
        : t('element.open'),
      key: ContextMenuActionName.open,
      icon: <Icon value={ 'open-folder' } />,
      hidden: isEmpty(viewableTargets),
      onClick: async () => {
        // One after the other, so the tabs open in the order of the selected rows
        for (const target of viewableTargets) {
          await openElement({
            id: target.id,
            type: elementType
          })
        }
      }
    }
  }

  return {
    openContextMenuItem,
    openGridContextMenuItem
  }
}
