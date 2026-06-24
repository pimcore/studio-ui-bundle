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
import { useStyles } from './classification-store-modal.styles'
import { CollectionTab } from './tabs/collection/collection-tab'
import { GroupTab } from './tabs/group/group-tab'
import { GroupByKeyTab } from './tabs/group-by-key/group-by-key-tab'
import { useClassificationStore } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider'
import { TabId } from '../../types'

export interface ClassificationStoreModalProps {
  storeId: number
  objectId?: number
  classId: string
  fieldName: string
  /** Field definition name, kept so callers can derive {@link fieldName} from a spread field definition. */
  name: string
  allowedTabs?: TabId[]
  /**
   * When true, the modal restricts the selection to a single classification store value.
   * Used by the advanced column configuration where only one group/key may be picked.
   */
  singleSelection?: boolean
}

export const ClassificationStoreModal = (props: ClassificationStoreModalProps): React.JSX.Element => {
  const {
    storeId,
    classId,
    fieldName,
    singleSelection = false,
    allowedTabs = [
      TabId.Collection,
      TabId.Group,
      TabId.GroupByKey
    ]
  } = props

  const { isOpenModal: isOpen, closeModal } = useClassificationStore()
  const { t } = useTranslation()
  const { styles } = useStyles()

  const tabProps = {
    storeId,
    classId,
    objectId: props.objectId,
    fieldName
  }

  const renderTabLabel = ({ iconValue, titleKeyValue }: { iconValue: string, titleKeyValue: string }): React.JSX.Element => {
    return (
      <Flex
        align="center"
        gap="mini"
      >
        <Icon
          className={ styles.titleIcon }
          value={ iconValue }
        />
        <div>{t(`classification-store.${titleKeyValue}`)}</div>
      </Flex>
    )
  }

  const tabItems: ITabsProps['items'] = [
    ...allowedTabs.includes(TabId.Collection)
      ? [{
          label: renderTabLabel({ iconValue: 'keyboard', titleKeyValue: 'collection' }),
          key: 'collection',
          children: <CollectionTab { ...tabProps } />
        }]
      : [],

    ...allowedTabs.includes(TabId.Group)
      ? [{
          label: renderTabLabel({ iconValue: 'keys', titleKeyValue: 'group' }),
          key: 'group',
          children: <GroupTab { ...tabProps } />
        }]
      : [],

    ...allowedTabs.includes(TabId.GroupByKey)
      ? [{
          label: renderTabLabel({ iconValue: 'key', titleKeyValue: 'group-by-key' }),
          key: 'group-by-key',
          children: (
            <GroupByKeyTab
              { ...tabProps }
              singleSelection={ singleSelection }
            />
          )
        }]
      : []
  ]

  return (
    <>
      {isOpen && (
        <Modal
          closable
          footer={ null }
          onCancel={ closeModal }
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
