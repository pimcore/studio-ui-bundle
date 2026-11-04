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
 * Applying a selection on the Group tab resolves the keys of every picked group through
 * layout-by-group, which the surfaces without an object in context call without an objectId.
 */

// The `.styles` files pull in antd-style's untranspiled ESM build, which jest does not transform.
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: () => '', theme: {} }),
  css: () => '',
  cx: () => '',
  keyframes: () => ''
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('../refetch/refetch', () => ({ Refetch: () => null }))
jest.mock('../pagination/pagination', () => ({ Pagination: () => null }))
jest.mock('@Pimcore/components/search-input/search-input', () => ({ SearchInput: () => null }))
jest.mock('@Pimcore/components/split/split', () => ({ Split: ({ children }: { children: React.ReactNode }) => <>{children}</> }))
jest.mock('@Pimcore/components/box/box', () => ({ Box: ({ children }: { children: React.ReactNode }) => <>{children}</> }))
jest.mock('@Pimcore/components/toolbar/toolbar', () => ({ Toolbar: ({ children }: { children: React.ReactNode }) => <>{children}</> }))
jest.mock('@Pimcore/components/content/content', () => ({ Content: ({ children }: { children: React.ReactNode }) => <>{children}</> }))
jest.mock('@Pimcore/components/content-layout/content-layout', () => ({
  ContentLayout: ({ renderToolbar, renderTopBar, children }: { renderToolbar: React.ReactNode, renderTopBar: React.ReactNode, children: React.ReactNode }) => (
    <>{renderTopBar}{children}{renderToolbar}</>
  )
}))
jest.mock('@Pimcore/components/button/button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => (
    <button onClick={ onClick }>{children}</button>
  )
}))

const gridProps = jest.fn()

jest.mock('@Pimcore/components/grid/grid', () => ({
  Grid: (props: Record<string, unknown>) => {
    gridProps(props)

    return null
  }
}))

const closeModal = jest.fn()
const fireUpdateEvent = jest.fn()

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider', () => ({
  useClassificationStore: () => ({ getSearchValue: () => '', setSearchValue: jest.fn(), closeModal })
}))

jest.mock('../../../../provider/classifcation-store-modal-provider', () => ({
  useClassificationStoreModal: () => ({ fireUpdateEvent })
}))

const fetchLayoutByGroup = jest.fn()
const fetchLayoutByKey = jest.fn()

jest.mock('@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced', () => ({
  useLazyClassificationStoreGetLayoutByGroupQuery: () => [fetchLayoutByGroup],
  useLazyClassificationStoreGetLayoutByKeyQuery: () => [fetchLayoutByKey]
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { act, render, screen, waitFor } from '@testing-library/react'
// eslint-disable-next-line import/first
import userEvent from '@testing-library/user-event'
// eslint-disable-next-line import/first
import { TabId } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/types'
// eslint-disable-next-line import/first
import { ClassificationStoreCallbackTab } from './classification-store-callback-tab'

const FIELD_NAME = 'technicalAttributes'

const groups = [{ id: 3, name: 'Dimensions' }, { id: 7, name: 'Engine' }]

const layouts: Record<number, { id: number, name: string, keys: Array<{ id: number }> }> = {
  3: { id: 3, name: 'Dimensions', keys: [{ id: 9 }, { id: 2 }] },
  7: { id: 7, name: 'Engine', keys: [{ id: 4 }] }
}

const queryHook = (): { isLoading: boolean, isFetching: boolean, data: { items: unknown[], totalItems: number }, refetch: () => void } => ({
  isLoading: false,
  isFetching: false,
  data: { items: groups, totalItems: groups.length },
  refetch: jest.fn()
})

const renderTab = (tabId: TabId, singleSelection?: boolean): void => {
  render(
    <ClassificationStoreCallbackTab
      columns={ [] }
      queryArgs={ { storeId: 1, classId: 'CAR', fieldName: FIELD_NAME } }
      queryHook={ queryHook }
      singleSelection={ singleSelection }
      tabId={ tabId }
    />
  )
}

describe('ClassificationStoreCallbackTab', () => {
  beforeEach(() => {
    gridProps.mockClear()
    closeModal.mockClear()
    fireUpdateEvent.mockClear()
    fetchLayoutByGroup.mockReset()
    fetchLayoutByGroup.mockImplementation(({ groupId }: { groupId: number }) => ({
      unwrap: async () => layouts[groupId]
    }))
  })

  it('selects several groups at once on the Group tab', () => {
    renderTab(TabId.Group)

    expect(gridProps).toHaveBeenCalledWith(expect.objectContaining({
      enableMultipleRowSelection: true,
      enableRowSelection: false
    }))
  })

  it('selects a single key on the Group by Key tab when the picker asks for one', () => {
    renderTab(TabId.GroupByKey, true)

    expect(gridProps).toHaveBeenCalledWith(expect.objectContaining({
      enableMultipleRowSelection: false,
      enableRowSelection: true
    }))
  })

  it('resolves the keys of every picked group through layout-by-group, without an objectId', async () => {
    renderTab(TabId.Group)

    act(() => { gridProps.mock.calls[0][0].onSelectedRowsChange({ 3: true, 7: true }) })

    await userEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(fireUpdateEvent).toHaveBeenCalledWith({ type: TabId.Group, data: [layouts[3], layouts[7]] })
    })

    expect(fetchLayoutByGroup).toHaveBeenCalledTimes(2)
    expect(fetchLayoutByGroup).toHaveBeenNthCalledWith(1, { fieldName: FIELD_NAME, groupId: 3 })
    expect(fetchLayoutByGroup).toHaveBeenNthCalledWith(2, { fieldName: FIELD_NAME, groupId: 7 })
    expect(closeModal).toHaveBeenCalled()
  })
})
