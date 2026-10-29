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
 * The store renders the shared empty state while no group is assigned, hides adding
 * and removing groups when the store is not editable or add/remove is disallowed,
 * renders the groups in the order the layout configures, and installs the layout the
 * object delivers for its already active groups with the key titles it carries — which
 * for a reopened object is a map keyed by group id, and so carries no order.
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
let mockCurrentLayoutData: Array<{ id: number }> = []
const mockOpenModal = jest.fn()
const mockItem = jest.fn()
const mockUpdateCurrentLayoutData = jest.fn()

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
    currentLayoutData: mockCurrentLayoutData,
    updateCurrentLayoutData: mockUpdateCurrentLayoutData
  })
}))
jest.mock('@Pimcore/components/language-selection/provider/use-language-selection', () => ({
  useLanguageSelection: () => ({ currentLanguage: 'en' })
}))
jest.mock('./hooks/use-language-independent-value-permission', () => ({
  useLanguageIndependentValuePermission: () => true
}))

jest.mock('./classification-store-item', () => ({
  ClassificationStoreItem: (props: { disallowDelete?: boolean, groupLayout?: { id: number } }) => {
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
    mockCurrentLayoutData = []
    mockOpenModal.mockClear()
    mockItem.mockClear()
    mockUpdateCurrentLayoutData.mockClear()
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

  it('renders the groups in the order the layout configures, not in the order of their ids', () => {
    mockGroupKeys = ['3', '7', '11']
    mockCurrentLayoutData = [{ id: 11 }, { id: 3 }, { id: 7 }]

    renderContent()

    expect(mockItem.mock.calls.map(([props]) => props.groupLayout?.id)).toEqual([11, 3, 7])
  })

  // Reopening an object delivers its already active groups as a map keyed by group id, and
  // JavaScript hands integer-like keys back in ascending numeric order — writing the map out
  // of order below changes nothing. The layout installed for a reopened object therefore runs
  // in ascending group id, and the panels with it: the sort above can only order what the
  // layout carries, and this layout carries no order. Restoring a configured one needs the
  // object layout payload to carry it, as an ordered list or explicit group positions.
  it('falls back to ascending group id for the layout of a reopened object', () => {
    mockGroupKeys = ['3', '7', '11']

    renderContent({
      activeGroupDefinitions: {
        11: { id: 11, name: 'Dimensions', keys: [] },
        3: { id: 3, name: 'Material', keys: [] },
        7: { id: 7, name: 'Packaging', keys: [] }
      }
    } as unknown as Partial<ClassificationStoreProps>)

    const installedLayout = mockUpdateCurrentLayoutData.mock.calls[0][0] as Array<{ id: number }>

    expect(installedLayout.map((group) => group.id)).toEqual([3, 7, 11])
  })

  // reopening an object delivers its already active groups as a map keyed by group id,
  // and the key titles it carries are what the group panels label their keys with
  it('installs the layout of the already active groups with the key titles it carries', () => {
    mockGroupKeys = ['7']

    renderContent({
      activeGroupDefinitions: {
        7: {
          id: 7,
          name: 'Dimensions',
          keys: [
            { id: 11, name: 'ef000001', title: 'Height', definition: { datatype: 'data' } },
            { id: 12, name: 'ef000002', title: null, definition: { datatype: 'data' } }
          ]
        }
      }
    } as unknown as Partial<ClassificationStoreProps>)

    expect(mockUpdateCurrentLayoutData).toHaveBeenCalledWith([
      expect.objectContaining({
        id: 7,
        keys: [
          expect.objectContaining({ id: 11, title: 'Height' }),
          expect.objectContaining({ id: 12, title: null })
        ]
      })
    ])
  })
})
