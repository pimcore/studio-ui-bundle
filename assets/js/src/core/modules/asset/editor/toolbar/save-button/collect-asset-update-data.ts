/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type DataProperty as DataPropertyApi } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice.gen'
import { type CustomMetadata as CustomMetadataApi } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/metadata-api-slice-enhanced'
import { type DataProperty } from '@Pimcore/modules/element/draft/hooks/use-properties'
import { type CustomMetadata } from '@Pimcore/modules/asset/draft/hooks/use-custom-metadata'
import { type AssetSaveUpdateData } from '@Pimcore/modules/asset/services/processors/asset-save-data-processor-registry'
import { type UseAssetDraftReturn } from '@Pimcore/modules/asset/hooks/use-asset-draft'

export type AssetUpdateDraftData = Pick<UseAssetDraftReturn, 'properties' | 'customMetadata' | 'customSettings' | 'imageSettings' | 'textData'>

export interface CollectedAssetUpdateData {
  updateData: AssetSaveUpdateData

  /** Change types whose draft data ended up in `updateData` (flags without draft data are not collected) */
  collectedTypes: string[]
}

const collectProperties = (properties: DataProperty[] | undefined): DataPropertyApi[] | undefined => {
  return properties?.map((property: DataProperty): DataPropertyApi => {
    const { rowId, ...propertyApi } = property

    if (typeof propertyApi.data === 'object') {
      return {
        ...propertyApi,
        data: propertyApi?.data?.id ?? null
      }
    }

    return propertyApi
  }).filter((property) => !property.inherited)
}

const collectCustomMetadata = (customMetadata: CustomMetadata[] | undefined): CustomMetadataApi[] | undefined => {
  return customMetadata?.map((metadata: CustomMetadata): CustomMetadataApi => {
    const { rowId, ...metadataApi } = metadata

    if (metadataApi.type.startsWith('metadata.')) {
      metadataApi.type = metadataApi.type.replace('metadata.', '')
    }

    if (metadataApi.data === null) {
      if (metadataApi.type === 'input' || metadataApi.type === 'textarea') {
        metadataApi.data = ''
      }

      if (metadataApi.type === 'checkbox') {
        metadataApi.data = false
      }
    }

    return metadataApi
  })
}

/**
 * Assembles the asset update payload from the draft sections flagged in `changes`.
 * A flagged section whose draft data is `undefined` is omitted, so it can never end up as an empty payload entry.
 */
export const collectAssetUpdateData = (
  changes: Record<string, boolean>,
  draftData: AssetUpdateDraftData
): CollectedAssetUpdateData => {
  const updateData: AssetSaveUpdateData = {}
  const collectedTypes: string[] = []

  const collect = <T>(type: string, data: T | undefined, assign: (data: T) => void): void => {
    if (!changes[type] || data === undefined) {
      return
    }

    assign(data)
    collectedTypes.push(type)
  }

  collect('properties', collectProperties(draftData.properties), (data) => {
    updateData.properties = data
  })
  collect('customMetadata', collectCustomMetadata(draftData.customMetadata), (data) => {
    updateData.metadata = data
  })
  collect('customSettings', draftData.customSettings, (data) => {
    updateData.customSettings = data
  })
  collect('imageSettings', draftData.imageSettings, (data) => {
    updateData.image = data
  })
  collect('textData', draftData.textData, (data) => {
    updateData.data = data
  })

  return { updateData, collectedTypes }
}

/**
 * True when the update carries at least one section, i.e. when an asset save request has something to send.
 */
export const hasAssetUpdateData = (updateData: AssetSaveUpdateData): boolean => {
  return Object.values(updateData).some((value) => value !== undefined)
}
