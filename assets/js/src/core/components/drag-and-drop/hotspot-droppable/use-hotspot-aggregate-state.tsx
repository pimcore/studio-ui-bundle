/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useMemo } from 'react'
import { type HotspotState, type DragState } from './hotspot-helpers'

export const useHotspotAggregateState = (
  isDragHappening: boolean,
  hotspotStates: Record<string, HotspotState>
): { aggregateState: DragState, hotspotSpecificClasses: string[] } => {
  // Calculate aggregate state for main wrapper CSS classes
  const aggregateState = useMemo((): DragState => {
    if (!isDragHappening) return 'inactive'

    const states = Object.values(hotspotStates)
    const hasValidHotspot = states.some(state => state.dragState === 'valid')
    const hasActiveHotspot = states.some(state => state.dragState === 'active')
    const hasErrorHotspot = states.some(state => state.dragState === 'error')

    // Priority: valid > error > active > inactive
    if (hasValidHotspot) return 'valid'
    if (hasErrorHotspot) return 'error'
    if (hasActiveHotspot) return 'active'
    return 'inactive'
  }, [isDragHappening, hotspotStates])

  // Generate CSS classes for individual hotspot states
  const hotspotSpecificClasses = useMemo((): string[] => {
    const classes: string[] = []

    Object.entries(hotspotStates).forEach(([hotspotId, state]) => {
      if (state.dragState !== 'inactive') {
        // Add CSS class for specific hotspot state: e.g., 'dnd--hotspot-zone1-active'
        classes.push(`dnd--hotspot-${hotspotId}-${state.dragState}`)
      }
    })

    return classes
  }, [hotspotStates])

  return { aggregateState, hotspotSpecificClasses }
}
