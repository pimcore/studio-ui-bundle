/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * The store editor offers the four configuration surfaces of a store, with the store-level
 * sub-group vocabulary after the keys, groups and collections.
 */

// antd-style ships untranspiled ESM, which jest does not transform; only the tab bar matters here.
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: () => '', theme: {} }),
  css: () => '',
  cx: () => '',
  keyframes: () => ''
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// Only reachable for closable tabs, and its import chain pulls in the whole SDK barrel
jest.mock('@Pimcore/components/tabs/tab-context-menu', () => ({
  TabContextMenu: () => null
}))

// icons resolve through the dependency injection container, which is not set up here
jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: () => <span />
}))

jest.mock('@Pimcore/modules/classification-store-config/components/store-editor/store-engine-indicator', () => ({
  StoreEngineIndicator: () => null
}))
jest.mock('@Pimcore/modules/classification-store-config/components/store-editor/tabs/keys-tab', () => ({
  KeysTab: () => null
}))
jest.mock('@Pimcore/modules/classification-store-config/components/store-editor/tabs/groups-tab', () => ({
  GroupsTab: () => null
}))
jest.mock('@Pimcore/modules/classification-store-config/components/store-editor/tabs/collections-tab', () => ({
  CollectionsTab: () => null
}))
jest.mock('@Pimcore/modules/classification-store-config/components/store-editor/tabs/sub-groups-tab', () => ({
  SubGroupsTab: () => <div data-testid="sub-groups-tab" />
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import userEvent from '@testing-library/user-event'
// eslint-disable-next-line import/first
import { StoreEditor } from './store-editor'

describe('StoreEditor', () => {
  it('offers the sub groups tab after the keys, groups and collections tabs', () => {
    render(<StoreEditor storeId={ 1 } />)

    expect(screen.getAllByRole('tab').map((tab) => tab.textContent)).toEqual([
      'classification-store.tabs.keys',
      'classification-store.tabs.groups',
      'classification-store.tabs.collections',
      'classification-store.tabs.sub-groups'
    ])
  })

  it('shows the sub groups tab when it is selected', async () => {
    render(<StoreEditor storeId={ 1 } />)

    await userEvent.click(screen.getByRole('tab', { name: 'classification-store.tabs.sub-groups' }))

    expect(screen.getByTestId('sub-groups-tab')).toBeInTheDocument()
  })
})
