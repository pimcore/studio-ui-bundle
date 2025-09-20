/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getThumbnailUrl } from '@Pimcore/modules/asset/utils/get-thumbnail-url'
import { type CustomThumbnailDefinition } from '@Pimcore/modules/asset/services/thumbnail-service'

export type ImageThumbnailSettings = Omit<CustomThumbnailDefinition, 'assetId' | 'assetType'>

export const createImageThumbnailUrl = (assetId: number, settings: ImageThumbnailSettings): string => {
  return getThumbnailUrl({
    assetId,
    assetType: 'image',
    resizeMode: settings.resizeMode ?? 'none',
    ...settings
  }) ?? ''
}
