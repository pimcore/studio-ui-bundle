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

import { useState } from 'react'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { t } from 'i18next'
import { type Key } from 'react'
import {
  type Tag,
  useTagAssignToElementMutation,
  useTagUnassignFromElementMutation
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice-enhanced'
import {
  useOptimisticUpdate
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/hooks/use-optimistic-update'

interface UseHandleCheckProps {
  elementId: number
  elementType: 'asset' | 'document' | 'data-object'
  flatTags: Tag[]
  setDefaultCheckedTags: (tags: React.Key[]) => void
}

interface NodeInfo {
  node: { key: Key }
  checked: boolean
}

interface UseHandleCheckReturn {
  handleCheck: (
    checkedKeys: { checked: Key[], halfChecked: Key[] },
    info: NodeInfo
  ) => Promise<void>
  loadingNodes: Set<string>
}

export const useHandleCheck = ({
  elementId,
  elementType,
  flatTags,
  setDefaultCheckedTags
}: UseHandleCheckProps): UseHandleCheckReturn => {
  const messageApi = useMessage()
  const { updateTagsForElementByTypeAndId } = useOptimisticUpdate()
  const [assignTag] = useTagAssignToElementMutation()
  const [unassignTag] = useTagUnassignFromElementMutation()
  const [loadingNodes, setLoadingNodes] = useState<Set<string>>(new Set())

  const mutateTag = async (tagId: number, checked: boolean): Promise<void> => {
    const isRootTag = tagId === 0

    if (isRootTag) return

    const mutation = checked ? assignTag : unassignTag

    const response = (await mutation({ elementType, id: elementId, tagId })) as {
      error?: { data?: { error?: string | null } }
    }

    if (response.error?.data?.error != null && response.error.data.error !== '') {
      throw new Error(response.error.data.error)
    }

    if (response.error != null) {
      throw new Error(
        checked ? 'Failed to assign tag to element' : 'Failed to unassign tag from element'
      )
    }
  }

  const applyTagsToElement = async (checkedTags: Key[]): Promise<void> => {
    updateTagsForElementByTypeAndId({
      elementType,
      id: elementId,
      flatTags,
      checkedTags: checkedTags.map(Number)
    })
    setDefaultCheckedTags(checkedTags)
  }

  const handleCheck = async (
    checkedKeys: { checked: Key[], halfChecked: Key[] },
    info: NodeInfo
  ): Promise<void> => {
    const tagId = Number(info.node.key)
    setLoadingNodes((prev) => new Set(prev).add(String(tagId)))

    void applyTagsToElement(checkedKeys.checked)

    try { await mutateTag(tagId, info.checked) } catch {
      const errorMessage = info.checked
        ? t('failed-to-assign-tag-to-element')
        : t('failed-to-un-assign-tag-to-element')
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      messageApi.error({
        content: errorMessage,
        type: 'error',
        duration: 5
      })

      const updatedCheckedKeys = info.checked
        ? checkedKeys.checked.filter((key) => key !== String(tagId))
        : [...checkedKeys.checked, String(tagId)]

      void applyTagsToElement(updatedCheckedKeys)
    } finally {
      setLoadingNodes((prev) => {
        const newSet = new Set(prev)
        newSet.delete(String(tagId))
        return newSet
      })
    }
  }

  return { handleCheck, loadingNodes }
}
