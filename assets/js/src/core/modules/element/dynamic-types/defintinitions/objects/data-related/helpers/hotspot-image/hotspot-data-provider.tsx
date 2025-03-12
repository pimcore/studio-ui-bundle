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

import React, { useState, createContext, useMemo } from 'react'
import type {
  HotspotMarkerData
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/hotspot-image/types/hotspot-types'

export interface HotspotDataContext {
  fields: HotspotMarkerData[]
  setFields: React.Dispatch<React.SetStateAction<HotspotMarkerData[]>>
  hotspotName: string
  setHotspotName: (name: string) => void
  editModeHotspotId: number | undefined
}

export const HotspotContext = createContext<HotspotDataContext>({
  fields: [],
  setFields: () => {},
  hotspotName: '',
  setHotspotName: () => {},
  editModeHotspotId: undefined
})

export interface HotspotDataProviderProps {
  children: React.ReactNode
  editModeHotspotId: number | undefined
}

export const HotspotDataProvider = ({ children, editModeHotspotId }: HotspotDataProviderProps): React.JSX.Element => {
  const [fields, setFields] = useState<HotspotMarkerData[]>([])
  const [hotspotName, setHotspotName] = useState<string>('')

  const value = useMemo(() => ({
    fields,
    setFields,
    hotspotName,
    setHotspotName,
    editModeHotspotId
  }), [fields, hotspotName, editModeHotspotId])

  return (
    <HotspotContext.Provider value={ value }>
      {children}
    </HotspotContext.Provider>
  )
}
