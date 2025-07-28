/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext } from 'react'
import { HotspotMarkersModalContext, type HotspotMarkersModalContextProps } from './hotspot-markers-modal-provider'
import { isNil } from 'lodash'

export const useHotspotMarkersModalContext = (): HotspotMarkersModalContextProps => {
  const context = useContext(HotspotMarkersModalContext)
  if (isNil(context)) {
    throw new Error('useHotspotMarkersModalContext must be used within a HotspotMarkersModalProvider')
  }
  return context
}
