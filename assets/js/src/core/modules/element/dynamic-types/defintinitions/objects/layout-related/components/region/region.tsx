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
import React, { type ReactNode } from 'react'
import { ObjectComponent } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'
import { BaseView } from '../../views/base-view'

export interface RegionProps extends AbstractObjectLayoutDefinition {
  collapsible?: boolean
  collapsed?: boolean
  title?: ReactNode
}

export enum AvailableRegions {
  North = 'north',
  South = 'south',
  East = 'east',
  West = 'west',
  Center = 'center',
}

export const Region = ({ children, ...props }: RegionProps): React.JSX.Element => {
  const items: BaseRegionProps['items'] = []
  const layoutDefinition: BaseRegionProps['layoutDefinition'] = []
  const regionMap: Record<string, number> = {}

  children.forEach((child) => {
    let { region } = child

    if (region === '' || region === null) {
      region = AvailableRegions.Center
    }

    const regionIndex = (regionMap[region] ?? 0) + 1

    items.push({
      region: `${region}${regionIndex}`,
      // maxWidth: @todo field for the max width needs to be defined,
      component: <ObjectComponent
        { ...child }
        key={ child.name }
                 />
    })

    regionMap[region] = regionIndex
  })

  const handleLayoutDefinitionByRegion = (region: AvailableRegions): void => {
    for (let i = 0; i < regionMap[region]; i++) {
      layoutDefinition.push(`${region}${i + 1} `.repeat(mainAreaColumnAmount).trim())
    }
  }

  let mainAreaColumnAmount = (regionMap[AvailableRegions.Center] ?? 0) + (regionMap[AvailableRegions.East] ?? 0) + (regionMap[AvailableRegions.West] ?? 0)
  const hasMainAreaColumn = mainAreaColumnAmount > 0

  if (!hasMainAreaColumn) {
    mainAreaColumnAmount = 1
  }

  if (regionMap[AvailableRegions.North] > 0) {
    handleLayoutDefinitionByRegion(AvailableRegions.North)
  }

  if (regionMap[AvailableRegions.South] > 0) {
    handleLayoutDefinitionByRegion(AvailableRegions.South)
  }

  if (hasMainAreaColumn) {
    let mainLayoutDefinition = ''

    const handleMainLayoutDefinitionByRegion = (region: AvailableRegions): void => {
      for (let i = 0; i < regionMap[region]; i++) {
        mainLayoutDefinition += `${region}${i + 1} `
      }
    }

    if (regionMap[AvailableRegions.West] > 0) {
      handleMainLayoutDefinitionByRegion(AvailableRegions.West)
    }

    if (regionMap[AvailableRegions.Center] > 0) {
      handleMainLayoutDefinitionByRegion(AvailableRegions.Center)
    }

    if (regionMap[AvailableRegions.East] > 0) {
      handleMainLayoutDefinitionByRegion(AvailableRegions.East)
    }

    layoutDefinition.push(mainLayoutDefinition.trim())
  }

  return (
    <BaseView
      collapsed={ props.collapsed }
      collapsible={ props.collapsible }
      title={ props.title }
    >
      <BaseRegion
        items={ items }
        layoutDefinition={ layoutDefinition }
      />
    </BaseView>
  )
}
