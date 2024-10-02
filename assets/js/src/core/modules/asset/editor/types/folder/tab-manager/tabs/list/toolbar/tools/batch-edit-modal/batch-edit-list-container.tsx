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

import React from 'react'
import {
  type BatchEdit,
  useBatchEdit
} from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/list/toolbar/tools/batch-edit-modal/hooks/use-batch-edit'
import { Empty, Tag } from 'antd'
import { StackList, type StackListProps } from '@Pimcore/components/stack-list/stack-list'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import {
  DefaultBatchEdit
} from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/list/toolbar/tools/batch-edit-modal/default-batch-edit'

export const BatchEditListContainer = (): React.JSX.Element => {
  const { batchEdits } = useBatchEdit()

  const items: StackListProps['items'] = batchEdits.map((batchEdit) => ({
    id: batchEdit.key,
    children: <Tag>{batchEdit.key}</Tag>,
    renderRightToolbar: <ButtonGroup items={
            [
              <IconButton
                icon='close'
                key={ 'remove' }
                onClick={ () => { onRemoveColumnClick(batchEdit) } }
              />
            ]
        }
                        />,
    body: <DefaultBatchEdit batchEdit={ batchEdit } />
  }))

  const onRemoveColumnClick = (batchEdits: BatchEdit): void => {
    alert(`batchEdits ${batchEdits.key}`)
    // call function from inside useBatchEdit to remove batch edit instance
  }

  return (
    <>
      {items.length === 0 && <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE } />}
      {items.length > 0 && <StackList items={ items } />}
    </>
  )
}
