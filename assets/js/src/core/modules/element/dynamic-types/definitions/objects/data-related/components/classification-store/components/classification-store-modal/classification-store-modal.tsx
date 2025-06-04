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
import { useTranslation } from 'react-i18next'
import { type ITabsProps, Tabs } from '@Pimcore/components/tabs/tabs'
import { Modal } from '@Pimcore/components/modal/modal'
import { Flex } from '@Pimcore/components/flex/flex'
import { Icon } from '@Pimcore/components/icon/icon'
import { type ClassificationStoreProps } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store'
import { useStyles } from './classification-store-modal.styles'
import { CollectionTab } from './tabs/collection/collection-tab'
import { GroupTab } from './tabs/group/group-tab'
import { GroupByKeyTab } from './tabs/group-by-key/group-by-key-tab'

interface ClassificationStoreModalProps extends ClassificationStoreProps {
  isOpen: boolean
  close: () => void
  objectId: number
  fieldName: string
}

export const ClassificationStoreModal = (props: ClassificationStoreModalProps): React.JSX.Element => {
  const { isOpen, close, storeId, objectId, fieldName } = props

  const { t } = useTranslation()
  const { styles } = useStyles()

  const tabProps = {
    storeId,
    objectId,
    fieldName
  }

  const tabItems: ITabsProps['items'] = [
    {
      label: (
        <Flex
          align="center"
          gap="mini"
        >
          <Icon
            className={ styles.titleIcon }
            value="keyboard"
          />
          <div>{t('classification-store.collection')}</div>
        </Flex>
      ),
      key: 'collection',
      children: <CollectionTab { ...tabProps } />
    },
    {
      label: (
        <Flex
          align="center"
          gap="mini"
        >
          <Icon
            className={ styles.titleIcon }
            value="keys"
          />
          <div>{t('classification-store.group')}</div>
        </Flex>
      ),
      key: 'group',
      children: <GroupTab { ...tabProps } />
    },
    {
      label: (
        <Flex
          align="center"
          gap="mini"
        >
          <Icon
            className={ styles.titleIcon }
            value="key"
          />
          <div>{t('classification-store.group-by-key')}</div>
        </Flex>
      ),
      key: 'group-by-key',
      children: <GroupByKeyTab { ...tabProps } />
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
            destroyInactiveTabPane
            items={ tabItems }
            noTabBarMargin
          />
        </Modal>
      )}
    </>
  )
}
