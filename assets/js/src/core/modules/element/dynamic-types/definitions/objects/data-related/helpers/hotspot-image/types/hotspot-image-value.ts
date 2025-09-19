/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ImageValue } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/image/image'
import { type Hotspot, type Marker } from './hotspot-types'
import { type CropSettings } from './crop-types'

export interface HotspotImageValue {
  image: ImageValue | null
  hotspots: Hotspot[]
  marker: Marker[]
  crop: CropSettings
}
