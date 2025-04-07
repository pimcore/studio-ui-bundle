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

import React, { useState } from 'react'
import { HotspotImage, type IHotspot, type IStyleOptions, defaultStyleOptions } from '@Pimcore/components/hotspot-image/hotspot-image'

interface IHotspotImageContainer {
  src: string
  styleOptions?: IStyleOptions
  items?: IHotspot[]
}

export const HotspotImageContainer = ({ src, items, styleOptions = defaultStyleOptions }: IHotspotImageContainer): JSX.Element => {
  const [hotspots, setHotspots] = useState<IHotspot[]>(items ?? [])

  const addHotspot = (type: string): void => {
    const style = styleOptions[type]
    const newHotspot: IHotspot = {
      id: hotspots.length + 1,
      x: 50,
      y: 50,
      width: style.width,
      height: style.height,
      type
    }

    setHotspots([...hotspots, newHotspot])
  }

  const onRemove = (id: number): void => {
    setHotspots(hotspots.filter(h => h.id !== id))
  }

  const onEdit = (hotspot: IHotspot): void => {
    console.log(`hotspot with id ${hotspot.id} in edit mode`)
  }

  const onUpdate = (item: IHotspot): void => {
    setHotspots(hotspots.map(h => h.id === item.id ? item : h))
  }

  return (
    <>
      <HotspotImage
        data={ hotspots }
        onEdit={ onEdit }
        onRemove={ onRemove }
        onUpdate={ onUpdate }
        src={ src }
        styleOptions={ styleOptions }
      />

      <div>
        {JSON.stringify(hotspots, null, 2)}
      </div>

      <button onClick={ () => { addHotspot('hotspot') } }>Add Hotspot</button>
      <button onClick={ () => { addHotspot('marker') } }>Add Marker</button>
    </>
  )
}
