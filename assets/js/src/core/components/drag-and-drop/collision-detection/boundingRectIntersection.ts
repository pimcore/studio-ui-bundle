/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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

const iframeCache = new Map<Document, HTMLIFrameElement | null>();

const getIframeOffset = (document: Document | null): { x: number, y: number } => {
  if (!document || document === window.parent.document) return { x: 0, y: 0 };

  if (!iframeCache.has(document)) {
    const iframes = window.parent.document.querySelectorAll('iframe');
    const matchingIframe = Array.from(iframes).find(iframe => iframe.contentDocument === document);
    iframeCache.set(document, matchingIframe || null);
  }

  const cachedIframe = iframeCache.get(document);
  if (cachedIframe) {
    const iframeRect = cachedIframe.getBoundingClientRect();
    return { x: iframeRect.left, y: iframeRect.top };
  }

  return { x: 0, y: 0 };
}

export const boundingRectIntersection: CollisionDetection = (props) => {
  const adjustedPointerProps = {
    ...props,
    droppableContainers: props.droppableContainers.map(container => {
      if (container.node.current === null) {
        return container;
      }

      const iframeOffset = getIframeOffset(container.node.current.ownerDocument);

      const adjustedNode = {
        ...container.node,
        current: {
          ...container.node.current,
          getBoundingClientRect: () => {
            const rect = container.node.current.getBoundingClientRect();
            return new DOMRect(
              rect.left - iframeOffset.x,
              rect.top - iframeOffset.y,
              rect.width,
              rect.height
            );
          }
        }
      };

      return {
        ...container,
        node: adjustedNode
      };
    }),
    droppableRects: new Map(
      props.droppableContainers.map(container => {
        if (container.node.current === null) {
          return [container.id, null];
        }

        const iframeOffset = getIframeOffset(container.node.current.ownerDocument);

        const rect = container.node.current.getBoundingClientRect();
        const adjustedRect = new DOMRect(
          rect.left + iframeOffset.x,
          rect.top + iframeOffset.y,
          rect.width,
          rect.height
        );

        return [container.id, adjustedRect];
      })
    )
  }
console.log('adjustedPointerProps', adjustedPointerProps, props)
  const pointerCollisions = pointerWithin(adjustedPointerProps)

  if (pointerCollisions.length > 0) {
    console.log('pointerCollisions', pointerCollisions)
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
    
    const iframeOffset = getIframeOffset(container.node.current.ownerDocument);

    const droppableRectCoordinates = {
      x1: droppableRect.left + iframeOffset.x,
      x2: droppableRect.right + iframeOffset.x,
      y1: droppableRect.top + iframeOffset.y,
      y2: droppableRect.bottom + iframeOffset.y
    }

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
console.log('collisions', collisions)
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
