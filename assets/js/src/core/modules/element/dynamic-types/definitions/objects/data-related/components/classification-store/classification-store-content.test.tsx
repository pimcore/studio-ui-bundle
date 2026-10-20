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
 * The store renders the shared empty state while no group is assigned, and hides adding
 * and removing groups when the store is not editable or add/remove is disallowed.
 */

// The `.styles` files pull in antd-style's untranspiled ESM build, which jest does not
// transform. Only the markup asserted below matters here.
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: () => '', theme: {} }),
  css: () => '',
  cx: () => '',
  keyframes: () => ''
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import userEvent from '@testing-library/user-event'
// eslint-disable-next-line import/first
import { ClassificationStoreContent } from './classification-store-content'
// eslint-disable-next-line import/first
import { type ClassificationStoreProps } from './classification-store'

let mockGroupKeys: string[] = []
const mockOpenModal = jest.fn()
const mockItem = jest.fn()

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// icons resolve through the dependency injection container, which is not set up here
jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: () => <span />
}))

jest.mock('@Pimcore/components/form/controls/keyed-list/provider/keyed-list/use-keyed-list-value', () => ({
  useKeyedListSelector: () => ({ groupKeys: mockGroupKeys, activeGroups: {}, groupCollectionMapping: {} })
}))

// the form barrel imports antd-style; the hidden bookkeeping items are not asserted here
jest.mock('@Pimcore/components/form/form', () => ({
  Form: {
    Item: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    Group: ({ children }: { children: React.ReactNode }) => <>{children}</>
  }
}))
jest.mock('@Pimcore/components/input/input', () => ({ Input: () => null }))

jest.mock('./provider', () => ({
  useClassificationStore: () => ({
    openModal: mockOpenModal,
    currentLayoutData: [],
    updateCurrentLayoutData: jest.fn()
  })
}))
jest.mock('@Pimcore/components/language-selection/provider/use-language-selection', () => ({
  useLanguageSelection: () => ({ currentLanguage: 'en' })
}))
jest.mock('./hooks/use-language-independent-value-permission', () => ({
  useLanguageIndependentValuePermission: () => true
}))

jest.mock('./classification-store-item', () => ({
  ClassificationStoreItem: (props: { disallowDelete?: boolean }) => {
    mockItem(props)
    return <div data-testid='group' />
  }
}))

const renderContent = (props: Partial<ClassificationStoreProps> = {}): void => {
  render(
    <ClassificationStoreContent
      { ...(props as ClassificationStoreProps) }
      title='Technical Attributes'
    />
  )
}

describe('ClassificationStoreContent', () => {
  beforeEach(() => {
    mockGroupKeys = []
    mockOpenModal.mockClear()
    mockItem.mockClear()
  })

  it('shows the empty state with an add button while no group is assigned', async () => {
    renderContent()

    expect(screen.getByText('collection.empty')).toBeInTheDocument()
    expect(screen.queryByTestId('group')).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'add' }))

    expect(mockOpenModal).toHaveBeenCalledTimes(1)
  })

  it.each([
    ['noteditable', { noteditable: true }],
    ['disallowAddRemove', { disallowAddRemove: true }]
  ])('hides the add button of the empty state when %s is set', (_name, props) => {
    renderContent(props)

    expect(screen.getByText('collection.empty')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'add' })).not.toBeInTheDocument()
  })

  it('renders the groups with add and delete actions when groups are assigned', () => {
    mockGroupKeys = ['1', '2']

    renderContent()

    expect(screen.queryByText('collection.empty')).not.toBeInTheDocument()
    expect(screen.getAllByTestId('group')).toHaveLength(2)
    expect(screen.getByRole('button', { name: 'add' })).toBeInTheDocument()
    expect(mockItem).toHaveBeenCalledWith(expect.objectContaining({ disallowDelete: false }))
  })

  it.each([
    ['noteditable', { noteditable: true }],
    ['disallowAddRemove', { disallowAddRemove: true }]
  ])('hides adding and deleting groups when %s is set', (_name, props) => {
    mockGroupKeys = ['1']

    renderContent(props)

    expect(screen.getByTestId('group')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'add' })).not.toBeInTheDocument()
    expect(mockItem).toHaveBeenCalledWith(expect.objectContaining({ disallowDelete: true }))
  })
})
