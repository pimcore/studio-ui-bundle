/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo, useState } from 'react'
import { isUndefined } from 'lodash'
import { Icon } from '@Pimcore/components/icon/icon'
import { ConfigLayout } from '@Pimcore/components/predefined-layouts/config/config-layout'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Tabs } from '@Pimcore/components/tabs/tabs'
import { Content } from '@Pimcore/components/content/content'
import { Sidebar } from '@Pimcore/modules/classification-store-config/components/sidebar/sidebar'
import { StoreEditor } from '@Pimcore/modules/classification-store-config/components/store-editor/store-editor'
import { useClassificationStoreConfigurationStoreTreeQuery } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'
import { type ClassificationStoreConfigurationStoreTreeNode } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'
import { useStyles } from '@Pimcore/modules/classification-store-config/classification-store-config.styles'

export const ClassificationStoreConfig = (): React.JSX.Element => {
  const hasPermission = isAllowed(UserPermission.ClassificationStore)

  const { data: storeTree, isLoading, isFetching, refetch } = useClassificationStoreConfigurationStoreTreeQuery(
    undefined,
    { skip: !hasPermission }
  )

  const [openedStores, setOpenedStores] = useState<ClassificationStoreConfigurationStoreTreeNode[]>([])
  const [activeTabKey, setActiveTabKey] = useState<string | undefined>(undefined)

  const { styles } = useStyles()

  const storeList = storeTree ?? []
  const activeStoreId = !isUndefined(activeTabKey) ? Number(activeTabKey) : undefined

  const tabItems = useMemo(() => {
    const existingIds = new Set(storeList.map((s) => s.id))

    return openedStores
      .filter((store) => existingIds.has(store.id))
      .map((store) => ({
        key: String(store.id),
        icon: <Icon value='classification-store' />,
        label: store.name,
        children: <StoreEditor storeId={ store.id } />
      }))
  }, [storeList, openedStores])

  const handleOpenStore = (store: ClassificationStoreConfigurationStoreTreeNode): void => {
    const isAlreadyOpened = openedStores.some((s) => s.id === store.id)

    if (!isAlreadyOpened) {
      setOpenedStores([...openedStores, store])
    }

    setActiveTabKey(String(store.id))
  }

  const handleCloseStore = (storeId: number): void => {
    const targetIndex = openedStores.findIndex((s) => s.id === storeId)
    const updatedOpenedStores = openedStores.filter((s) => s.id !== storeId)

    if (String(storeId) === activeTabKey) {
      const prevStore = openedStores[targetIndex - 1]
      const nextStore = openedStores[targetIndex + 1]
      const newActiveId = !isUndefined(prevStore)
        ? String(prevStore.id)
        : !isUndefined(nextStore)
            ? String(nextStore.id)
            : undefined

      setActiveTabKey(newActiveId)
    }

    setOpenedStores(updatedOpenedStores)
  }

  const handleChangeTab = (key: string): void => {
    setActiveTabKey(key)
  }

  const mainContent = (): React.JSX.Element => {
    if (isUndefined(activeTabKey) || tabItems.length === 0) {
      return <Content none />
    }

    return (
      <ContentLayout>
        <Tabs
          activeKey={ activeTabKey }
          className={ styles.tabs }
          hasStickyHeader
          items={ tabItems }
          onChange={ handleChangeTab }
          onClose={ (key) => { handleCloseStore(Number(key)) } }
          rootClassName={ styles.tabsContainer }
        />
      </ContentLayout>
    )
  }

  return (
    <ConfigLayout
      leftItem={ {
        children: (
          <Sidebar
            activeStoreId={ activeStoreId }
            handleOpenStore={ handleOpenStore }
            isFetching={ isFetching }
            isLoading={ isLoading }
            refetch={ refetch }
            storeList={ storeList }
          />
        )
      } }
      rightItem={ { children: mainContent() } }
    />
  )
}
