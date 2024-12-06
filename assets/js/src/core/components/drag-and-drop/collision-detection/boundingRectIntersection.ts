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

import { type Collision, type CollisionDetection, pointerWithin } from '@dnd-kit/core'

export const transformBoundingRectToCoordinates = (rect: DOMRect): { x1: number, x2: number, y1: number, y2: number } => {
  return {
    x1: rect.left,
    x2: rect.right,
    y1: rect.top,
    y2: rect.bottom
  }
}

export const boundingRectIntersection: CollisionDetection = (props) => {
  const pointerCollisions = pointerWithin(props)

  if (pointerCollisions.length > 0) {
    return pointerCollisions
  }

  const { droppableContainers } = props
  const activeEl = document.querySelector('.dnd-overlay')
  type CollisionWithRatio = Collision & { ratio: number }
  const collisions: CollisionWithRatio[] = []

  const draggableRect = activeEl?.getBoundingClientRect()

  if (draggableRect === undefined) {
    return []
  }

  const draggableRectCoordinates = transformBoundingRectToCoordinates(draggableRect)

  for (const container of droppableContainers) {
    if (container.node.current === null) {
      continue
    }

    const droppableRect = container.node.current.getBoundingClientRect()

    if (droppableRect.width === 0) {
      continue
    }

    const droppableRectCoordinates = transformBoundingRectToCoordinates(droppableRect)

    const intersectX1 = Math.max(draggableRectCoordinates.x1, droppableRectCoordinates.x1)
    const intersectX2 = Math.min(draggableRectCoordinates.x2, droppableRectCoordinates.x2)
    const intersectY1 = Math.max(draggableRectCoordinates.y1, droppableRectCoordinates.y1)
    const intersectY2 = Math.min(draggableRectCoordinates.y2, droppableRectCoordinates.y2)

    if (intersectX1 < intersectX2 && intersectY1 < intersectY2) {
      collisions.push({
        id: container.id,
        data: container.data,
        ratio: getIntersectionRatio(draggableRect, droppableRect)
      })
    }
  }
  return collisions.sort((a, b) => b.ratio - a.ratio)
}

const getIntersectionRatio = (rect1: DOMRect, rect2: DOMRect): number => {
  const x1 = Math.max(rect1.left, rect2.left)
  const y1 = Math.max(rect1.top, rect2.top)
  const x2 = Math.min(rect1.right, rect2.right)
  const y2 = Math.min(rect1.bottom, rect2.bottom)

  const intersectionWidth = Math.max(0, x2 - x1)
  const intersectionHeight = Math.max(0, y2 - y1)
  const intersectionArea = intersectionWidth * intersectionHeight

  const rect1Area = rect1.width * rect1.height
  const rect2Area = rect2.width * rect2.height
  const unionArea = rect1Area + rect2Area - intersectionArea

  return intersectionArea / unionArea
}
