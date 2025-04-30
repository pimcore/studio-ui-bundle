/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { Tag } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'

export const flattenArray = (tags: Tag[]): Tag[] => {
  const result: Tag[] = []

  const flatten = (tags: Tag[]): void => {
    for (const tag of tags) {
      result.push(tag)
      if (tag.children !== undefined) {
        flatten(tag.children)
      }
    }
  }

  flatten(tags)
  return result
}
