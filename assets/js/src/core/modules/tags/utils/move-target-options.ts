/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil } from 'lodash'
import type { Tag } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'

export const PATH_SEPARATOR = ' / '

export interface MoveTargetOption {
  value: number
  label: string
}

/**
 * Every tag a tag can be moved under, as a flat list labelled with its full path.
 *
 * The path is assembled while walking the tree rather than read from `path`, so the label always
 * matches the tags the user can actually see. A screen reader never announces indentation, so the
 * path in the label is what tells the user where a destination sits.
 *
 * The tag being moved and everything below it are left out: moving a tag into its own subtree would
 * detach that branch from the tree.
 */
export const buildMoveTargetOptions = (
  tags: Tag[],
  rootTag: Tag,
  movedTagId?: number
): MoveTargetOption[] => {
  const options: MoveTargetOption[] = [{ value: rootTag.id, label: rootTag.text }]

  const collect = (nodes: Tag[], ancestors: string[]): void => {
    for (const node of nodes) {
      if (node.id === movedTagId) {
        continue
      }

      const path = [...ancestors, node.text]
      options.push({ value: node.id, label: path.join(PATH_SEPARATOR) })

      if (!isNil(node.children) && node.children.length > 0) {
        collect(node.children, path)
      }
    }
  }

  collect(tags, [rootTag.text])

  return options
}

/** Matches on any part of the path, so "germany" finds a tag whose parent is Germany too. */
export const matchesMoveTarget = (input: string, option?: MoveTargetOption): boolean => {
  if (isNil(option)) {
    return false
  }

  return option.label.toLowerCase().includes(input.trim().toLowerCase())
}
