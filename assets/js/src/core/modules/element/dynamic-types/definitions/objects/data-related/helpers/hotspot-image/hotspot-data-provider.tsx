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
