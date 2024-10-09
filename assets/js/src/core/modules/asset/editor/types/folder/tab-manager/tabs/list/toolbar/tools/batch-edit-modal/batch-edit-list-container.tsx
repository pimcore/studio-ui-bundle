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
  useBatchEdit
} from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/list/toolbar/tools/batch-edit-modal/hooks/use-batch-edit'
import { Tag } from 'antd'
import { StackList, type StackListProps } from '@Pimcore/components/stack-list/stack-list'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import {
  DefaultBatchEdit
} from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/list/toolbar/tools/batch-edit-modal/default-batch-edit'
import { NoContent } from '@Pimcore/components/no-content/no-content'
import { t } from 'i18next'

export const BatchEditListContainer = (): React.JSX.Element => {
  const { batchEdits, removeBatchEdit } = useBatchEdit()

  const items: StackListProps['items'] = batchEdits.map((batchEdit) => ({
    id: batchEdit.key,
    children: <Tag>{t(`asset.listing.column.${batchEdit.key}`)}</Tag>,
    renderRightToolbar: <ButtonGroup items={
            [
              <IconButton
                icon='close'
                key={ 'remove' }
                onClick={ () => {
                  removeBatchEdit(batchEdit.key)
                } }
              />
            ]
        }
                        />,
    body: <DefaultBatchEdit batchEdit={ batchEdit } />
  }))

  return (
    <>
      {items.length === 0 && <NoContent text={ t('batch-edit.no-content') } />}
      {items.length > 0 && <StackList items={ items } />}
    </>
  )
}
