/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ElementType, elementTypes } from '@Pimcore/types/enums/element/element-type'
import { type SelectedItem } from '../provider/element-selector/element-selector-provider'
import { isArray } from 'lodash'

export const getFinishedEventSelectedItems = (eventData: any): SelectedItem[] => {
  const selectedItems: SelectedItem[] = []

  const addItems = (items: any[], elementType: ElementType): void => {
    items.forEach(item => {
      selectedItems.push({
        elementType,
        data: {
          ...item
        }
      })
    })
  }

  if (isArray(eventData.assets)) {
    addItems(eventData.assets as any[], elementTypes.asset)
  }
  if (isArray(eventData.documents)) {
    addItems(eventData.documents as any[], elementTypes.document)
  }
  if (isArray(eventData.objects)) {
    addItems(eventData.objects as any[], elementTypes.dataObject)
  }

  return selectedItems
}
