/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type ThumbnailService, type ThumbnailDefinition } from '../services/thumbnail-service'
import { isNil } from 'lodash'

/**
 * Utility function to generate a thumbnail URL
 * Auto-detects between named and custom thumbnails based on presence of thumbnailName
 * 
 * @param definition - The thumbnail definition object
 * @returns The thumbnail URL string, or null if definition is null
 * 
 * @example
 * ```typescript
 * // Named thumbnail (auto-detected by presence of thumbnailName)
 * const namedUrl = getThumbnailUrl({
 *   assetId: 123,
 *   assetType: 'image',
 *   thumbnailName: 'myThumbnail'
 * })
 * 
 * // Custom thumbnail (auto-detected by absence of thumbnailName)
 * const customUrl = getThumbnailUrl({
 *   assetId: 123,
 *   assetType: 'image',
 *   width: 300,
 *   height: 200,
 *   mimeType: 'JPEG'
 * })
 * ```
 */
export const getThumbnailUrl = (definition: ThumbnailDefinition | null): string | null => {
  if (isNil(definition)) return null
  
  const thumbnailService = container.get<ThumbnailService>(serviceIds['Asset/ThumbnailService'])
  return thumbnailService.getThumbnailUrl(definition)
}
