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
import { type Element } from '@Pimcore/modules/element/element-helper'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import type { GridContextMenuProps } from '@Pimcore/components/grid/grid'
import { resolveActionTargets } from '@Pimcore/components/element-tree/utils/selection-targets'
import { isEmpty } from 'lodash'
import { ContextMenuActionName } from '..'

export interface UseOpenHookReturn {
  openContextMenuItem: (node: Element, onFinish?: () => void) => ItemType
  openGridContextMenuItem: (row: any, selection?: GridContextMenuProps[]) => ItemType | undefined
}

export const useOpen = (elementType: ElementType): UseOpenHookReturn => {
  const { t } = useTranslation()
  const { openElement } = useElementHelper()

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

  const openGridContextMenuItem = (row: any, selection?: GridContextMenuProps[]): ItemType | undefined => {
    const data: GridContextMenuProps = row.original ?? {}
    if (data.id === undefined || data.isLocked === undefined || data.permissions === undefined) {
      return
    }

    const targets = resolveActionTargets(data, selection ?? [])
    const viewableTargets = targets.filter(target => checkElementPermission(target.permissions, 'view'))

    return {
      label: targets.length > 1
        ? t('element.open-selected', { count: viewableTargets.length })
        : t('element.open'),
      key: ContextMenuActionName.open,
      icon: <Icon value={ 'open-folder' } />,
      hidden: isEmpty(viewableTargets),
      onClick: async () => {
        // One after the other, so the tabs open in selection order
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
