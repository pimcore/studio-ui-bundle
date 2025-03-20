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

import { useAppDispatch } from '@Pimcore/app/store'
import { setNodePublished } from '@Pimcore/components/element-tree/element-tree-slice'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'

export interface PublishHookReturn {
  setTreeNodePublished: (nodeId: number, isPublished: boolean) => void
}

export const usePublish = (elementType: ElementType): PublishHookReturn => {
  const dispatch = useAppDispatch()

  const setTreeNodePublished = (nodeId: number, isPublished: boolean): void => {
    dispatch(setNodePublished({ nodeId: String(nodeId), elementType, isPublished }))
  }

  return {
    setTreeNodePublished
  }
}
