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
