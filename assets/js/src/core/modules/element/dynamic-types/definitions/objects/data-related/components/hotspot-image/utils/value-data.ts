/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isEmpty } from 'lodash'
import {
  type HotspotImageValue
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/hotspot-image'

export const hasHotspotsOrMarkers = (value?: HotspotImageValue | null): boolean => {
  return !isEmpty(value?.hotspots) || !isEmpty(value?.marker)
}
