/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { generateThumbnailUrlForAssetType, type ThumbnailUrlConfig } from '../../../utils/asset-thumbnail-sizing'

/**
 * Generate thumbnail URL for image assets
 * Priority: named thumbnails (string) -> dynamic config (object) -> custom thumbnails (fallback)
 */
export const generateThumbnailUrl = (config: ThumbnailUrlConfig): string | undefined => {
  return generateThumbnailUrlForAssetType(config, 'image', 'PNG')
}
