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

import _ from 'lodash'
import {
  type HotspotImageValue
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/hotspot-image/hotspot-image'

export const hasValueData = (value?: HotspotImageValue | null): boolean => {
  return !_.isEmpty(value?.hotspots) || !_.isEmpty(value?.marker) || !_.isEmpty(value?.crop)
}
