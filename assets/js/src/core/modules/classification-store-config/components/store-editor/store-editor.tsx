/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@Pimcore/components/icon/icon'
import { Flex } from '@Pimcore/components/flex/flex'
import { Tabs } from '@Pimcore/components/tabs/tabs'
import { GroupsTab } from '@Pimcore/modules/classification-store-config/components/store-editor/tabs/groups-tab'
import { KeysTab } from '@Pimcore/modules/classification-store-config/components/store-editor/tabs/keys-tab'
import { CollectionsTab } from '@Pimcore/modules/classification-store-config/components/store-editor/tabs/collections-tab'
import { SubGroupsTab } from '@Pimcore/modules/classification-store-config/components/store-editor/tabs/sub-groups-tab'
import { StoreIdentifier } from '@Pimcore/modules/classification-store-config/components/store-editor/store-identifier'
import { StoreEngineIndicator } from '@Pimcore/modules/classification-store-config/components/store-editor/store-engine-indicator'
import { StoreImportProvider } from '@Pimcore/modules/classification-store-config/components/store-editor/store-import-provider'
import { useStyles } from '@Pimcore/modules/classification-store-config/classification-store-config.styles'

interface IStoreEditorProps {
  storeId: number
  /** the store's own export and import actions, rendered next to the tabs */
  importExportActions?: React.ReactNode
}

const SUB_GROUPS_TAB_KEY = 'sub-groups'

export const StoreEditor = ({ storeId, importExportActions }: IStoreEditorProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  const [activeKey, setActiveKey] = useState<string>('keys')

  const showSubGroups = useCallback(() => { setActiveKey(SUB_GROUPS_TAB_KEY) }, [])

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
      key: SUB_GROUPS_TAB_KEY,
      icon: <Icon value='hierarchy' />,
      label: t('classification-store.tabs.sub-groups'),
      children: (
        <SubGroupsTab storeId={ storeId } />
      )
    },
    {
      key: 'groups',
      icon: <Icon value='group' />,
      label: t('classification-store.tabs.groups'),
      children: (
        <GroupsTab
          onShowSubGroups={ showSubGroups }
          storeId={ storeId }
        />
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

  // The actions are rendered inside the provider, so the tabs hear about an import they trigger.
  return (
    <StoreImportProvider>
      <Tabs
        activeKey={ activeKey }
        className={ styles.storeEditorTabsContainer }
        items={ tabItems }
        noTabBarMargin
        onChange={ setActiveKey }
        tabBarExtraContent={ (
          <Flex
            align="center"
            gap="small"
          >
            <StoreIdentifier storeId={ storeId } />
            <StoreEngineIndicator storeId={ storeId } />
            {importExportActions}
          </Flex>
        ) }
      />
    </StoreImportProvider>
  )
}
