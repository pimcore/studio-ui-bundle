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
 *
 * It offers exactly one field level language control, and it offers it whenever any key of the
 * field can hold a value in a language other than the language independent one: the field's own
 * localized flag, which every key without one inherits, or a key of its store flagged localized.
 * The answer is read off the layout the editor already has, so no request is made for it.
 */

/* eslint-disable max-lines */

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
let mockCurrentLayoutData: any[] = []
let mockLanguageIndependentValuePermitted = true
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
  useLanguageIndependentValuePermission: () => mockLanguageIndependentValuePermitted
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

const CURRENT_LANGUAGE_OPTION = 'Current language (EN)'
const DEFAULT_OPTION = 'Default'
const DEFAULT_SLOT = 'default'
const LANGUAGE = 'en'

/** One group of several keys, none of which carries a flag of its own. */
const inheritingGroup = {
  id: 7,
  name: 'Dimensions',
  keys: [
    { id: 11, name: 'ef000011', title: 'Height', definition: { datatype: 'data' } },
    { id: 12, name: 'ef000012', title: 'Width', localized: null, definition: { datatype: 'data' } }
  ]
}

/** A second group, one key of which is flagged localized itself. */
const groupWithLocalizedKey = {
  id: 8,
  name: 'Weights',
  keys: [
    { id: 21, name: 'ef000021', title: 'Net weight', localized: true, definition: { datatype: 'data' } },
    { id: 22, name: 'ef000022', title: 'Gross weight', localized: false, definition: { datatype: 'data' } }
  ]
}

const localizationSwitches = (): HTMLElement[] => screen.queryAllByText(CURRENT_LANGUAGE_OPTION)

const itemProps = (): Array<Record<string, any>> => mockItem.mock.calls.map(([props]) => props)

/** The layout the editor already holds, as the groups added in-session deliver it. */
const installLayout = (layout: Array<{ id: number }>): void => {
  mockGroupKeys = layout.map((group) => String(group.id))
  mockCurrentLayoutData = layout
}

describe('ClassificationStoreContent', () => {
  const originalFetch = globalThis.fetch

  beforeEach(() => {
    mockGroupKeys = []
    mockCurrentLayoutData = []
    mockLanguageIndependentValuePermitted = true
    mockOpenModal.mockClear()
    mockItem.mockClear()
    mockUpdateCurrentLayoutData.mockClear()
    // Resolving a key's localization must cost no request: the layout already carries the flag.
    globalThis.fetch = jest.fn() as unknown as typeof fetch
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
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

  it.each([
    { field: 'a localized field whose keys all inherit', localized: true, layout: [inheritingGroup], offered: true },
    {
      field: 'a localized field holding a key flagged localized',
      localized: true,
      layout: [inheritingGroup, groupWithLocalizedKey],
      offered: true
    },
    {
      field: 'a field that is not localized holding a key flagged localized',
      localized: false,
      layout: [groupWithLocalizedKey],
      offered: true
    },
    {
      field: 'a field that is not localized whose keys all inherit',
      localized: false,
      layout: [inheritingGroup],
      offered: false
    }
  ])('decides whether the language control is offered for $field', ({ localized, layout, offered }) => {
    installLayout(layout)

    renderContent({ localized })

    // exactly one per field, never one per group and never one per key
    expect(localizationSwitches()).toHaveLength(offered ? 1 : 0)
    expect(globalThis.fetch).not.toHaveBeenCalled()
  })

  // The already active groups arrive as a map keyed by group id, the groups added in-session as a
  // list; both end up in the same layout, so the same fixture must resolve the same way.
  it.each([
    { delivery: 'already active groups', viaActiveGroupDefinitions: true },
    { delivery: 'groups added in-session', viaActiveGroupDefinitions: false }
  ])('resolves the localization of $delivery from the same layout', ({ viaActiveGroupDefinitions }) => {
    const layout = [inheritingGroup, groupWithLocalizedKey]

    mockGroupKeys = layout.map((group) => String(group.id))

    if (viaActiveGroupDefinitions) {
      renderContent({
        localized: false,
        activeGroupDefinitions: { 7: inheritingGroup, 8: groupWithLocalizedKey }
      } as unknown as Partial<ClassificationStoreProps>)

      // the installed layout carries the flag per key, which is what the resolution reads
      expect(mockUpdateCurrentLayoutData).toHaveBeenCalledWith([
        expect.objectContaining({ id: 7, keys: layout[0].keys }),
        expect.objectContaining({ id: 8, keys: layout[1].keys })
      ])

      mockItem.mockClear()
    }

    mockCurrentLayoutData = layout
    renderContent({ localized: false })

    expect(localizationSwitches()).toHaveLength(1)
    expect(itemProps().map((props) => props.fieldLocalized)).toEqual([false, false])
    expect(itemProps().map((props) => props.localizationGroup)).toEqual([DEFAULT_SLOT, DEFAULT_SLOT])
    expect(globalThis.fetch).not.toHaveBeenCalled()
  })

  it.each([
    { field: 'a localized field', localized: true, layout: [inheritingGroup] },
    {
      field: 'a field that is not localized holding a key flagged localized',
      localized: false,
      layout: [groupWithLocalizedKey]
    }
  ])('hides the default option of $field when the permission excludes it', ({ localized, layout }) => {
    mockLanguageIndependentValuePermitted = false
    installLayout(layout)

    renderContent({ localized })

    expect(localizationSwitches()).toHaveLength(1)
    expect(screen.queryByText(DEFAULT_OPTION)).not.toBeInTheDocument()
    // and the groups are edited in the current language, not in the slot the user may not see
    expect(itemProps().map((props) => props.localizationGroup)).toEqual(layout.map(() => LANGUAGE))
  })

  it('keeps offering the default option when the permission allows it', () => {
    installLayout([inheritingGroup])

    renderContent({ localized: true })

    expect(screen.getByText(DEFAULT_OPTION)).toBeInTheDocument()
    expect(itemProps().map((props) => props.localizationGroup)).toEqual([DEFAULT_SLOT])
  })

  it('moves the localized keys to the current language when the control is switched', async () => {
    installLayout([inheritingGroup])

    renderContent({ localized: true })

    await userEvent.click(screen.getByText(CURRENT_LANGUAGE_OPTION))

    expect(itemProps().at(-1)?.localizationGroup).toBe(LANGUAGE)
  })
})
