/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import _ from 'lodash'
import {
  type HotspotImageValue
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/hotspot-image'

export const hasValueData = (value?: HotspotImageValue | null): boolean => {
  return !_.isEmpty(value?.hotspots) || !_.isEmpty(value?.marker) || !_.isEmpty(value?.crop)
}
