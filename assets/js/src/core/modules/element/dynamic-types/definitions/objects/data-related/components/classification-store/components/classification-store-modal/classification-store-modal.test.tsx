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
 * The single selection a picker asks for reaches the Group by Key tab only, so a Group tab
 * offered next to it keeps selecting several groups at once.
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

// icons resolve through the dependency injection container, which is not set up here
jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: () => <span />
}))

jest.mock('@Pimcore/components/modal/modal', () => ({
  Modal: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

// the real tabs render the active pane only, which would hide the props of the other tab
jest.mock('@Pimcore/components/tabs/tabs', () => ({
  Tabs: ({ items }: { items: Array<{ key: string, label: React.ReactNode, children: React.ReactNode }> }) => (
    <>{items.map((item) => <div key={ item.key }>{item.label}{item.children}</div>)}</>
  )
}))

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider', () => ({
  useClassificationStore: () => ({ isOpenModal: true, closeModal: jest.fn() })
}))

// not among the allowed tabs below, and importing it pulls the whole sdk barrel into the suite
jest.mock('./tabs/collection/collection-tab', () => ({ CollectionTab: () => null }))

const groupTabProps = jest.fn()
const groupByKeyTabProps = jest.fn()

jest.mock('./tabs/group/group-tab', () => ({
  GroupTab: (props: Record<string, unknown>) => {
    groupTabProps(props)

    return null
  }
}))

jest.mock('./tabs/group-by-key/group-by-key-tab', () => ({
  GroupByKeyTab: (props: Record<string, unknown>) => {
    groupByKeyTabProps(props)

    return null
  }
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import { TabId } from '../../types'
// eslint-disable-next-line import/first
import { ClassificationStoreModal } from './classification-store-modal'

const modalProps = {
  storeId: 1,
  classId: 'CAR',
  fieldName: 'technicalAttributes',
  name: 'technicalAttributes'
}

describe('ClassificationStoreModal', () => {
  beforeEach(() => {
    groupTabProps.mockClear()
    groupByKeyTabProps.mockClear()
  })

  it('offers the Group and the Group by Key tab, and passes the single selection to Group by Key only', () => {
    render(
      <ClassificationStoreModal
        { ...modalProps }
        allowedTabs={ [TabId.Group, TabId.GroupByKey] }
        singleSelection
      />
    )

    expect(screen.getByText('classification-store.group')).toBeInTheDocument()
    expect(screen.getByText('classification-store.group-by-key')).toBeInTheDocument()
    expect(groupTabProps.mock.calls[0][0]).not.toHaveProperty('singleSelection')
    expect(groupByKeyTabProps).toHaveBeenCalledWith(expect.objectContaining({ singleSelection: true }))
  })
})
