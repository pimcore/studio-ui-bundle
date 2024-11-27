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

import { type Asset, type ElementIcon } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { type DataObject } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import type { ElementType } from '../../../../types/element-type.d'
import { useTranslation } from 'react-i18next'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { useRefreshTree } from '@Pimcore/modules/element/actions/refresh-tree/use-refresh-tree'
import { useElementApi } from '@Pimcore/modules/element/hooks/use-element-api'
import { UseRenameHookReturn } from '@Pimcore/modules/element/actions/rename/use-rename'

type Element = Asset | DataObject

export const getElementIcon = (element: Element, defaultIcon: ElementIcon): ElementIcon => {
  if (
    element.customAttributes?.icon !== undefined &&
    element.customAttributes?.icon !== null
  ) {
    return element.customAttributes.icon
  }

  if (
    element.icon !== undefined &&
    element.icon !== null
  ) {
    return element.icon
  }

  return defaultIcon
}

export const getElementKey = (element: Element, elementType: ElementType): string => {
  if (elementType === 'asset') {
    return (element as Asset).filename ?? ''
  }

  if (elementType === 'data-object') {
    return (element as DataObject).key ?? ''
  }

  return ''
}
