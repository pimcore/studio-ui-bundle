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

import { Region as BaseRegion, type RegionProps as BaseRegionProps } from '@Pimcore/components/region/region'
import { type AbstractObjectLayoutDefinition } from '../../dynamic-type-object-layout-abstract'
import React from 'react'
import { ObjectComponent } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'

export interface RegionProps extends AbstractObjectLayoutDefinition {}

export const availableRegions = {
  north: 'north',
  south: 'south',
  east: 'east',
  west: 'west',
  center: 'center'
}

export const Region = ({ children }: RegionProps): React.JSX.Element => {
  const items: BaseRegionProps['items'] = []
  const layoutDefinition: BaseRegionProps['layoutDefinition'] = []
  const regionMap: Record<string, number> = {}

  children.forEach((child) => {
    let { region } = child

    if (region === '' || region === null) {
      region = availableRegions.center
    }

    const regionIndex = (regionMap[region] ?? 0) + 1

    items.push({
      region: `${region}${regionIndex}`,
      component: <ObjectComponent
        { ...child }
        key={ child.name }
                 />
    })

    regionMap[region] = regionIndex
  })

  let mainAreaColumnAmount = (regionMap[availableRegions.center] ?? 0) + (regionMap[availableRegions.east] ?? 0) + (regionMap[availableRegions.west] ?? 0)
  const hasMainAreaColumn = mainAreaColumnAmount > 0

  if (!hasMainAreaColumn) {
    mainAreaColumnAmount = 1
  }

  if (regionMap[availableRegions.north] > 0) {
    for (let i = 0; i < regionMap[availableRegions.north]; i++) {
      layoutDefinition.push(`${availableRegions.north}${i + 1} `.repeat(mainAreaColumnAmount).trim())
    }
  }

  if (hasMainAreaColumn) {
    let mainLayoutDefinition = ''

    if (regionMap[availableRegions.west] > 0) {
      for (let i = 0; i < regionMap[availableRegions.west]; i++) {
        mainLayoutDefinition += `${availableRegions.west}${i + 1} `
      }
    }

    if (regionMap[availableRegions.center] > 0) {
      for (let i = 0; i < regionMap[availableRegions.center]; i++) {
        mainLayoutDefinition += `${availableRegions.center}${i + 1} `
      }
    }

    if (regionMap[availableRegions.east] > 0) {
      for (let i = 0; i < regionMap[availableRegions.east]; i++) {
        mainLayoutDefinition += `${availableRegions.east}${i + 1} `
      }
    }

    layoutDefinition.push(mainLayoutDefinition.trim())
  }

  if (regionMap[availableRegions.south] > 0) {
    for (let i = 0; i < regionMap[availableRegions.south]; i++) {
      layoutDefinition.push(`${availableRegions.south}${i + 1} `.repeat(mainAreaColumnAmount).trim())
    }
  }

  return (
    <BaseRegion
      items={ items }
      layoutDefinition={ layoutDefinition }
    />
  )
}
