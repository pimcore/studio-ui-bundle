/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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

export interface UseOpenHookReturn {
  openContextMenuItem: (node: Element, onFinish?: () => void) => ItemType
  openGridContextMenuItem: (row: any) => ItemType | undefined
}

export const useOpen = (elementType: ElementType): UseOpenHookReturn => {
  const { t } = useTranslation()
  const { openElement } = useElementHelper()

  const openContextMenuItem = (node: Element): ItemType => {
    return {
      label: t('element.open'),
      key: 'open',
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

    return {
      label: t('element.open'),
      key: 'open',
      icon: <Icon value={ 'open-folder' } />,
      hidden: !checkElementPermission(data.permissions, 'view'),
      onClick: async () => {
        await openElement({
          id: data.id,
          type: elementType
        })
      }
    }
  }

  return {
    openContextMenuItem,
    openGridContextMenuItem
  }
}
