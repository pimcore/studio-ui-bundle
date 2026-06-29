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
import { useTranslation } from 'react-i18next'
import { type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { ContextMenuActionName } from '@Pimcore/modules/element/actions'
import {
  type DataObject,
  type DataObjectWithDetailData
} from '@Pimcore/modules/data-object/data-object-api-slice.gen'

export interface UseOpenPreviewInNewWindowHookReturn {
  openPreviewInNewWindowContextMenuItem: (dataObject: DataObject, onFinish?: () => void) => ItemType
}

export const useOpenPreviewInNewWindow = (): UseOpenPreviewInNewWindowHookReturn => {
  const { t } = useTranslation()

  const openPreviewInNewWindowContextMenuItem = (dataObject: DataObject, onFinish?: () => void): ItemType => {
    const hasPreview = (dataObject as Partial<DataObjectWithDetailData>)?.hasPreview === true

    return {
      label: t('element.open'),
      key: ContextMenuActionName.open,
      icon: <Icon value={ 'eye' } />,
      hidden: !hasPreview || !checkElementPermission(dataObject?.permissions, 'view'),
      onClick: () => {
        window.open(`${getPrefix()}/data-objects/preview/${dataObject.id}`)
        onFinish?.()
      }
    }
  }

  return {
    openPreviewInNewWindowContextMenuItem
  }
}
