/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'
import { SelectionType } from '@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider'

/**
 * Example of how to use the element selector from within an iframe
 * This can be called from iframe contexts or the parent window
 */
export function openElementSelectorExample(): void {
  try {
    const studioApi = getPimcoreStudioApi()
    
    studioApi.element.openElementSelector({
      selectionType: SelectionType.Multiple,
      areas: {
        asset: true,
        document: true,
        object: true
      },
      onFinish: (event) => {
        console.log('Selected elements:', event.items)
        // Handle the selected elements here
        event.items.forEach(item => {
          console.log(`Selected ${item.elementType}: ${item.data.id} - ${item.data.fullpath}`)
        })
      }
    })
  } catch (error) {
    console.error('Failed to open element selector:', error)
  }
}

/**
 * Example with restricted element types
 */
export function openAssetSelectorExample(): void {
  try {
    const studioApi = getPimcoreStudioApi()
    
    studioApi.element.openElementSelector({
      selectionType: SelectionType.Single,
      areas: {
        asset: true,
        document: false,
        object: false
      },
      config: {
        assets: {
          allowedTypes: ['image', 'document'] // Only allow image and document assets
        }
      },
      onFinish: (event) => {
        if (event.items.length > 0) {
          const selectedAsset = event.items[0]
          console.log('Selected asset:', selectedAsset.data.id, selectedAsset.data.fullpath)
          // Use the selected asset
        }
      }
    })
  } catch (error) {
    console.error('Failed to open asset selector:', error)
  }
}