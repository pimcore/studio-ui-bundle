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
import { Icon } from '@Pimcore/components/icon/icon'
import { Tabs } from '@Pimcore/components/tabs/tabs'
import { GroupsTab } from '@Pimcore/modules/classification-store-config/components/store-editor/tabs/groups-tab'
import { KeysTab } from '@Pimcore/modules/classification-store-config/components/store-editor/tabs/keys-tab'
import { CollectionsTab } from '@Pimcore/modules/classification-store-config/components/store-editor/tabs/collections-tab'
import { useStyles } from '@Pimcore/modules/classification-store-config/classification-store-config.styles'

interface IStoreEditorProps {
  storeId: number
}

export const StoreEditor = ({ storeId }: IStoreEditorProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  const tabItems = [
    {
      key: 'keys',
      icon: <Icon value='group-by-keys' />,
      label: t('classification-store.tabs.keys'),
      children: (
        <KeysTab storeId={ storeId } />
      )
    },
    {
      key: 'groups',
      icon: <Icon value='group' />,
      label: t('classification-store.tabs.groups'),
      children: (
        <GroupsTab storeId={ storeId } />
      )
    },
    {
      key: 'collections',
      icon: <Icon value='collection' />,
      label: t('classification-store.tabs.collections'),
      children: (
        <CollectionsTab storeId={ storeId } />
      )
    }
  ]

  return (
    <Tabs
      className={ styles.storeEditorTabsContainer }
      defaultActiveKey="keys"
      items={ tabItems }
      noTabBarMargin
    />
  )
}
