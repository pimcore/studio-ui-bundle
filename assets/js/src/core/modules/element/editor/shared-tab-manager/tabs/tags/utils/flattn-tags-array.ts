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
