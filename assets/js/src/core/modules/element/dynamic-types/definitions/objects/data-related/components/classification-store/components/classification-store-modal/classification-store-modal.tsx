/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { type ITabsProps, Tabs } from '@Pimcore/components/tabs/tabs'
import { Modal } from '@Pimcore/components/modal/modal'

interface ClassificationStoreModalProps {
  isOpen: boolean
  close: () => void
}

export const ClassificationStoreModal = (props: ClassificationStoreModalProps): React.JSX.Element => {
  const { isOpen, close } = props

  const tabItems: ITabsProps['items'] = [
    {
      label: 'Collection',
      key: 'collection',
      children: <div>Collection</div>
    },
    {
      label: 'Group',
      key: 'group',
      children: <div>Group</div>
    },
    {
      label: 'Group by key',
      key: 'group-by-key',
      children: <div>Group by key</div>
    }
  ]

  return (
    <>
      {isOpen && (
        <Modal
          closable
          footer={ null }
          onCancel={ () => { close() } }
          open={ isOpen }
          size={ 'XL' }
        >
          <Tabs
            items={ tabItems }
            noTabBarMargin
          />
        </Modal>
      )}
    </>
  )
}
