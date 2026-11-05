/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { camelCase, isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { type DragAndDropInfo } from '@Pimcore/components/drag-and-drop/droppable'
import { toElementListDragType } from '@Pimcore/components/drag-and-drop/element-drag'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { type TreeNodeProps } from '../node/tree-node'
import { useElementTree } from './use-element-tree'
import { resolveActionTargets } from '../utils/selection-targets'

/** What building a drag payload needs from a node. */
type DraggableNode = Pick<TreeNodeProps, 'id' | 'metaData'>

export interface UseElementDragInfoProps {
  /** Only what the payload is built from, so both node prop shapes fit. */
  node: Pick<TreeNodeProps, 'id' | 'icon' | 'metaData'>
  elementType: ElementType
  /** Label of the single element drag; the multi drag names a count instead. */
  title: string
}

/**
 * Builds the drag payload of a tree node, as a single element or as the whole
 * selection.
 *
 * Returns a resolver rather than the payload itself: it runs when the drag starts,
 * so a node does not have to subscribe to the selection just to be draggable.
 */
export const useElementDragInfo = ({ node, elementType, title }: UseElementDragInfoProps): (() => DragAndDropInfo) => {
  const { t } = useTranslation()
  const { getSelectedIds, getSelectedNodes, setSelectedIds } = useElementTree()

  // The metadata of a node is keyed by its element type, e.g. `dataObject`.
  const metaDataKey = camelCase(elementType)

  return () => {
    const singleElementInfo: DragAndDropInfo = {
      icon: node.icon,
      title,
      type: elementType,
      data: { ...node.metaData?.[metaDataKey] }
    }

    const selectedNodeIds = getSelectedIds()

    // Dragging a node from outside the selection takes it over, the same way a
    // right click does, so the highlight always matches what is being dragged.
    if (!selectedNodeIds.includes(node.id)) {
      setSelectedIds([node.id])

      return singleElementInfo
    }

    // Same rule the tree context menu actions follow.
    const elements = resolveActionTargets<DraggableNode>(node, getSelectedNodes())
      .map(selectedNode => selectedNode.metaData?.[metaDataKey])
      .filter(element => !isNil(element))

    if (elements.length < 2) {
      return singleElementInfo
    }

    // Selected nodes inside a collapsed parent have no data to carry, so the
    // count names what is really being dragged instead of what is selected.
    const isCompleteSelection = elements.length === selectedNodeIds.length

    return {
      icon: node.icon,
      title: isCompleteSelection
        ? t('element.tree.drag.elements', { count: elements.length })
        : t('element.tree.drag.elements-partial', { count: elements.length, selected: selectedNodeIds.length }),
      type: toElementListDragType(elementType),
      data: elements
    }
  }
}
