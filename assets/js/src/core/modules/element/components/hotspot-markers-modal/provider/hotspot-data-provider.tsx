/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useMemo, useState } from 'react'
import {
  type ExpandedHotspotMarkerData
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/types/hotspot-types'

export interface HotspotDataContext {
  fields: ExpandedHotspotMarkerData[]
  setFields: React.Dispatch<React.SetStateAction<ExpandedHotspotMarkerData[]>>
}

export const HotspotContext = createContext<HotspotDataContext>({
  fields: [],
  setFields: () => {}
})

export interface HotspotDataProviderProps {
  children: React.ReactNode
}

export const HotspotDataProvider = ({ children }: HotspotDataProviderProps): React.JSX.Element => {
  const [fields, setFields] = useState<ExpandedHotspotMarkerData[]>([])

  const value = useMemo(() => ({
    fields,
    setFields
  }), [fields])

  return (
    <HotspotContext.Provider value={ value }>
      {children}
    </HotspotContext.Provider>
  )
}
